import { Entity } from '../core/Entity';

export class Ship extends Entity {
    constructor(name, x, y, tileSize, size, position) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.size = size;
        this.tileSize = tileSize;
        this.w = this.position === 'horizontal' ? this.tileSize * this.size : this.tileSize;
        this.h = this.position === 'vertical' ? this.tileSize * this.size : this.tileSize;
        this.position = position;
        this.color = '#ff2631';
    }

    draw() {
        const { context } = this.layer;

        this.w = this.position === 'horizontal' ? this.tileSize * this.size : this.tileSize;
        this.h = this.position === 'vertical' ? this.tileSize * this.size : this.tileSize;

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
