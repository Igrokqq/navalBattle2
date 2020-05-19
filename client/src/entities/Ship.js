import { Entity } from '../core/Entity';

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

    togglePosition() {
        if (this.position === 'horizontal') {
            this.position = 'vertical';
        } else {
            this.position = 'horizontal';
        }
    }
}
