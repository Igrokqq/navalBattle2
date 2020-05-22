import { Entity } from '../core/Entity';
import {Utility} from "../core/Utility";
import {Logger} from "../core/Logger";

export class Square extends Entity {
    constructor(name, x, y, size, color = '#000') {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = size;
        this.h = size;
        this.color = color;
    }

    draw() {
        const { context } = this.layer;

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }

    onClick(x, y) {
        this.color = Utility.getRandomColor();
    }

    onMouseOver(x, y) {
        Logger.debug("onMouseOver", this.name);
    }

    onMouseOut(x, y) {
        Logger.debug("onMouseOut", this.name);
    }

    onMouseMove(x, y) {
        Logger.debug("onMouseMove", this.name);
    }

}
