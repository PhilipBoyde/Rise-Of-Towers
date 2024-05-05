import { Tower } from "../controller/TowerController.js";

/**
 * Class for the Archer Tower. Extends the Tower class.
 * @class ArcherTower
 * @extends Tower
 * @author Philip
 */
export class ArcherTower extends Tower {
    constructor(gameCtx, tiles) {
        const imagePaths = ["../js/model/assets/Tower/IceTower/towersIce.png"];
        //const projectileImagePaths =["../js/model/assets/Tower/Projectile/FB500-2.png"];

        const projectileImagePaths = [
            "../js/model/assets/Tower/Projectile/Inferno/FB500-2.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-3.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-4.png",
            "../js/model/assets/Tower/Projectile/Inferno/FB500-5.png"
        ];
        const towerType = "Archer";
        const towerOptions = {
            frameWidth: 1792, // Bredden på varje frame (280 / 4)
            frameHeight:  1024, // Höjden på varje frame
            frameIndex: 6, // Aktuell frame-index
            frameCount:0, // Antal frames i bilden
            frameUpdateCounter:  0,
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
            towerOptions, towerType
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
            projectileImagePaths, towerOptions, towerType

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

        const imagePaths = ["../js/model/assets/Tower/Tower1/7.png"];
        const projectileImagePaths = [
            "../js/model/assets/Tower/Projectile/Stone/Stone3.png",
            "../js/model/assets/Tower/Projectile/Stone/Stone4.png",
            "../js/model/assets/Tower/Projectile/Stone/Stone5.png",
            "../js/model/assets/Tower/Projectile/Stone/Stone6.png",
            "../js/model/assets/Tower/Projectile/Stone/Stone7.png",
        ];
        const towerType = "Stone";
        const towerOptions = {
            frameWidth: 280/ 4, // Bredden på varje frame (280 / 4)
            frameHeight: 130, // Höjden på varje frame
            frameIndex: 0, // Aktuell frame-index
            frameCount:4, // Antal frames i bilden
            frameUpdateCounter:  0,
            frameSpeed: 10
        };
        super(
            gameCtx,
            tiles,
            120, // cost, higher cost than archer-
            80, // range, smaller range than archer
            80, // damage, higher damage than archer
            150, // upgradeCost
            5, // maxLevel
            5, // Shooting speed, lower than archer.
            imagePaths, // Skicka bildsökvägar till överordnad Tower-klass
            projectileImagePaths,
            towerOptions,towerType
        );
    }
}
export class FastTower extends Tower {
    constructor(gameCtx, tiles) {
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
            towerType
        );
    }
}

export class IceTower extends Tower{
    constructor(gameCtx,tiles) {
        const imagePaths = [""];
        const projectileImagePaths = [
            "../js/model/assets/Tower/Projectile/Ice/Ice3.png",
            "../js/model/assets/Tower/Projectile/Ice/Ice4.png",
            "../js/model/assets/Tower/Projectile/Ice/Ice5.png",
            "../js/model/assets/Tower/Projectile/Ice/Ice6.png",
            "../js/model/assets/Tower/Projectile/Ice/Ice7.png",
        ];
        const towerType = "Ice";
        const towerOptions = {
            frameWidth: 410/ 4, // Bredden på varje frame (280 / 4)
            frameHeight: 130, // Höjden på varje frame
            frameIndex: 0, // Aktuell frame-index
            frameCount:4, // Antal frames i bilden
            frameUpdateCounter:  0,
            frameSpeed: 10
        };
        super(gameCtx,
            tiles,
            175,
            250,
            10,
            200,
            2,
            12,
            12,
            imagePaths,
            projectileImagePaths,
            towerOptions,
            towerType
        );
    }
}

