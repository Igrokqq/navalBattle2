import { Entity } from '../core/Entity';

export class FpsText extends Entity {
    constructor(name, x, y) {
        super();

        this.setName(name);
        this.setX(x);
        this.setY(y);

        this._fps = 0;
        this._isShow = true;
    }

    draw() {
        if (this._isShow === false) {
            return;
        }

        const { context } = this.getLayer();

        let phrase = `FPS: ${this._fps}`;

        context.fillStyle = '#ccc';
        context.fillRect(this.getX(), this.getY(), 64, 20);

        context.fillStyle = '#000';
        context.font = '16px Arial';
        context.textBaseline = 'top';
        context.fillText(phrase, this.getX() + 4, this.getY() + 4);
        context.fill();
    }

    setFps(fps) {
        this._fps = fps;
    }

    onKeyUp(event) {
        if (event.ctrlKey === true && event.code === 'KeyQ') {
            this._isShow = !this._isShow;
        }
    }
}