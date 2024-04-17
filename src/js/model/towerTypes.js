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
 * @class InfernoTower
 * @extends Tower
 * @author Emil
 */
export class InfernoTower extends Tower{
    constructor(gameCtx, tiles) {
        super(
            gameCtx,
            tiles,
            700,
            50,
            250,
            1000,
            2,
            400,
            4.5,
            imagePaths //Insert path for picture/s
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
    constructor(gameCtx, tiles) {
        super(
            gameCtx,
            tiles,
            120, // cost, higher cost than archer-
            80, // range, smaller range than archer
            80, // damage, higher damage than archer
            150, // upgradeCost
            5, //
            15, //Shooting speed
            1 // projectile speed
        );
    }
}
/**
    *Class for the Fast(4th) tower. Extends the Tower class.
    * @class FastTower
    * @extends Tower
    * @author Muhammed
    */
export class FastTower extends Tower {
    constructor(gameCtx, tiles) {
        super(
            gameCtx,
            tiles,
            150, // cost, higher cost than archer-
            250, // range, smaller range than archer
            10, // damage, higher damage than archer
            180, // upgradeCost
            3, //
            30, //Shooting speed
            12 // projectile speed
        );
    }
}

