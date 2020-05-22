import { Scene } from '../core/Scene';
import { Logger } from '../core/Logger';
import {AreaForSelectedObject} from "../entities/ship_menu/AreaForSelectedObject";
import {Ship as ShipForMenu} from "../entities/ship_menu/Ship";
import {ShipInfo as ShipInfoForMenu} from "../entities/ship_menu/ShipInfo";
import {Utility} from "../core/Utility";

export class Game extends Scene {
    prepare() {
        Logger.debug('Our game');
        this.layers = {
            background: this.addLayer('background'),
            userMap: this.addLayer('userMap')
        };

        let areaForSelectedObject = new AreaForSelectedObject('areaForSelectedObject', 10, 40);
        this.addEntity(areaForSelectedObject, this.layers.userMap);

        let ship1 = new ShipForMenu('ship1', 30, 86, 1, 4);
        let ship2 = new ShipForMenu('ship2', 30, 128, 2, 3);
        let ship3 = new ShipForMenu('ship3', 30, 170, 3, 2);
        let ship4 = new ShipForMenu('ship4', 30, 212, 4, 1);

        this.addEntity(ship1, this.layers.userMap);
        this.addEntity(ship2, this.layers.userMap);
        this.addEntity(ship3, this.layers.userMap);
        this.addEntity(ship4, this.layers.userMap);

        let textForShip1 = new ShipInfoForMenu('shipInfo1', 10, 96, ship1.getCount());
        let textForShip2 = new ShipInfoForMenu('shipInfo2', 10, 138, ship2.getCount());
        let textForShip3 = new ShipInfoForMenu('shipInfo3', 10, 180, ship3.getCount());
        let textForShip4 = new ShipInfoForMenu('shipInfo4', 10, 222, ship4.getCount());

        this.addEntity(textForShip1, this.layers.userMap);
        this.addEntity(textForShip2, this.layers.userMap);
        this.addEntity(textForShip3, this.layers.userMap);
        this.addEntity(textForShip4, this.layers.userMap);
    }

    update() {

    }

    onClick(x, y, entity) {
        this._takeObject(entity);
    }

    _takeObject(entity) {
        if (entity === null || !(entity instanceof ShipForMenu)) {
            return;
        }

        let previousSelectedObject = this.getEntity('selectedObject');
        if (previousSelectedObject) {
            this.destroyEntity(previousSelectedObject);
        }

        let selectedObject = Utility.cloneEntity(entity);
        selectedObject.setName('selectedObject');
        selectedObject.setX(-1000);
        selectedObject.setY(-1000);

        this.addEntity(selectedObject, this.layers.userMap);

        this.getEntity('areaForSelectedObject').setEntity(selectedObject);
    }
}
