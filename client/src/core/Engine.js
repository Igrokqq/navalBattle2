import { Logger } from './Logger';
import { EventManager } from './EventManager';

export class Engine {
    constructor() {
        this._scenesMap = {};
        this._currentScene = null;

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

        entities.forEach((entity) => entity.draw());

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

    _sortEntitiesByDepth(entities) {
        return Object.values(entities).sort((entity1, entity2) => {
            if (entity1.depth < entity2.depth) {
                return -1;
            }
            if (entity1.depth > entity2.depth) {
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
