import { Entity } from '../core/Entity';

export class ShipLimitText extends Entity {
    constructor(name, x, y, text) {
        super();

        this.name = name;
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = '18px';
    }

    draw() {
        const { context } = this.layer;

        context.fillStyle = '#000';
        context.fillText(this.text, this.x, this.y);
    }

    setText(text) {
        this.text = text;
    }

    setFontSize(size) {
        this.size = `${size}px`;
    }
}
