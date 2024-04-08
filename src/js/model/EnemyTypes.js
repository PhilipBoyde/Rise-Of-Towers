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
            {spriteImages: { //Sprite images for the wolf enemy
                    up: '../js/model/assets/EnemySprites/Slime/U_Walk.png',
                    down: '../js/model/assets/EnemySprites/Slime/D_Walk.png',
                    right: '../js/model/assets/EnemySprites/Slime/S_Walk.png',
                    left: '../js/model/assets/EnemySprites/Slime/S_Walk.png'
                }},
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
            {spriteImages: { //Sprite images for the wolf enemy
                up: '../js/model/assets/EnemySprites/Wolf/U_Walk.png',
                down: '../js/model/assets/EnemySprites/Wolf/D_Walk.png',
                right: '../js/model/assets/EnemySprites/Wolf/R_Walk.png',
                left: '../js/model/assets/EnemySprites/Wolf/L_Walk.png'
            }},
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
            {spriteImages: { //Sprite images for the wolf enemy
                    up: '../js/model/assets/EnemySprites/Bee/U_Walk.png',
                    down: '../js/model/assets/EnemySprites/Bee/D_Walk.png',
                    right: '../js/model/assets/EnemySprites/Bee/R_Walk.png',
                    left: '../js/model/assets/EnemySprites/Bee/L_Walk.png'
                }},
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
            {spriteImages: { //Sprite images for the wolf enemy
                    up: '../js/model/assets/EnemySprites/Goblin/U_Walk.png',
                    down: '../js/model/assets/EnemySprites/Goblin/D_Walk.png',
                    right: '../js/model/assets/EnemySprites/Goblin/R_Walk.png',
                    left: '../js/model/assets/EnemySprites/Goblin/L_Walk.png'
                }},
        );
    }
}