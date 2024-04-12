import {Map1Paths, Map2Paths, Map3Paths} from "./pathRouteManager.js";
import {goblin, slime, wolf, bee, Cyclops, Mech, dragonWiz, akaname} from "./EnemyTypes.js";

/*
--- variables ---
 */
const enemyType = { // spawn rates for the different enemy types counted in percentage
    "Goblin": 0.12,
    "Slime": 0.10,
    "Wolf": 0.4,
    "Bee": 0.10,
    "Cyclops": 0.01,
}

let pathRoutesForMap = []; // path to be used for the wave

/*
--- end of variables ---
 */

/**
 * Changes the map based on the activeMap variable.
 * @param activeMapNbr
 * @author Philip
 */
export function changeMapRoutes(activeMapNbr){
    switch (activeMapNbr) { // Load the map based paths based on the activeMap variable
        case 1:
            pathRoutesForMap = Map1Paths;
            break;

        case 2:
            pathRoutesForMap = Map2Paths;
            break;

        case 3:
            pathRoutesForMap = Map3Paths;
            break;

        default:
            console.log('Path not found!');
            break;
    }
}

let numEnemiyIncrese = 0; // number of enemies to increase per round

/**
 * Calculates the wave of enemies based on the round. The number of enemies increases by 2% per round.
 * Every third round the number of enemies increases by 2. The enemies are created based on a random number.
 * The path for the enemies to follow is also chosen based on a random number.
 * @param round
 * @returns {*[]}
 * @author Philip
 */
export function calculateWave(round){
    const baseEnemies = 4; // 5 enemies in the first round
    const enemiesMultiplier = 1.05; // 2% increase in enemies per round

    let numEnemies = Math.floor(baseEnemies * Math.pow(enemiesMultiplier, round - 1));

    if (round % 3 === 0) { // every third round increase the number of enemies
        numEnemiyIncrese += 2;
    }

    const waveEnemies = []; // array to hold the enemies for the wave

    for (let i = 0; i < numEnemies + numEnemiyIncrese; i++) { // loop through the number of enemies to create
        const xOffSet = i * 60; // offset for the x position of the enemies
        let activePath = choosePath();
        const random = Math.random();
        let sum = 0;

        for (let type in enemyType) { // loop through the enemy types until the random number is less than the sum
            sum += enemyType[type];
            if (random < sum) {
                createEnemyType(xOffSet, activePath, type);
                break; // break the loop when the random number is less than the sum
            }
        }
    }



    /**
     * Creates the enemy type based on the type of enemy.
     * @param xOffSet
     * @param activePath
     * @param type
     * @author Philip
     */
    function createEnemyType(xOffSet, activePath, type){
        switch (type) {
            case 'Goblin':
                for (let i = 0; i < 4; i++) { //create 5 goblin in a group

                    waveEnemies.push(new goblin({position: {x: activePath[0].x + xOffSet, y: activePath[0].y}}, activePath));
                    xOffSet += 40;
                }
                break;

            case 'Slime':
                waveEnemies.push(new slime({position: {x: activePath[0].x + xOffSet, y: activePath[0].y}}, activePath));
                break;

            case 'Wolf':
                waveEnemies.push(new wolf({position: {x: activePath[0].x + xOffSet, y: activePath[0].y}}, activePath));
                break;

            case 'Bee':
                waveEnemies.push(new bee({position: {x: activePath[0].x + xOffSet, y: activePath[0].y}}, activePath));
                break;

            case 'Cyclops':
                waveEnemies.push(new Cyclops({position: {x: activePath[0].x + xOffSet, y: activePath[0].y}}, activePath));
                break;

            case 'Akane':
                waveEnemies.push(new akaname({position: {x: activePath[0].x + xOffSet, y: activePath[0].y}}, activePath));
                break;

            default:
                console.log('Something went wrong when creating the enemy type!')
                break;
        }
    }

    waveEnemies.reverse(); // reverse the array to get the enemies to spawn in the correct order and so sprite animation is correct
    return waveEnemies;
}

/**
 * Chooses the path for the enemies to follow. Based on a random number.
 * @returns {[{x: number, y: number},{x: number, y: number},*,*]} - The path for the enemies to follow.
 * @author Philip
 */
function choosePath(){
    let activePath;
    const random = Math.random();
    const randomNumber = Math.floor(random * 3) + 1;

    switch (randomNumber) {
        case 1:
            activePath = pathRoutesForMap.Route1
            break;

        case 2:
            activePath = pathRoutesForMap.Route2
            break;

        case 3:
            activePath = pathRoutesForMap.Route3
            break;

        default:
            console.log('Something went wrong when choosing the path for enemies!');
            break;
    }
    return activePath;
}

/*
--- for testing purposes only not used in the final version ---
 */
export function testEnemyType(){
    let waveEnemies = [];
    let activePath = choosePath();
    let xOffSet = 0;

    for (let i = 0; i < 1; i++) {
        const enemy = new Cyclops({position: {x: activePath[0].x + xOffSet, y: activePath[0].y}}, activePath)
        waveEnemies.push(enemy);
        xOffSet += 40;
        activePath = choosePath();
    }

    waveEnemies.reverse();
    return waveEnemies;
}



