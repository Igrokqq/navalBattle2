import { Scene } from '../core/Scene';
import { Logger } from '../core/Logger';
import { Square } from '../entities/Square';
import { Ship } from '../entities/Ship';
import {FpsText} from "../entities/FpsText";

export class Game extends Scene {
    // here private methods

    prepare() {
        Logger.debug('Our game');
        this.layers = {
            background: this.addLayer('background'),
            userMap: this.addLayer('userMap')
        };
        this.cubeIndex = 0;

        const cube1 = new Square('black_cube', 10, 10, 40);
        const cube2 = new Square('yellow_cube', 14, 14, 40, '#fcba03');
        const cube4 = new Square('purple_cube', 22, 22, 40, '#be42eb');
        const cube5 = new Square('aqua_cube', 26, 26, 40, '#1dd1ce');
        const cube3 = new Square('green_cube', 18, 18, 40, '#29f705');

        const ship1 = new Ship('vertical_ship', 100, 100, 40, 'vertical');
        const ship2 = new Ship('horizontal_ship', 200, 100, 40, 'horizontal');

        this.addEntity(cube1, this.layers.userMap);
        this.addEntity(cube2, this.layers.userMap);

        this.addEntity(cube4, this.layers.userMap);
        this.addEntity(cube3, this.layers.userMap);

        this.addEntity(cube5, this.layers.background);

        // our ship
        this.addEntity(ship1, this.layers.userMap);
        this.addEntity(ship2, this.layers.userMap);

        this.times = [];
        this.fps = 0;
        let fpsText = new FpsText('fps_text', 100, 20, 'FPS: ' + this.fps);
        this.addEntity(fpsText, this.layers.userMap);
    }

    update() {
        this.drawFps();
    }

    handleClick(x, y, entity) {
        if (entity) {
            entity.color = this.getRandomColor();

            if (entity instanceof Ship) {
                entity.togglePosition();
            }
        } else {
            let cube = new Square(`number${this.cubeIndex}_cube`, x, y, 20, this.getRandomColor());
            this.addEntity(cube, this.layers.userMap);

            this.cubeIndex++;
        }
    }

    drawFps() {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
        }
        this.times.push(now);
        this.fps = this.times.length;

        this.getEntity('fps_text').setText('FPS: ' + this.fps);
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
