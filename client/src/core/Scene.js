import { Logger } from '../core/Logger';

// мои слои, наша отрисовка слоев
export class Scene {
    constructor() {
        this._layers = {};
        this._engine = null;
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

        this._layers[name] = {
            element: layer,
            context: layer.getContext('2d'),
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

    addEntity(entity, layer) {
        this._engine.addEntity(entity, layer);
    }
}
