import { Tower } from "../controller/TowerController.js";
/**
 * Class for the Wizard Tower. Extends the Tower class.
 * @class WizardTower
 * @extends Tower
 * @author Philip
 * @author Muhamed
 * @author Mahyar
 */
export class WizardTower extends Tower {
    constructor(gameCtx, tiles, status) {
        const imagePaths = ["../js/model/assets/Tower/Tower1/RedMoonTower_free_idle_animation4.png"];

        const projectileImagePaths = [
            "../js/model/assets/Tower_Projectiles/Mage/Mage.png",
            "../js/model/assets/Tower_Projectiles/Mage/Mage3.png",
            "../js/model/assets/Tower_Projectiles/Mage/Mage4.png",
            "../js/model/assets/Tower_Projectiles/Mage/Mage5.png",
            "../js/model/assets/Tower_Projectiles/Mage/Mage6.png",
            "../js/model/assets/Tower_Projectiles/Mage/Mage7.png",
        ];

        const towerType = "Wizard";
        const towerOptions = {
            frameWidth: 1100 / 11, // every frame width (1100 / 11)
            frameHeight: 1300, // frames height
            frameIndex: 0, // Actual frame-index
            frameCount: 11, // number of frames in the image
            frameUpdateCounter: 0,
            frameSpeed: 12
        };

        super(
            gameCtx,
            tiles,
            200, // cost
            300,
            200, // range
            9, // damage
            3, // maxLevel
            25, // Shooting speed
            9, // Projectile speed
            imagePaths, // sends image paths to the parent Tower class
            projectileImagePaths,
            towerOptions,
            towerType,
            status,
            { upgradeInfo: { //Info about the different upgrades
                    level2: {
                        cost: 200,
                        upgradeCost: 300,
                        range: 200,
                        damage: 18,
                        maxLevel: 3,
                        speed: 25,
                        projectileSpeed: 15
                    },

                    level3: {
                        cost: "$$$",
                        upgradeCost: 0,
                        range: 200,
                        damage: 30,
                        maxLevel: 3,
                        speed: 30,
                        projectileSpeed: 25

                    }
                }},
        );
    }
}

/**
 * Class for the Inferno Tower. Extends the Tower Class.
 * @class InfernoTower
 * @extends Tower
 * @author Emil
 * @author Philip
 * @author Muhamed
 * @author Mahyar
 */
export class InfernoTower extends Tower {
    constructor(gameCtx, tiles, status) {
        const imagePaths = ["../js/model/assets/Tower/InfernoT.png"];
        const projectileImagePaths = [
            "../js/model/assets/Tower_Projectiles/Inferno/FB500-1.png",
            "../js/model/assets/Tower_Projectiles/Inferno/FB500-2.png",
            "../js/model/assets/Tower_Projectiles/Inferno/FB500-3.png",
            "../js/model/assets/Tower_Projectiles/Inferno/FB500-4.png",
            "../js/model/assets/Tower_Projectiles/Inferno/FB500-5.png",
            "../js/model/assets/Tower_Projectiles/Inferno/B500-2.png",
            "../js/model/assets/Tower_Projectiles/Inferno/B500-3.png",
            "../js/model/assets/Tower_Projectiles/Inferno/B500-4.png"
        ];
        const towerOptions = {
            frameWidth: 280 / 4,
            frameHeight: 130,
            frameIndex: 0,
            frameCount: 4,
            frameUpdateCounter: 0,
            frameSpeed: 10
        };
        const towerType = "Inferno";
        super(
            gameCtx,
            tiles,
            900,
            900,
            250,
            70,
            3,
            35, // shooting speed
            7,
            imagePaths,
            projectileImagePaths,
            towerOptions,
            towerType,
            status,
            { upgradeInfo: { // Info about the different upgrades
                    level2: {
                        cost: 900,
                        upgradeCost: 900,
                        range: 260,
                        damage: 100,
                        maxLevel: 3,
                        speed: 36,
                        projectileSpeed: 7,
                    },

                    level3: {
                        cost: "$$$",
                        upgradeCost: 900,
                        range: 270,
                        damage: 175,
                        maxLevel: 3,
                        speed: 37,
                        projectileSpeed: 7
                    }
                }},
        );
    }
}

/**
 * Class for the Stone Tower. Extends the Tower class.
 * @class StoneTower
 * @extends Tower
 * @author Muhamed
 * @author Emil
 * @author Philip
 * @author Mahyar
 */
export class StoneTower extends Tower {
    constructor(gameCtx, tiles, status) {

        const imagePaths = ["../js/model/assets/Tower/StoneT.png"];
        const projectileImagePaths = [
            "../js/model/assets/Tower_Projectiles/Stone/Stone3.png",
            "../js/model/assets/Tower_Projectiles/Stone/Stone4.png",
            "../js/model/assets/Tower_Projectiles/Stone/Stone5.png",
            "../js/model/assets/Tower_Projectiles/Stone/Stone6.png",
            "../js/model/assets/Tower_Projectiles/Stone/Stone7.png",
        ];
        const towerOptions = {
            frameWidth: 280 / 4,
            frameHeight: 130,
            frameIndex: 0,
            frameCount: 4,
            frameUpdateCounter: 0,
            frameSpeed: 10
        };
        const towerType = "Stone";
        super(
            gameCtx,
            tiles,
            700,
            500,
            250,
            40,
            3,
            90,
            10,
            imagePaths,
            projectileImagePaths,
            towerOptions,
            towerType,
            status,
            { upgradeInfo: { //Info about the different upgrades
                    level2: {
                        cost: 700,
                        upgradeCost: 500,
                        range: 250,
                        damage: 45,
                        maxLevel: 3,
                        speed: 95,
                        projectileSpeed: 12,
                        aoeRadius: 70
                    },

                    level3: {
                        cost: "$$$",
                        upgradeCost: 500,
                        range: 252,
                        damage: 60,
                        maxLevel: 3,
                        speed: 96,
                        projectileSpeed: 15,
                        aoeRadius: 100
                    }
                }},
            50,
        );
    }
}

/**
 * Class for the Ice Tower. Extends the Tower class.
 * @class IceTower
 * @extends Tower
 * @author Mahyar
 * @author Philip
 * @author Muhamed
 */
export class IceTower extends Tower {
    constructor(gameCtx, tiles, status) {
        const imagePaths = ["../js/model/assets/Tower/Tower1/walla.png"];
        // const projectileImagePaths = ["../js/model/assets/Tower/Projectile/FB500-2.png"];
        // ../js/model/assets/Tower/IceT.png

        const projectileImagePaths = [
            "../js/model/assets/Tower_Projectiles/Ice/Ice3.png",
            "../js/model/assets/Tower_Projectiles/Ice/Ice4.png",
            "../js/model/assets/Tower_Projectiles/Ice/Ice5.png",
            "../js/model/assets/Tower_Projectiles/Ice/Ice6.png",
            "../js/model/assets/Tower_Projectiles/Ice/Ice7.png",
        ];
        const towerType = "Ice";
        const towerOptions = {
            frameWidth: 280 / 4, // Bredden på varje frame (280 / 4)
            frameHeight: 1024, // Höjden på varje frame
            frameIndex: 0, // Aktuell frame-index
            frameCount: 4, // Antal frames i bilden
            frameUpdateCounter: 0,
            frameSpeed: 19
        };

        super(
            gameCtx,
            tiles,
            300, // cost
            300,
            200, // range
            10, // damage
            3, // maxLevel
            80, // Shooting speed
            5, // Projectile speed
            imagePaths, // Skicka bildsökvägar till överordnad Tower-klass
            projectileImagePaths,
            towerOptions,
            towerType,
            status,
            { upgradeInfo: { //Info about the different upgrades
                    level2: {
                        cost: 500,
                        upgradeCost: 300,
                        range: 300,
                        damage: 15,
                        maxLevel: 3,
                        speed: 115,
                        projectileSpeed: 7
                    },

                    level3: {
                        cost: "$$$",
                        upgradeCost: 300,
                        range: 400,
                        damage: 20,
                        maxLevel: 3,
                        speed: 120,
                        projectileSpeed: 10
                    }
                }},
        );
    }
}
