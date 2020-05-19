import { Logger } from '../core/Logger';

// мои слои, наша отрисовка слоев
export class Scene {
    constructor() {
        this._layers = {};
        this._engine = null;
        this._entities = {};
        this._entityDepthCount = 0;
        this._layerDepthCount = 0;
    }

    clear() {
        this._layers = {};
        Scene.getContainer().innerHTML = '';
    }

    prepare() {
        throw new Error('method is not implemented');
    }

    update() {
        throw new Error('method is not implemented');
    }

    addLayer(name) {
        if (this._layers[name]) {
            Logger.error('This layer already exists', name);
            return null;
        }

        const layer = document.createElement('canvas');
        layer.id = `layer_${name}`;
        layer.width = 1024;
        layer.height = 768;

        Scene.getContainer().append(layer);

        this._layerDepthCount += 1;

        this._layers[name] = {
            element: layer,
            context: layer.getContext('2d'),
            depth: this._layerDepthCount
        };

        return this._layers[name];
    }

    getLayer(name) {
        if (!this._layers[name]) {
            Logger.error('This layer not found', name);
            return null;
        }

        return this._layers[name];
    }

    static getContainer() {
        return document.querySelector('#container');
    }

    getLayers() {
        return this._layers;
    }

    setEngine(engine) {
        this._engine = engine;
    }

    getEntities() {
        return this._entities;
    }

    getEntity(name) {
        if (!this._entities[name]) {
            Logger.error('Entity not found', name);
            return null;
        }

        return this._entities[name];
    }

    addEntity(entity, layer) {
        if (this._entities[entity.getName()]) {
            Logger.error('This entity exists', entity);
            return;
        }

        entity.setLayer(layer);

        this._entityDepthCount += 1;

        entity.depth = this._entityDepthCount;

        this._entities[entity.getName()] = entity;
    }

    destroyEntity(entity) {
        entity.destroy();
        delete this._entities[entity.getName()];
    }

    onClick(x, y) {
        let handleEntity = null;

        let entities = this.getEntities();
        Object.values(entities).forEach((entity) => {
            if (this.checkCollision(x, y, entity)) {
                if (handleEntity === null || this.checkDepth(handleEntity, entity)) {
                    handleEntity = entity;
                }
            }
        });

        this.handleClick(x, y, handleEntity);
    }

    checkCollision(x, y, entity) {
        return x >= entity.x && x <= entity.x + entity.w
            && y >= entity.y && y <= entity.y + entity.h;
    }

    checkDepth(handleEntity, entity) {
        return handleEntity.depth < entity.depth && handleEntity.layer.depth <= entity.layer.depth;
    }

    handleClick(x, y, entity) {
        throw new Error("Method is not implemented");
    }
}
