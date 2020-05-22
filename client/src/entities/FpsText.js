import { Entity } from '../core/Entity';

export class FpsText extends Entity {
    constructor(name, x, y) {
        super();

        this.name = name;
        this.x = x;
        this.y = y;
        this.fps = 0;
        this.isShow = true;
    }

    draw() {
        if (this.isShow === false) {
            return;
        }

        const { context } = this.layer;

        let phrase = `FPS: ${this.fps}`;

        context.fillStyle = '#ccc';
        context.fillRect(this.x, this.y, 64, 20);

        context.fillStyle = '#000';
        context.font = '16px Arial';
        context.fillText(phrase, this.x + 2, this.y * 2 - 4);
        context.fill();
    }

    setFps(fps) {
        this.fps = fps;
    }

    onKeyUp(event) {
        if (event.ctrlKey === true && event.code === 'KeyQ') {
            this.isShow = !this.isShow;
        }
    }
}