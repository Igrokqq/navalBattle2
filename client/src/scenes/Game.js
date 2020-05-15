import { Scene } from '../core/Scene';
import { Logger } from '../core/Logger';
import { Square } from '../entities/Square';
import { Ship } from '../entities/Ship';

export class Game extends Scene {
    // here private methods

    prepare() {
        Logger.debug('Our game');
        const background = this.addLayer('background');
        const userMap = this.addLayer('userMap');

        const cube1 = new Square('cube1', 10, 10, 40);
        const cube2 = new Square('cube2', 14, 14, 40, '#fcba03');
        const cube3 = new Square('cube3', 18, 18, 40, '#29f705');
        const cube4 = new Square('cube4', 22, 22, 40, '#be42eb');
        const cube5 = new Square('cube5', 26, 26, 40, '#1dd1ce');

        const ship1 = new Ship('ship1', 100, 100, 40, 'vertical');
        const ship2 = new Ship('ship2', 200, 100, 40, 'horizontal');

        this.addEntity(cube1, background);
        this.addEntity(cube2, background);
        this.addEntity(cube3, background);
        this.addEntity(cube4, background);
        this.addEntity(cube5, background);

        // our ship
        this.addEntity(ship1, background);
        this.addEntity(ship2, background);
        // new Square('cube1', background, 10, 10);

        // const cube1 = new Square('cube1');
        //

        // // what? what are your name? pixels? layer?
        // this.addEntity(new Square('cube1'), 10, 10, 'background');
        //
        // // what? where? pixels?
        //name layout, x|y
        //
        // new Square('cube1', 'background', 10, 10);
        //
        // new Square('cube1', this, 10, 10);
    }

    update() {
    }
}
