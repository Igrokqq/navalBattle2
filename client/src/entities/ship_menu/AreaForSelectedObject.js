import {Entity} from "../../core/Entity";

export class AreaForSelectedObject extends Entity {
    constructor(name, x, y) {
        super();

        this.setName(name);
        this.setX(x);
        this.setY(y);
        this.setW(150);
        this.setH(40);

        this._entity = null;
    }

    draw() {
        const {context} = this.getLayer();

        context.fillStyle = '#ccc';
        context.fillRect(this.getX(), this.getY(), this.getW(), this.getH());

        if (this._entity !== null) {
            this._entity.setX(this.getX() + ((this.getW() / 2) - (this._entity.getW() / 2)));
            this._entity.setY(this.getY() + 4);
        }
    }

    setEntity(entity) {
        this._entity = entity;
    }
}
