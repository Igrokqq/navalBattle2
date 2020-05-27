import {Utility} from "./Utility";
import {GAME_SOUNDS} from "../enums/GameSounds";

export class SoundManager {
    constructor() {
        this._buffer = null;
        this._sources = {};
        this._sounds = GAME_SOUNDS;
        this._context = new AudioContext();
        this._sourcesHashLength = 16;
    }

    play(url) {
        window.fetch(url)
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => this._context.decodeAudioData(arrayBuffer))
            .then((audioBuffer) => {
                this._buffer = audioBuffer;
            });

        this._context.resume();

        const hash = Utility.getHash(this._sourcesHashLength);

        this._sources[hash] = {
            bufferSource: this._context.createBufferSource(),
            isPlaying: true,
        };
        this._sources[hash].bufferSource.buffer = this._buffer;
        this._sources[hash].bufferSource.connect(this._context.destination);
        this._sources[hash].bufferSource.start();

        return hash;
    }

    stop(hash) {
        this._sources[hash].bufferSource.stop();
    }

    stopAll() {
        Object.values(this._sources).forEach((source) => {
           if (source.isPlaying) {
               source.bufferSource.stop();
               source.isPlaying = false;
           }
        });
    }

    getSounds() {
        return this._sounds;
    }
}
