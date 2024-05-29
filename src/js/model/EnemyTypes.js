import {Enemy} from '../controller/EnemyController.js';


/**
 * Class for the slime enemy. Extends the Enemy class.
 * @extends Enemy
 * @class slime
 * @author Philip
 */
export class slime extends Enemy {
    /**
     * Constructor for the slime enemy. Sets the position and path for the slime enemy.
     * Also sets the sprite images for the slime enemy and sets the health and speed for the slime enemy.
     * @constructor
     * @param position
     * @param path
     * @author Philip
     */
    constructor({position = {x: 0, y: 0}}, path) {
        super(
            {position},
            0.9, //speed
            path,
            100, //health
            20, //coins
            {spriteImages: { //Sprite images for the wolf enemy
                    up: '../js/model/assets/EnemySprites/Slime/U_Walk.png',
                    down: '../js/model/assets/EnemySprites/Slime/D_Walk.png',
                    right: '../js/model/assets/EnemySprites/Slime/S_Walk.png',
                    left: '../js/model/assets/EnemySprites/Slime/S_Walk.png'
                }},
            48, //width of hit box
            48, //height hit box
            {frames: { // for sprite animation
                    max: 6, // the number of frames in the sprite
                    min: 0, // the starting frame, typically 0
                    hold: 6, // how many frames to hold each frame, made for fine-tuning the animation
                    cropOffsetX: 0, // offset for the crop
                    cropOffsetY: 0, // offset for the crop
                    scale: 1, // scale for the sprite, 1 = normal size
                }}
        );
    }
}

/**
 * Class for the wolf enemy. Extends the Enemy class.
 * @extends Enemy
 * @class wolf
 * @author Philip
 */
export class wolf extends Enemy {
    /**
     * Constructor for the wolf enemy. Sets the position and path for the wolf enemy.
     * Also sets the sprite images for the wolf enemy and sets the health and speed for the wolf enemy.
     * @param position
     * @param path
     */
    constructor({position = {x: 0, y: 0}}, path) {
        super(
            {position},
            1.5, //speed
            path,
            50, //health
            5, //coins
            {spriteImages: { //Sprite images for the wolf enemy
                up: '../js/model/assets/EnemySprites/Wolf/U_Walk.png',
                down: '../js/model/assets/EnemySprites/Wolf/D_Walk.png',
                right: '../js/model/assets/EnemySprites/Wolf/R_Walk.png',
                left: '../js/model/assets/EnemySprites/Wolf/L_Walk.png'
            }},
            48, //width of hit box
            48, //height hit box
            {frames: { // for sprite animation
                    max: 6, // the number of frames in the sprite
                    min: 0, // the starting frame, typically 0
                    hold: 6, // how many frames to hold each frame, made for fine-tuning the animation
                    cropOffsetX: 0, // offset for the crop
                    cropOffsetY: 0, // offset for the crop
                    scale: 1, // scale for the sprite, 1 = normal size
                }}
        );
    }
}

/**
 * Class for the bee enemy. Extends the Enemy class.
 * @extends Enemy
 * @class bee
 * @author Philip
 */
export class bee extends Enemy {

    /**
     * Constructor for the bee enemy. Sets the position and path for the bee enemy.
     * Also sets the sprite images for the bee enemy and sets the health and speed for the bee enemy.
     * @constructor
     * @param position
     * @param path
     * @author Philip
     */
    constructor({position = {x: 0, y: 0}}, path) {
        super(
            {position},
            3, //speed
            path,
            20, //health
            20, //coins
            {spriteImages: { //Sprite images for the wolf enemy
                    up: '../js/model/assets/EnemySprites/Bee/U_Walk.png',
                    down: '../js/model/assets/EnemySprites/Bee/D_Walk.png',
                    right: '../js/model/assets/EnemySprites/Bee/R_Walk.png',
                    left: '../js/model/assets/EnemySprites/Bee/L_Walk.png'
                }},
            28, //width of hit box
            28, //height hit box
            {frames: { // for sprite animation
                    max: 6, // the number of frames in the sprite
                    min: 0, // the starting frame, typically 0
                    hold: 6, // how many frames to hold each frame, made for fine-tuning the animation
                    cropOffsetX: 10, // offset for the crop
                    cropOffsetY: 10, // offset for the crop
                    scale: 1, // scale for the sprite, 1 = normal size
                }}
        );
    }
}

/**
 * Class for the goblin enemy. Extends the Enemy class.
 * @extends Enemy
 * @class goblin
 * @author Philip
 */
export class goblin extends Enemy {

    /**
     * Constructor for the goblin enemy. Sets the position and path for the goblin enemy.
     * Also sets the sprite images for the goblin enemy and sets the health and speed for the goblin enemy.
     * @param position
     * @param path
     * @author Philip
     */
    constructor({position = {x: 0, y: 0}}, path) {
        super(
            {position},
            1, //speed
            path,
            100, //health
            20, //coins
            {spriteImages: {
                    up: '../js/model/assets/EnemySprites/Goblin/U_Walk.png',
                    down: '../js/model/assets/EnemySprites/Goblin/D_Walk.png',
                    right: '../js/model/assets/EnemySprites/Goblin/R_Walk.png',
                    left: '../js/model/assets/EnemySprites/Goblin/L_Walk.png'
                }},
            48, //width of hit box
            48, //height hit box
            {frames: { // for sprite animation
                    max: 6, // the number of frames in the sprite
                    min: 0, // the starting frame, typically 0
                    hold: 6, // how many frames to hold each frame, made for fine-tuning the animation
                    cropOffsetX: 0, // offset for the crop
                    cropOffsetY: 0, // offset for the crop
                    scale: 1, // scale for the sprite, 1 = normal size
                }}
        );
    }
}


export class Cyclops extends Enemy {

    /**
     * Constructor for the Cyclops enemy. Sets the position and path for the Cyclops enemy.
     * Also sets the sprite images for the Cyclops enemy and sets the health and speed for the Cyclops enemy.
     * @param position
     * @param path
     * @author Philip
     * @author Muhamed
     */
    constructor({position = {x: 0, y: 0}}, path) {
        super(
            {position},
            0.7, //speed
            path,
            5000, //health
            500, //coins
            {spriteImages: {
                    up: '../js/model/assets/EnemySprites/Boss/Cyclops/walk4.png',
                    down: '../js/model/assets/EnemySprites/Boss/Cyclops/walk4.png',
                    right: '../js/model/assets/EnemySprites/Boss/Cyclops/walk4.png',
                    left: '../js/model/assets/EnemySprites/Boss/Cyclops/walk4.png',
                }},
            50, //width of hit box
            80, //height hit box
            {frames: { // for sprite animation
                    max: 12, // the number of frames in the sprite
                    min: 0, // the starting frame, typically 0
                    hold: 18, // how many frames to hold each frame, made for fine-tuning the animation
                    cropOffsetX: 16, // offset for the crop
                    cropOffsetY: 0, // offset for the crop
                    scale: 1.8, // scale for the sprite, 1 = normal size
                }}
        );
    }
}

/**
 * Class representing a Mech enemy.
 * @extends Enemy
 * @class Mech
 * @author Philip
 * @author Muhamed
 */
export class Mech extends Enemy {
    constructor({position = {x: 0, y: 0}}, path) { // !!NOT DONE!!
        super(
            {position},
            0.5, //speed
            path,
            10000, //health
            700, //coins
            {spriteImages: {
                    up: '../js/model/assets/EnemySprites/Boss/Mech/walk2.png',
                    down: '../js/model/assets/EnemySprites/Boss/Mech/walk2.png',
                    right: '../js/model/assets/EnemySprites/Boss/Mech/walk2.png',
                    left: '../js/model/assets/EnemySprites/Boss/Mech/walk2.png'
                }},
            110, //width of hit box
            90, //height hit box
            {frames: { // for sprite animation
                    max: 8, // the number of frames in the sprite
                    min: 0, // the starting frame, typically 0
                    hold: 15, // how many frames to hold each frame, made for fine-tuning the animation
                    cropOffsetX: 0, // offset for the crop X
                    cropOffsetY: 0, // offset for the crop Y
                    scale: 1.5, // scale for the sprite, 1 = normal size
                }}
        );
    }
}

/**
 * Class representing a dragonWiz enemy.
 * @extends Enemy
 * @class dragonWiz
 * @author Philip
 * @author Muhamed
 */
export class dragonWiz extends Enemy {
    constructor({position = {x: 0, y: 0}}, path) { // !!NOT DONE!!
        super(
            {position},
            1.5, //speed
            path,
            600, //health
            25, //coins
            {spriteImages: {
                    up: '../js/model/assets/EnemySprites/dragonWiz/walk.png',
                    down: '../js/model/assets/EnemySprites/dragonWiz/walk.png',
                    right: '../js/model/assets/EnemySprites/dragonWiz/walk.png',
                    left: '../js/model/assets/EnemySprites/dragonWiz/walk.png'
                }},
            55, //width of hit box
            48, //height hit box
            {frames: { // for sprite animation
                    max: 8, // the number of frames in the sprite
                    min: 0, // the starting frame, typically 0
                    hold: 6, // how many frames to hold each frame, made for fine-tuning the animation
                    cropOffsetX: 0, // offset for the crop X
                    cropOffsetY: 0, // offset for the crop Y
                    scale: 1.7, // scale for the sprite, 1 = normal size
                }}
        );
    }
}

/**
 * Class representing a akaname enemy.
 * @extends Enemy
 * @class akaname
 * @author Philip
 */
export class akaname extends Enemy {
    constructor({position = {x: 0, y: 0}}, path) { // !!NOT DONE!!
        super(
            {position},
            1.5, //speed
            path,
            120, //health
            15, //coins
            {spriteImages: {
                    up: '../js/model/assets/EnemySprites/Akaname/walk.png',
                    down: '../js/model/assets/EnemySprites/Akaname/walk.png',
                    right: '../js/model/assets/EnemySprites/Akaname/walk.png',
                    left: '../js/model/assets/EnemySprites/Akaname/walk.png'
                }},
            55, //width of hit box
            48, //height hit box
            {frames: { // for sprite animation
                    max: 8, // the number of frames in the sprite
                    min: 0, // the starting frame, typically 0
                    hold: 6, // how many frames to hold each frame, made for fine-tuning the animation
                    cropOffsetX: 0, // offset for the crop X
                    cropOffsetY: 0, // offset for the crop Y
                    scale: 1.7, // scale for the sprite, 1 = normal size
                }}
        );
    }
}
