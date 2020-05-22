import { Scene } from '../core/Scene';
import { Logger } from '../core/Logger';
import { Square } from '../entities/Square';
import { Ship } from '../entities/Ship';
import {Utility} from "../core/Utility";

export class Game extends Scene {
    prepare() {
        Logger.debug('Our game');
        this.layers = {
            background: this.addLayer('background'),
            userMap: this.addLayer('userMap')
        };
        this.cubeIndex = 0;

        const ship1 = new Ship('vertical_ship', 100, 100, 40, 'vertical');
        const ship2 = new Ship('horizontal_ship', 200, 100, 40, 'horizontal');

        // our ship
        this.addEntity(ship1, this.layers.userMap);
        this.addEntity(ship2, this.layers.userMap);

    }

    update() {

    }

    onClick(x, y, entity) {
        if (!entity) {
            for (let i = 0; i < 30; i++) {
                let _x = Math.ceil(Math.random()*800);
                let _y = Math.ceil(Math.random()*700);
                let _size = 20 + Math.ceil(Math.random()*100);
                let cube = new Square(`number${this.cubeIndex}_cube`, _x, _y, _size, Utility.getRandomColor());
                this.addEntity(cube, this.layers.userMap);

                this.cubeIndex++;
            }
        }
    }
}
