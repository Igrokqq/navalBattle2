import { Logger } from './Logger';

export class Entity {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._w = 0;
        this._h = 0;
        this._name = null;
        this._layer = null;
        this._depth = 0;
    }

    draw() {
        throw new Error('method is not implemented');
    }

    setName(name) {
        this._name = name;
    }

    getName() {
        return this._name;
    }

    setLayer(layer) {
        this._layer = layer;
    }

    getLayer() {
        return this._layer;
    }

    setW(w) {
        this._w = w;
    }

    getW() {
        return this._w;
    }

    setH(h) {
        this._h = h;
    }

    getH() {
        return this._h;
    }

    setX(x) {
        this._x = x;
    }

    getX() {
        return this._x;
    }

    setY(y) {
        this._y = y;
    }

    getY() {
        return this._y;
    }

    setDepth(depth) {
        this._depth = depth;
    }

    getDepth() {
        return this._depth;
    }

    destroy() {}
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
