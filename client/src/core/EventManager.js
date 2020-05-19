import { Logger } from './Logger';

export class EventManager {
    constructor(engine) {
        this._engine = engine;

        let container = document.querySelector('#container');

        container.addEventListener('click', this.onClick.bind(this), false);
    }

    onClick(event) {
        let x = event.offsetX;
        let y = event.offsetY;

        this._engine.getCurrentScene().onClick(x, y);

    }
}
