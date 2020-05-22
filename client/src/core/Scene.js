import { Logger } from './Logger';
import {FpsText} from "../entities/FpsText";

// мои слои, наша отрисовка слоев
export class Scene {
    constructor() {
        this._layers = {};
        this._entities = {};
        this._entityDepthCount = 0;
        this._layerDepthCount = 0;
        this._cursorInsideEntities = {};

        this._debugInfo = {
            layerName: '__engineDebugInfo',
            times: [],
            fps: 0
        };
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

    initDebug() {
        this.addLayer(this._debugInfo.layerName);

        let fpsText = new FpsText('fps_text', 10, 10);
        this.addEntity(fpsText, this.getLayer(this._debugInfo.layerName));
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

        entity.setDepth(this._entityDepthCount);

        this._entities[entity.getName()] = entity;
    }

    destroyEntity(entity) {
        entity.destroy();
        delete this._entities[entity.getName()];
    }

    onClick(x, y, entity) {}
    onMouseDown(x, y, entity) {}
    onMouseUp(x, y, entity) {}
    onMouseMove(x, y) {}
    onKeyDown(event) {}
    onKeyPress(event) {}
    onKeyUp(event) {}

    _onClick(x, y) {
        let handleEntity = this._getHandleEntity(x, y);

        if (handleEntity) {
            handleEntity.onClick(x, y);
        }

        this.onClick(x, y, handleEntity);
    }

    _onMouseDown(x, y) {
        let handleEntity = this._getHandleEntity(x, y);

        if (handleEntity) {
            handleEntity.onMouseDown(x, y);
        }

        this.onMouseDown(x, y, handleEntity);
    }

    _onMouseUp(x, y) {
        let handleEntity = this._getHandleEntity(x, y);

        if (handleEntity) {
            handleEntity.onMouseUp(x, y);
        }

        this.onMouseUp(x, y, handleEntity);
    }

    _onMouseMove(x, y) {
        let entities = this.getEntities();
        let cursorInsideEntitiesByFrame = {};
        Object.values(entities).forEach((entity) => {
            if (this._checkCollision(x, y, entity)) {
                cursorInsideEntitiesByFrame[entity.getName()] = entity;
            }
        });

        for (let entityName in cursorInsideEntitiesByFrame) {
            if (this._cursorInsideEntities[entityName] === undefined) {
                cursorInsideEntitiesByFrame[entityName].onMouseOver(x, y);
            }
        }

        for (let entityName in this._cursorInsideEntities) {
            if (cursorInsideEntitiesByFrame[entityName] === undefined) {
                this._cursorInsideEntities[entityName].onMouseOut(x, y);
            }
        }

        this._cursorInsideEntities = cursorInsideEntitiesByFrame;

        Object.values(this._cursorInsideEntities).forEach((entity) => {
            entity.onMouseMove(x, y);
        });

        this.onMouseMove(x, y);
    }

    _onKeyDown(event) {
        let entities = this.getEntities();
        Object.values(entities).forEach((entity) => {
            entity.onKeyDown(event);
        });

        this.onKeyDown(event);
    }

    _onKeyPress(event) {
        let entities = this.getEntities();
        Object.values(entities).forEach((entity) => {
            entity.onKeyPress(event);
        });

        this.onKeyPress(event);
    }

    _onKeyUp(event) {
        let entities = this.getEntities();
        Object.values(entities).forEach((entity) => {
            entity.onKeyUp(event);
        });

        this.onKeyUp(event);
    }

    _getHandleEntity(x, y) {
        let handleEntity = null;
        let entities = this.getEntities();
        Object.values(entities).forEach((entity) => {
            if (this._checkCollision(x, y, entity)) {
                if (handleEntity === null || this._checkDepth(handleEntity, entity)) {
                    handleEntity = entity;
                }
            }
        });

        return handleEntity;
    }

    _checkCollision(x, y, entity) {
        return x >= entity.getX() && x <= entity.getX() + entity.getW()
            && y >= entity.getY() && y <= entity.getY() + entity.getH();
    }

    _checkDepth(handleEntity, entity) {
        return handleEntity.getDepth() < entity.getDepth() && handleEntity.getLayer().depth <= entity.getLayer().depth;
    }

    _drawFps() {
        const now = window.performance.now();
        while (this._debugInfo.times.length > 0 && this._debugInfo.times[0] <= now - 1000) {
            this._debugInfo.times.shift();
        }
        this._debugInfo.times.push(now);
        this._debugInfo.fps = this._debugInfo.times.length;

        this.getEntity('fps_text').setFps(this._debugInfo.fps);
    }
}
