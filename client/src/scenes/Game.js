import { Scene } from '../core/Scene';
import { Logger } from '../core/Logger';
import {AreaForSelectedObject} from '../entities/ship_menu/AreaForSelectedObject';
import {Ship} from '../entities/Ship';
import {ShipInfo as ShipInfoForMenu} from '../entities/ship_menu/ShipInfo';
import {Utility} from '../core/Utility';
import {SeaField} from '../entities/SeaField';
import {SHIP_STATE} from '../enums/ShipState';

export class Game extends Scene {
    prepare() {
        Logger.debug('Our game');

        this.layers = {
            background: this.addLayer('background'),
            userMap: this.addLayer('userMap')
        };
        this._hand = null;
        this._x = 0;
        this._y = 0;

        let areaForSelectedObject = new AreaForSelectedObject('areaForSelectedObject', 10, 40);
        this.addEntity(areaForSelectedObject, this.layers.userMap);

        let ship1 = new Ship('ship1', 30, 86, 1, 4);
        let ship2 = new Ship('ship2', 30, 128, 2, 3);
        let ship3 = new Ship('ship3', 30, 170, 3, 2);
        let ship4 = new Ship('ship4', 30, 212, 4, 1);

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

        let seaField = new SeaField('seaField', 200, 40, 32, 10);
        seaField.handlers.mouseMove = this._moveObjectInHand.bind(this);
        seaField.handlers.mouseOut = this._hideObjectInHand.bind(this);

        this.addEntity(seaField, this.layers.background);
    }

    update() {

    }

    onClick(x, y, entity) {
        if (!entity) {
            this._clearHand();
        }

        if (this._isFreeShip(entity)) {
            this._takeObject(entity);
        } else if (this._isPickedShip(entity) && !this.getEntity('seaField').checkCollision(this._hand)) {
            this._putOnTheField(entity);
        } else if (this._isPuttedShip(entity)) {
            this._pickUpFromField(entity);
        }
    }

    onMouseMove(x, y) {
        this._x = x;
        this._y = y;
    }

    onKeyPress(event) {
        if (event.code === 'KeyR' && this._hand) {
            this.getEntity('seaField').triggers.mouseMove(this._x, this._y);
        }
    }

    _moveObjectInHand(seaFieldEntity, tileX, tileY, tileBorderX, tileBorderY) {
        if (this._hand) {
            if (this._hand.getW() + tileX <= tileBorderX) {
                this._hand.setX(tileX);
            } else {
                this._hand.setX(tileBorderX - this._hand.getW());
            }

            if (this._hand.getH() + tileY <= tileBorderY) {
                this._hand.setY(tileY);
            } else {
                this._hand.setY(tileBorderY - this._hand.getH());
            }

            this._hand.setCanPut(!seaFieldEntity.checkCollision(this._hand));
        }
    }

    _hideObjectInHand() {
        if (this._hand) {
            this._hand.setX(-1000);
            this._hand.setY(-1000);
        }
    }

    _takeObject(entity) {
        this._clearHand();

        this._takeInHand(entity, -1000, -1000);

        this._showSelectedObject(entity);
    }

    _clearHand() {
        if (this.hasEntity('selectedObject')) {
            this.destroyEntity(this.getEntity('selectedObject'));
        }

        if (this._hand) {
            this.destroyEntity(this._hand);
        }
    }

    _isFreeShip(entity) {
        if (!(entity instanceof Ship)) {
            return false;
        }

        return entity.getState() === SHIP_STATE.DISPLAY_IN_MENU && entity.getCount() > 0;
    }

    _isPickedShip(entity) {
        if (!(entity instanceof Ship)) {
            return false;
        }

        return entity.getState() === SHIP_STATE.PICKED_UP;
    }

    _putOnTheField(entity) {
        let shipCountLabel = this.getEntity(`shipInfo${entity.getSize()}`);
        if (shipCountLabel.getShipCount() === 0) {
            return;
        }

        let shipEntity = this.getEntity(`ship${entity.getSize()}`);
        shipEntity.decreaseCount();
        shipCountLabel.setShipCount(shipEntity.getCount());

        let ship = Utility.cloneEntity(entity);
        let number = new Date().getTime();

        ship.setState(SHIP_STATE.PUT_ON_FIELD);
        ship.setName(`shipOnField_${number}`);
        this.addEntity(ship, this.layers.userMap);

        this.getEntity('seaField').addShip(ship);

        this._clearHand();
    }

    _isPuttedShip(entity) {
        if (!(entity instanceof Ship)) {
            return false;
        }

        return entity.getState() === SHIP_STATE.PUT_ON_FIELD;
    }

    _pickUpFromField(entity) {
        this._takeInHand(entity, entity.getX(), entity.getY());

        this._showSelectedObject(entity);

        this.destroyEntity(entity);

        this.getEntity('seaField').removeShip(entity);

        let shipCountLabel = this.getEntity(`shipInfo${entity.getSize()}`);
        let shipEntity = this.getEntity(`ship${entity.getSize()}`);
        shipEntity.increaseCount();
        shipCountLabel.setShipCount(shipEntity.getCount());
    }

    _showSelectedObject(entity) {
        let selectedObject = Utility.cloneEntity(entity);
        selectedObject.setName('selectedObject');
        selectedObject.setX(-1000);
        selectedObject.setY(-1000);
        this.addEntity(selectedObject, this.layers.userMap);

        this.getEntity('areaForSelectedObject').setEntity(selectedObject);
    }

    _takeInHand(entity, x, y) {
        let objectInHand = Utility.cloneEntity(entity);
        objectInHand.setName('objectInHand');
        objectInHand.setX(x);
        objectInHand.setY(y);
        objectInHand.setState(SHIP_STATE.PICKED_UP);
        this.addEntity(objectInHand, this.layers.userMap);
        this._hand = objectInHand;
    }
}
