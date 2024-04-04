import { path1Route1, path1Route2, path1Route3 } from '../../model/map1/Map1Paths.js';
import {Enemy} from "../EnemyController.js";

export class Startmap1{
    constructor() {
        console.log('Map1 Controller loaded');
    }

    nexWave(round){
        const enemies = [];
        let randomNumber = 0;
        let pathRoute;

        for (let i = 1; i <56;  i++) {

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

            enemies.push(new Enemy({position: {x: path1Route1[0].x + xOffSet, y: path1Route1[0].y}}, 1, pathRoute, 100));
        }

        return enemies;
    }

    

}



