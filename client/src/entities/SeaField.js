import {Entity} from "../core/Entity";

export class SeaField extends Entity {
    constructor(name, x, y, tileSize, tileCount) {
        super();

        this.setName(name);
        this.setX(x);
        this.setY(y);
        this.setW(tileSize * tileCount);
        this.setH(tileSize * tileCount);

        this._tileSize = tileSize;
        this._tileCount = tileCount;
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

    _drawHorizontalLines(context, lineConfig) {
        for (let y = 0; y <= this._tileCount; y += 1) {
            context.beginPath();
            context.moveTo(lineConfig.x, lineConfig.y);
            context.lineTo(lineConfig.x + this._tileSize * this._tileCount, lineConfig.y);
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
        context.fillText(columnLetter, lineConfig.x + 10, lineConfig.y - 16);
    }
}
