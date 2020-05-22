import { Entity } from '../core/Entity';
import {Utility} from "../core/Utility";

export class Ship extends Entity {
    constructor(name, x, y, size, position) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = this.position === 'horizontal' ? this.size * 2 : this.size;
        this.h = this.position === 'vertical' ? this.size * 2 : this.size;
        this.position = position;
        this.size = size;
        this.color = '#ff2631';
    }

    draw() {
        const { context } = this.layer;

        this.w = this.position === 'horizontal' ? this.size * 2 : this.size;
        this.h = this.position === 'vertical' ? this.size * 2 : this.size;

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }

    onClick(x, y) {
        this.color = Utility.getRandomColor();
        this._togglePosition();
    }

    _togglePosition() {
        if (this.position === 'horizontal') {
            this.position = 'vertical';
        } else {
            this.position = 'horizontal';
        }
    }
}
