import {Entity} from "../core/Entity";
import {SEA_FIELD_STATE} from "../enums/SeaFieldState";

export class SeaField extends Entity {
    constructor(name, x, y, tileSize, tileCount) {
        super();

        this.setName(name);
        this.setX(x);
        this.setY(y);
        this.setW(tileSize * tileCount);
        this.setH(tileSize * tileCount);

        this._positionObjects = [];

        this._tileSize = tileSize;
        this._tileCount = tileCount;
        this._state = SEA_FIELD_STATE.PREPARE;

        this.triggers.mouseMove = this._triggerMouseMove.bind(this);
    }

    draw() {
        const {context} = this.getLayer();
        let lineConfig = {
            x: this.getX(),
            y: this.getY()
        };

        this._drawHorizontalLines(context, lineConfig);
        lineConfig.y = this.getY();
        this._drawVerticalLines(context, lineConfig);
    }

    onClick(x, y) {

    }

    getShipCount() {
        return this._positionObjects.length;
    }

    setShip(ship) {
        let shipCoords = ship.getCoords();
        let obj = {
            coords: shipCoords,
            collisionCoords: this._getCollisionCoords(shipCoords)
        };
        this._positionObjects.push(obj);
    }

    checkCollision(entity) {
        if (this._positionObjects.length === 0) {
            return false;
        }

        let result = false;
        let entityCoords = entity.getCoords();

        for (let i = 0; i < this._positionObjects.length; i++) {
            let objCoords = this._positionObjects[i].collisionCoords;

            if (objCoords.filter(coords =>
                    entityCoords.filter(coords2 =>
                        coords.x === coords2.x && coords.y === coords2.y
                    ).length > 0
                ).length > 0
            ) {
                result = true;
                break;
            }
        }

        return result;
    }

    _drawHorizontalLines(context, lineConfig) {
        for (let y = 0; y <= this._tileCount; y += 1) {
            context.beginPath();
            context.moveTo(lineConfig.x, lineConfig.y);
            context.lineTo(lineConfig.x + this._tileSize * this._tileCount, lineConfig.y);
            context.strokeStyle = '#999';
            context.stroke();

            this._drawLineNumber(context, lineConfig, y);

            lineConfig.y += this._tileSize;
        }
    }

    _drawVerticalLines(context, lineConfig) {
        for (let x = 0; x <= this._tileCount; x += 1) {
            context.beginPath();
            context.moveTo(lineConfig.x, lineConfig.y);
            context.lineTo(lineConfig.x , lineConfig.y + this._tileSize * this._tileCount);
            context.strokeStyle = '#999';
            context.stroke();

            this._drawColumnAlphabet(context, lineConfig, x);

            lineConfig.x += this._tileSize;
        }
    }

    _drawLineNumber(context, lineConfig, y) {
        if (y === this._tileCount) {
            return;
        }

        context.fillStyle = '#000';
        context.font = '16px Arial';
        context.textBaseline = 'top';

        let lineNumber = y+1;
        let offset = lineNumber < 10 ? 14 : 22;
        context.fillText(lineNumber.toString(), lineConfig.x - offset, lineConfig.y + 8);
    }

    _drawColumnAlphabet(context, lineConfig, x) {
        if (x === this._tileCount) {
            return;
        }

        context.fillStyle = '#000';
        context.font = '16px Arial';
        context.textBaseline = 'top';

        let columnLetter = String.fromCharCode(64 + x + 1);
        context.fillText(columnLetter, lineConfig.x + 12, lineConfig.y - 16);
    }

    _triggerMouseMove(x, y) {
        let localPosition = this.convertToLocalPosition(x, y);
        let tileX = Math.floor(localPosition.x / this._tileSize) * this._tileSize;
        let tileY = Math.floor(localPosition.y / this._tileSize) * this._tileSize;
        let tileBorderX = this.getW();
        let tileBorderY = this.getH();

        let globalPosition = this.convertToGlobalPosition(tileX, tileY);
        let globalBorderPosition = this.convertToGlobalPosition(tileBorderX, tileBorderY);

        this.handlers.mouseMove(
            this,
            globalPosition.x,
            globalPosition.y,
            globalBorderPosition.x,
            globalBorderPosition.y
        );
    }

    _getCollisionCoords(shipCoords) {
        let coords = [];

        for (let i = 0; i < shipCoords.length; i++) {
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | | x | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            coords.push({
                x: shipCoords[i].x,
                y: shipCoords[i].y,
            });
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | |   | | x |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            coords.push({
                x: shipCoords[i].x + this._tileSize,
                y: shipCoords[i].y,
            });
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // | x | |   | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            coords.push({
                x: shipCoords[i].x - this._tileSize,
                y: shipCoords[i].y,
            });
            // ----- ----- -----
            // |   | | x | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            coords.push({
                x: shipCoords[i].x,
                y: shipCoords[i].y - this._tileSize,
            });
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | | x | |   |
            // ----- ----- -----
            coords.push({
                x: shipCoords[i].x,
                y: shipCoords[i].y + this._tileSize,
            });
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | |   | | x |
            // ----- ----- -----
            coords.push({
                x: shipCoords[i].x + this._tileSize,
                y: shipCoords[i].y + this._tileSize,
            });
            // ----- ----- -----
            // |   | |   | | x |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            coords.push({
                x: shipCoords[i].x + this._tileSize,
                y: shipCoords[i].y - this._tileSize,
            });
            // ----- ----- -----
            // | x | |   | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            coords.push({
                x: shipCoords[i].x - this._tileSize,
                y: shipCoords[i].y - this._tileSize,
            });
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // |   | |   | |   |
            // ----- ----- -----
            // | x | |   | |   |
            // ----- ----- -----
            coords.push({
                x: shipCoords[i].x - this._tileSize,
                y: shipCoords[i].y + this._tileSize,
            });
        }

        return coords.filter((value, index, self) => {
            return index === self.findIndex((t) => (
                t.x === value.x && t.y === value.y
            ));
        });
    }
}
