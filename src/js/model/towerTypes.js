import {Tower} from "../controller/TowerController.js";


/**
 * Class for the Archer Tower. Extends the Tower class.
 * @class ArcherTower
 * @extends Tower
 * @author Philip
 */
export class ArcherTower extends Tower {
    constructor(gameCtx, tiles) {
        super(
            gameCtx,
            tiles,
            100, // cost
            200, // range
            20, // damage
            120, // upgradeCost
            5, // maxLevel
            60, // Shooting speed
            10 // Projectile speed
        );
    }
}

/**
 * Class for the Wizard Tower. Extends the Tower class.
 * @class WizardTower
 * @extends Tower
 * @author Philip
 */
export class WizardTower extends Tower {
    constructor(gameCtx, tiles) {
        super(
            gameCtx,
            tiles,
            200, // cost
            170, // range
            80, // damage
            300, // upgradeCost
            5, // maxLevel
            110, // Shooting speed
            4.5 // Projectile speed
        );
    }
}


/**
 * Class for the Stone Tower. Extends the Tower class.
 * @class StoneTower
 * @extends Tower
 * @author Muhammed
 * @author Emil
 */
export class StoneTower extends Tower {
    constructor(gameCtx, tile) {
        super(
            gameCtx,
            tile,
            120, // cost, higher cost than archer-
            80, // range, smaller range than archer
            80, // damage, higher damage than archer
            150, // upgradeCost
            5, //
            5 //Shooting speed, lower than archer.
        );
    }
}