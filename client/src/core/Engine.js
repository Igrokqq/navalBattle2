import { Logger } from './Logger';
import { EventManager } from './EventManager';

export class Engine {
    constructor() {
        this._scenesMap = {};
        this._currentScene = null;

        // test
        // setInterval(() => {
        //     // this._sound.play('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3');
        //     this._sound.play('http://localhost:63342/navalBattleWithZhenya/client/public/sounds/1.mp3');
        //     // this._sound.play('http://localhost:63342/navalBattleWithZhenya/client/public/sounds/2.mp3');
        //     // this._sound.play('http://localhost:63342/navalBattleWithZhenya/client/public/sounds/3.mp3');
        // }, 1500);

        new EventManager(this);
    }

    startScene(scene) {
        if (!this._scenesMap[scene]) {
            Logger.error('This scene not found', scene);
            return;
        }

        let _scene = this._scenesMap[scene]();

        this._currentScene = _scene;

        _scene.clear();
        _scene.initDebug();
        _scene.prepare();

        this._gameLoop();
    }

    _gameLoop() {
        this._clearSceneLayers(this._currentScene);

        const entities = this._sortEntitiesByDepth(this._currentScene.getEntities());

        entities.forEach((entity) => {
            entity.getLayer().context.save();
            entity.draw();
            entity.getLayer().context.restore();
        });

        this._currentScene._drawFps();

        this._currentScene.update();

        window.requestAnimationFrame(() => { this._gameLoop() });
    }

    getCurrentScene() {
        return this._currentScene;
    }

    setScenes(scenes) {
        this._scenesMap = scenes;
    }

    getSound() {
        return this._sound;
    }

    _sortEntitiesByDepth(entities) {
        return Object.values(entities).sort((entity1, entity2) => {
            if (entity1.getDepth() < entity2.getDepth()) {
                return -1;
            }
            if (entity1.getDepth() > entity2.getDepth()) {
                return 1;
            }

            return 0;
        });
    }

    _clearSceneLayers(scene) {
        const layers = Object.values(scene.getLayers());

        layers.forEach((layer) => {
            layer.context.clearRect(0, 0, layer.element.width, layer.element.height);
        });
    }
}
