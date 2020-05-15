import { Entity } from '../core/Entity';

export class Ship extends Entity {
    constructor(name, x, y, size, position) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = position === 'horizontal' ? size * 2 : size;
        this.h = position === 'vertical' ? size * 2 : size;
        this.position = position; // for dynamic position
    }

    draw() {
        const { context } = this.layer;

        // context.rect(this.x, this.y, this.w, this.h);

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
}
