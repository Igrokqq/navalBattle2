import { Logger } from './Logger';

export class Entity {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.name = null;
        this.layer = null;
        this.depth = 0;
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

    onClick(x, y) {}
    onMouseDown(x, y) {}
    onMouseUp(x, y) {}
    onMouseMove(x, y) {}
    onMouseOver(x, y) {}
    onMouseOut(x, y) {}
    onKeyDown(event) {}
    onKeyPress(event) {}
    onKeyUp(event) {}
}
