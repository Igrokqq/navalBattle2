import { Entity } from '../core/Entity';

export class FpsText extends Entity {
    constructor(name, x, y, text) {
        super();

        this.name = name;
        this.x = x;
        this.y = y;
        this.text = text;
    }

    draw() {
        const { context } = this.layer;

        context.fillStyle = '#000';
        context.fillText(this.text, this.x, this.y);
    }

    setText(text) {
        this.text = text;
    }
}