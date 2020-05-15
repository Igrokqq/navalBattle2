import { Logger } from '../core/Logger';

export class Engine {
    constructor() {
        this._scenesMap = {};
        this._currentScene = null;
        this._entities = {};
        this._depthCount = 0;
    }

    startScene(scene) {
        if (!this._scenesMap[scene]) {
            Logger.error('This scene not found', scene);
            return;
        }

        let _scene = this._scenesMap[scene]();

        _scene.setEngine(this);

        this._currentScene = _scene;

        _scene.clear();
        _scene.prepare();
        window.requestAnimationFrame(() => {
            this.clearSceneLayers(_scene);

            const entities = this.sortEntitiesByDepth();

            entities.forEach((entity) => entity.draw());
        });
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

    addEntity(entity, layer) {
        if (this._entities[entity.getName()]) {
            Logger.error('This entity exists', entity);
            return;
        }

        entity.setLayer(layer);

        this._depthCount += 1;

        entity.zIndex = this._depthCount;

        this._entities[entity.getName()] = entity;
    }

    destroyEntity(entity) {
        entity.destroy();
        delete this._entities[entity.getName()];
    }

    sortEntitiesByDepth() {
        return Object.values(this._entities).sort((entity1, entity2) => {
            if (entity1.zIndex < entity2.zIndex) {
                return -1;
            }
            if (entity1.zIndex > entity2.zIndex) {
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
