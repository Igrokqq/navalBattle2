import { Entity } from '../core/Entity';

export class Square extends Entity {
    constructor(name, layer, x, y) {
        super();
        this.draw(name, layer, x, y);
    }

    draw(name, layer, x, y) {
        // layer.context.rect(x, y, 10, 10);
        const { context } = layer;

        context.fillStyle = '#000';
        context.fillRect(x, y, 10, 10);
    }
}
