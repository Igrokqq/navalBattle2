import { Entity } from '../../core/Entity';
import {Utility} from "../../core/Utility";

export class Ship extends Entity {
    constructor(name, x, y, shipSize, shipCount) {
        super();

        let oneFieldSize = 32;

        this.setName(name);
        this.setX(x);
        this.setY(y);
        this.setW(shipSize * oneFieldSize);
        this.setH(oneFieldSize);

        this._size = shipSize;
        this._count = shipCount;
        this._color = Utility.getRandomColor();
    }

    draw() {
        const { context } = this.getLayer();

        context.fillStyle = this._color;
        context.fillRect(this.getX(), this.getY(), this.getW(), this.getH());
    }

    onMouseOver(x, y) {
        Utility.setCursor('pointer');
    }

    onMouseOut(x, y) {
        Utility.setCursor('default');
    }

    getSize() {
        return this._size;
    }

    getCount() {
        return this._count;
    }

}
