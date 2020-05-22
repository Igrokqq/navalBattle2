import { Logger } from './Logger';

export class EventManager {
    constructor(engine) {
        this._engine = engine;

        let container = document.querySelector('#container');

        container.addEventListener('click', this._onClick.bind(this), false);
        container.addEventListener('mousedown', this._onMouseDown.bind(this), false);
        container.addEventListener('mouseup', this._onMouseUp.bind(this), false);
        container.addEventListener('mousemove', this._onMouseMove.bind(this), false);

        container.addEventListener('keydown', this._onKeyDown.bind(this), false);
        container.addEventListener('keypress', this._onKeyPress.bind(this), false);
        container.addEventListener('keyup', this._onKeyUp.bind(this), false);
    }

    _onClick(event) {
        let x = event.offsetX;
        let y = event.offsetY;

        this._engine.getCurrentScene()._onClick(x, y);
    }

    _onMouseDown(event) {
        let x = event.offsetX;
        let y = event.offsetY;

        this._engine.getCurrentScene()._onMouseDown(x, y);
    }

    _onMouseUp(event) {
        let x = event.offsetX;
        let y = event.offsetY;

        this._engine.getCurrentScene()._onMouseUp(x, y);
    }

    _onMouseMove(event) {
        let x = event.offsetX;
        let y = event.offsetY;

        this._engine.getCurrentScene()._onMouseMove(x, y);
    }

    _onKeyDown(event) {
        this._engine.getCurrentScene()._onKeyDown(event);
    }

    _onKeyPress(event) {
        this._engine.getCurrentScene()._onKeyPress(event);
    }

    _onKeyUp(event) {
        this._engine.getCurrentScene()._onKeyUp(event);
    }
}
