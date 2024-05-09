import { Tower } from "../controller/TowerController.js";

/**
 * Class for the Archer Tower. Extends the Tower class.
 * @class ArcherTower
 * @extends Tower
 * @author Philip
 */
export class ArcherTower extends Tower {
    constructor(gameCtx, tiles, status) {
        const imagePaths = ["../js/model/assets/Tower/Tower1/4.png"];
        //const projectileImagePaths =["../js/model/assets/Tower/Projectile/FB500-2.png"];

        const projectileImagePaths = [
            "../js/model/assets/Tower/Projectile/Inferno/FB500-2.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-3.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-4.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-5.png"
        ];
        const towerType = "Archer";
        const towerOptions = {
            frameWidth: 280/4, // Bredden på varje frame (280 / 4)
            frameHeight:  1024, // Höjden på varje frame
            frameIndex: 6, // Aktuell frame-index
            frameCount:4, // Antal frames i bilden
            frameUpdateCounter:0  ,
            frameSpeed: 10
        };

        super(
            gameCtx,
            tiles,
            100, // cost
            200, // range
            20, // damage
            120, // upgradeCost
            5, // maxLevel
            60, // Shooting speed
            5, // Projectile speed
            imagePaths, // Skicka bildsökvägar till överordnad Tower-klass
            projectileImagePaths,
            towerOptions,
            towerType,
            status,
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
    constructor(gameCtx, tiles, status) {
        const imagePaths = ["../js/model/assets/Tower/Tower1/RedMoonTower_free_idle_animation4.png"];

        const projectileImagePaths = [
            "../js/model/assets/Tower/Projectile/Mage/Mage.png",
            "../js/model/assets/Tower/Projectile/Mage/Mage3.png",
            "../js/model/assets/Tower/Projectile/Mage/Mage4.png",
            "../js/model/assets/Tower/Projectile/Mage/Mage5.png",
            "../js/model/assets/Tower/Projectile/Mage/Mage6.png",
            "../js/model/assets/Tower/Projectile/Mage/Mage7.png",
        ];

        const towerType = "Wizard";
        const towerOptions = {
            frameWidth: 1100/ 11, // Bredden på varje frame (280 / 4)
            frameHeight: 1300, // Höjden på varje frame
            frameIndex: 0, // Aktuell frame-index
            frameCount:11, // Antal frames i bilden
            frameUpdateCounter:  0,
            frameSpeed: 12
        };

        super(
            gameCtx,
            tiles,
            200, // cost
            170, // range
            80, // damage
            300, // upgradeCost
            5, // maxLevel
            110, // Shooting speed
            4.5, // Projectile speed
            imagePaths, // Skicka bildsökvägar till överordnad Tower-klass
            projectileImagePaths,
            towerOptions,
            towerType,
            status
        );
    }
}

/**
 * Class for the Inferno Tower. Extends the Tower Class.
 * @class InfernoTower
 * @extends Tower
 * @author Emil
 */
export class InfernoTower extends Tower{
    constructor(gameCtx, tiles, status) {
        const imagePaths = ["../js/model/assets/Tower/InfernoT.png"];
        const projectileImagePaths = [
            "../js/model/assets/Tower/Projectile/Inferno/FB500-1.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-2.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-3.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-4.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-5.png",
            "../js/model/assets/Tower/Projectile/Inferno/B500-2.png",
            "../js/model/assets/Tower/Projectile/Inferno/B500-3.png",
            "../js/model/assets/Tower/Projectile/Inferno/B500-4.png"
        ];
        const towerOptions = {
            frameWidth: 280/ 4, // Bredden på varje frame (280 / 4)
            frameHeight: 130, // Höjden på varje frame
            frameIndex: 0, // Aktuell frame-index
            frameCount:4, // Antal frames i bilden
            frameUpdateCounter:  0,
            frameSpeed: 10
        };
        const towerType = "Inferno";
        super(
            gameCtx,
            tiles,
            700,
            250,
            20,
            1000,
            2,
            35,
            4.5,
            imagePaths,
            projectileImagePaths,
            towerOptions,
            towerType,
            status

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
    constructor(gameCtx, tiles, status) {


        const imagePaths = ["../js/model/assets/Tower/StoneT.png"];
        const projectileImagePaths = [
            "../js/model/assets/Tower/Projectile/Stone/Stone3.png",
            "../js/model/assets/Tower/Projectile/Stone/Stone4.png",
            "../js/model/assets/Tower/Projectile/Stone/Stone5.png",
            "../js/model/assets/Tower/Projectile/Stone/Stone6.png",
            "../js/model/assets/Tower/Projectile/Stone/Stone7.png",
        ];
        const towerOptions = {
            frameWidth: 280/ 4, // Bredden på varje frame (280 / 4)
            frameHeight: 130, // Höjden på varje frame
            frameIndex: 0, // Aktuell frame-index
            frameCount:4, // Antal frames i bilden
            frameUpdateCounter:  0,
            frameSpeed: 10
        };
        const towerType = "Stone";
        super(
            gameCtx,
            tiles,
            700,
            250,
            20,
            1000,
            2,
            35,
            4.5,
            imagePaths,
            projectileImagePaths,
            towerOptions,
            towerType,
            status

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
    constructor(gameCtx, tiles, status) {
        const imagePaths = [""];
        const projectileImagePath = [""];
        const towerType = "Fast";
        const towerOptions = {
            frameWidth: 410/ 4, // Bredden på varje frame (280 / 4)
            frameHeight: 130, // Höjden på varje frame
            frameIndex: 0, // Aktuell frame-index
            frameCount:4, // Antal frames i bilden
            frameUpdateCounter:  0,
            frameSpeed: 10
        };
        super(
            gameCtx,
            tiles,
            150, // cost, higher cost than archer-
            250, // range, smaller range than archer
            10, // damage, higher damage than archer
            180, // upgradeCost
            3, //
            30, //Shooting speed
            12, // projectile speed
            imagePaths,
            projectileImagePath,
            towerOptions,
            towerType,
            status
        );
    }
}

export class IceTower extends Tower{
    constructor(gameCtx, tiles, status) {
        const imagePaths = ["../js/model/assets/Tower/IceT.png"];
        //const projectileImagePaths =["../js/model/assets/Tower/Projectile/FB500-2.png"];

        const projectileImagePaths = [
            "../js/model/assets/Tower/Projectile/Ice/Ice3.png",
            "../js/model/assets/Tower/Projectile/Ice/Ice4.png",
            "../js/model/assets/Tower/Projectile/Ice/Ice5.png",
            "../js/model/assets/Tower/Projectile/Ice/Ice6.png",
            "../js/model/assets/Tower/Projectile/Ice/Ice7.png",

        ];
        const towerType = "Ice";
        const towerOptions = {
            frameWidth: 280/4, // Bredden på varje frame (280 / 4)
            frameHeight:  1024, // Höjden på varje frame
            frameIndex: 0, // Aktuell frame-index
            frameCount:4, // Antal frames i bilden
            frameUpdateCounter:0  ,
            frameSpeed: 10
        };

        super(
            gameCtx,
            tiles,
            700, // cost
            200, // range
            5, // damage
            120, // upgradeCost
            5, // maxLevel
            80, // Shooting speed
            5, // Projectile speed
            imagePaths, // Skicka bildsökvägar till överordnad Tower-klass
            projectileImagePaths,
            towerOptions,
            towerType,
            status
        );
    }
}

