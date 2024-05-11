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
            100, // base cost
            200,
            200, // range
            20, // Base damage
            5, // maxLevel
            60, // Base Shooting speed
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
            300,
            170, // range
            80, // damage
            3, // maxLevel
            110, // Shooting speed
            4.5, // Projectile speed
            imagePaths, // Skicka bildsökvägar till överordnad Tower-klass
            projectileImagePaths,
            towerOptions,
            towerType,
            status,
            {upgradeInfo: { //Info about the different upgrades
                level2: {
                    cost: 200,
                    damage: 200,
                    speed: 115
                },

                level3: {
                    cost: "$$$",
                    damage: 300,
                    speed: 120
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
            400,
            250,
            20,
            3,
            35,
            4.5,
            imagePaths,
            projectileImagePaths,
            towerOptions,
            towerType,
            status,
            {upgradeInfo: { //Info about the different upgrades
                    level2: {
                        cost: 200,
                        damage: 200,
                        speed: 115
                    },

                    level3: {
                        cost: "$$$",
                        damage: 300,
                        speed: 120
                    }
                }},

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
            500,
            250,
            20,
            3,
            35,
            4.5,
            imagePaths,
            projectileImagePaths,
            towerOptions,
            towerType,
            status,
            {upgradeInfo: { //Info about the different upgrades
                    level2: {
                        cost: 200,
                        damage: 200,
                        speed: 115
                    },

                    level3: {
                        cost: "$$$",
                        damage: 300,
                        speed: 120
                    }
                }},

        );
    }
}

export class IceTower extends Tower{
    constructor(gameCtx, tiles, status) {
        const imagePaths = ["../js/model/assets/Tower/Tower1/walla.png"];
        //const projectileImagePaths =["../js/model/assets/Tower/Projectile/FB500-2.png"];
        // ../js/model/assets/Tower/IceT.png

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
            frameSpeed: 19
        };

        super(
            gameCtx,
            tiles,
            700, // cost
            800,
            200, // range
            5, // damage
            3, // maxLevel
            80, // Shooting speed
            5, // Projectile speed
            imagePaths, // Skicka bildsökvägar till överordnad Tower-klass
            projectileImagePaths,
            towerOptions,
            towerType,
            status,
            {upgradeInfo: { //Info about the different upgrades
                    level2: {
                        cost: 200,
                        damage: 200,
                        speed: 115
                    },

                    level3: {
                        cost: "$$$",
                        damage: 300,
                        speed: 120,
                        img: "../js/model/assets/Tower/IceT.png"
                    }
                }},
        );
    }
}

