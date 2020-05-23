import { Entity } from '../core/Entity';
import {Utility} from "../core/Utility";
import {SHIP_STATE} from "../enums/ShipState";
import {SHIP_POSITION} from "../enums/ShipPosition";

export class Ship extends Entity {
    constructor(name, x, y, shipSize, shipCount) {
        super();

        this._oneFieldSize = 32;

        this.setName(name);
        this.setX(x);
        this.setY(y);
        this.setW(shipSize * this._oneFieldSize);
        this.setH(this._oneFieldSize);

        this._size = shipSize;
        this._count = shipCount;
        this._color = Utility.getRandomColor();
        this._state = SHIP_STATE.DISPLAY_IN_MENU;
        this._position = SHIP_POSITION.HORIZONTAL;
    }

    draw() {
        const { context } = this.getLayer();

        context.fillStyle = this._color;
        context.fillRect(this.getX(), this.getY(), this.getW(), this.getH());
    }

    onKeyPress(event) {
        if (event.code === 'KeyR' && this._state === SHIP_STATE.PICKED_UP) {
            this._position = this._position === SHIP_POSITION.VERTICAL ?
                                SHIP_POSITION.HORIZONTAL : SHIP_POSITION.VERTICAL;

            if (this._position === SHIP_POSITION.HORIZONTAL) {
                this.setW(this._size * this._oneFieldSize);
                this.setH(this._oneFieldSize);
            } else {
                this.setW(this._oneFieldSize);
                this.setH(this._size * this._oneFieldSize);
            }
        }
    }

    onClick(x, y) {

    }

    onMouseOver(x, y) {
        Utility.setCursor('pointer');
    }

    onMouseOut(x, y) {
        Utility.setCursor('default');
    }

    setState(state) {
        this._state = state;
    }

    getState() {
        return this._state;
    }

    getSize() {
        return this._size;
    }

    getCount() {
        return this._count;
    }

}
