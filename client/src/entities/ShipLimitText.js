import { Entity } from '../core/Entity';

export class ShipLimitText extends Entity {
    constructor(name, x, y, text, size) {
        super();

        this.name = name;
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = `${size}px`;
        this.fontName = 'Arial';
    }

    draw() {
        const { context } = this.layer;

        context.font = `${this.size} ${this.fontName}`;
        context.fillStyle = '#000';
        context.fillText(this.text, this.x, this.y);
    }

    setText(text) {
        this.text = text;
    }

    setFontName(name) {
        this.fontName = name;
    }
}
