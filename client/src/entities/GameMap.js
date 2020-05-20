import { Entity } from '../core/Entity';

export class GameMap extends Entity {
    constructor(name, x, y, tileSize, tileCount) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = tileCount * tileSize; // 6 * 32 == 192
        this.h = tileCount * tileSize;
        this.tileCount = tileCount;
        this.tileSize = tileSize;
    }

    draw() {
        const { context } = this.layer;
        const lineConfig = {
            x: this.x,
            y: this.y,
        };

        // horizontal lines
        for (let y = 0; y <= this.tileCount; y += 1) {
            context.beginPath();
            context.moveTo(lineConfig.x, lineConfig.y);
            context.lineTo((lineConfig.x + this.tileSize * this.tileCount), lineConfig.y);
            context.stroke();

            lineConfig.y += this.tileSize; // tiles size
        }

        lineConfig.y = this.y;

        // vertical lines
        for (let x = 0; x <= this.tileCount; x += 1) {
            context.beginPath();
            context.moveTo(lineConfig.x, lineConfig.y);
            context.lineTo(lineConfig.x , lineConfig.y + this.tileSize * this.tileCount);
            context.stroke();

            lineConfig.x += this.tileSize; // tiles size
        }
    }
}
