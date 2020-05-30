import { Entity } from '../core/Entity';

export class BtnBackgroundSoundSwitcher extends Entity {
    constructor(name, x, y, phrase, backgroundColor) {
        super();
        this.setName(name);
        this.setX(x);
        this.setY(y);
        this.setPhrase(phrase);
        this.setBackgroundColor(backgroundColor);
    }

    draw() {
        const { context } = this.getLayer();

        const w = this.getPhrase().length * 9;
        const h = 20;

        this.setW(w);
        this.setH(h);

        context.fillStyle = this.getBackgroundColor();
        context.fillRect(this.getX(), this.getY(), w, h);

        context.fillStyle = '#000';
        context.font = '16px Arial';
        context.textBaseline = 'top';
        context.fillText(this.phrase, this.getX() + 4, this.getY() + 4);
        context.fill();
    }

    // onKeyPress(event) {
    // }

    onClick(x, y) {

    }

    // onMouseOver(x, y) {
    //     Utility.setCursor('pointer');
    // }
    //
    // onMouseOut(x, y) {
    //     Utility.setCursor('default');
    // }

    setPhrase(text) {
        this.phrase = text;
    }

    getPhrase() {
        return this.phrase;
    }

    setBackgroundColor(backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    getBackgroundColor() {
        return this.backgroundColor;
    }
}
