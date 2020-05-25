import {Entity} from "../../core/Entity";

export class ShipInfo extends Entity {
    constructor(name, x, y, shipCount) {
        super();

        this.setName(name);
        this.setX(x);
        this.setY(y);
        this.setW(20);
        this.setH(20);

        this._shipCount = shipCount;
    }

    draw() {
        const { context } = this.getLayer();

        let phrase = `${this._shipCount}x`;

        context.fillStyle = '#000';
        context.font = '16px Arial';
        context.textBaseline = 'top';
        context.fillText(phrase, this.getX(), this.getY());
        context.fill();
    }

    setShipCount(shipCount) {
        this._shipCount = shipCount;
    }

    getShipCount() {
        return this._shipCount;
    }
}
