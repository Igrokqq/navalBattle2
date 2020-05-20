import { Entity } from '../core/Entity';

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

}
