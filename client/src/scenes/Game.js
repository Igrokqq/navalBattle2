import { Scene } from '../core/Scene';
import { Logger } from '../core/Logger';
import { Square } from '../entities/Square';

export class Game extends Scene {
    // here private methods

    prepare() {
        Logger.debug('Our game');
        this.addLayer('background')
            .addLayer('userMap');

        const layer = this.getLayer('background');
        new Square('cube1', layer, 10, 10);
        // const cube1 = new Square('cube1');
        //
        // this.addEntity(cube1, 50, 50, 'background');

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
