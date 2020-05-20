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

        // _scene.setEngine(this);

        this._currentScene = _scene;

        _scene.clear();
        _scene.prepare();

        this.gameLoop();
        // setInterval(() => {
        //     this.gameLoop();
        // }, 1000 / 30);
    }

    gameLoop() {
        this.clearSceneLayers(this._currentScene);

        const entities = this.sortEntitiesByDepth(this._currentScene.getEntities());

        entities.forEach((entity) => entity.draw());

        this._currentScene.update();

        window.requestAnimationFrame(() => { this.gameLoop() });
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

    sortEntitiesByDepth(entities) {
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

    clearSceneLayers(scene) {
        const layers = Object.values(scene.getLayers());

        layers.forEach((layer) => {
            layer.context.clearRect(0, 0, layer.element.width, layer.element.height);
        });
    }
}
