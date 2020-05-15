import { Logger } from '../core/Logger';

export class Game {
    constructor() {
        this._scenesMap = {};
        this._currentScene = null;

        return {
            getInstance: () => {
                return this.instance || (this.instance = this.createInstance());
            }
        }
    }

    createInstance() {
        return {
            startScene: this.startScene,
            getCurrentScene: this.getCurrentScene,
            getAllScenes: this.getAllScenes,
            setScenes: this.setScenes,
            // debug: this.debug,
        }
    }

    startScene(scene) {
        if (!this._scenesMap[scene]) {
            Logger.error('This scene not found', scene);
            return;
        }

        let _scene = this._scenesMap[scene]();

        this._currentScene = _scene;

        _scene.clear();
        _scene.prepare();
        window.requestAnimationFrame(_scene.update);
    }

    getCurrentScene() {
        return this._currentScene;
    }

    setScenes(scenes) {
        this._scenesMap = scenes;
    }

    // // for test
    // debug() {
    //     debugger;
    // }

    getAllScenes() {
        return this._scenesMap;
    }
}
