import { Logger } from './Logger';

export class Entity {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.name = null;
        this.layer = null;
        this.zIndex = 0;
    }

    draw() {
        throw new Error('method is not implemented');
    }

    getName() {
        return this.name;
    }

    setLayer(layer) {
        this.layer = layer;
    }

    destroy() {
        throw new Error('method is not implemented');
    }
}
