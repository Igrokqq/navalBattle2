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
        this._canPut = true;
    }

    draw() {
        const { context } = this.getLayer();

        context.fillStyle = this._color;

        if (this._state === SHIP_STATE.PICKED_UP) {
            context.shadowBlur = 10;
            context.shadowColor = this._canPut ? '#1d8b37' : '#ef263d';
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }

        context.fillRect(this.getX(), this.getY(), this.getW(), this.getH());

        if (this._state === SHIP_STATE.DISPLAY_IN_MENU && this._count === 0) {
            this._crossOutShip(context);
        }
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

    getCanPut() {
        return this._canPut;
    }

    setCanPut(canPut) {
        this._canPut = canPut;
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

    decreaseCount() {
        this._count--;
    }

    increaseCount() {
        this._count++;
    }

    getCoords() {
        let coords = [];
        for (let i = 0; i < this.getSize(); i++) {
            coords.push({
                x: this._position === SHIP_POSITION.HORIZONTAL ? this.getX() + (i * this._oneFieldSize) : this.getX(),
                y: this._position === SHIP_POSITION.VERTICAL ? this.getY() + (i * this._oneFieldSize) : this.getY()
            });
        }

        return coords;
    }

    _crossOutShip(context) {
        context.beginPath();
        context.moveTo(this.getX(), this.getY());
        context.lineTo(this.getX() + this.getW(), this.getY() + this.getH());
        context.strokeStyle = '#000';
        context.stroke();

        context.beginPath();
        context.moveTo(this.getX(), this.getY() + this.getH());
        context.lineTo(this.getX() + this.getW(), this.getY());
        context.strokeStyle = '#000';
        context.stroke();
    }
}
