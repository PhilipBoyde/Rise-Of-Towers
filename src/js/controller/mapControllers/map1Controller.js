import { path1Route1, path1Route2, path1Route3 } from '../../model/map1/Map1Paths.js';
import {wolf, slime, bee, goblin} from "../../model/EnemyTypes.js";

export class Startmap1{
    constructor() {
        console.log('Map1 Controller loaded');
    }

    /**
     * Loads the next wave of enemies.
     * 
     * @param round - The current round of the game.
     * @returns {Array} enemies - An array of enemies to be loaded into the game.
     * @author Philip
     */
    nexWave(round){
        const enemies = [];
        let randomNumber = 0;
        let pathRoute;

        for (let i = 1; i <2;  i++) {


            const random = Math.random();
            randomNumber = Math.floor(random * 3) + 1;
            const xOffSet = i * 60;

            switch (randomNumber) {
                case 1:
                    pathRoute = path1Route1;
                    
                    break;
                    
                case 2:
                    pathRoute = path1Route2;
                    break;
                    
                case 3:
                    pathRoute = path1Route3;
                    break;
                    
                default:
                    console.log('Something went wrong when generating the enemies!');
                    break;
            }

            enemies.push(new slime({position: {x: pathRoute[0].x + xOffSet, y: pathRoute[0].y}}, pathRoute));
            enemies.push(new wolf({position: {x: pathRoute[0].x + xOffSet, y: pathRoute[0].y}}, pathRoute));
            enemies.push(new goblin({position: {x: pathRoute[0].x + xOffSet, y: pathRoute[0].y}}, pathRoute));
            enemies.push(new bee({position: {x: pathRoute[0].x + xOffSet, y: pathRoute[0].y}}, pathRoute));
        }

        return enemies;
    }

    

}



