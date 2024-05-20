import {Map1Paths, Map2Paths, Map3Paths} from "./pathRouteManager.js";
import {goblin, slime, wolf, bee, Cyclops, Mech, dragonWiz, akaname} from "./EnemyTypes.js";

/*
--- variables ---
 */
const baseComposition = {
    'Bee': {count: 4, increment: 0.5},
    'Wolf': {count: 1, increment: 0.3},
    'Goblin': {count: 0, increment: 2},
    'Slime': {count: 0, increment: 0.5}
};

const specialRounds = {
    5: {'Goblin': 8},
    10: {'Goblin': 16},
    15: {'Cyclops': 1},
    20: {'Goblin': 5, 'Cyclops': 1}
};

let currentWave = 1; // Start with wave 1

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
        case "1":
            pathRoutesForMap = Map1Paths;
            break;

        case "2":
            pathRoutesForMap = Map2Paths;
            break;

        case "3":
            pathRoutesForMap = Map3Paths;
            break;

        default:
            console.log('Path not found!');
            break;
    }
}

/**
 * Determines the composition of enemies for a given wave number.
 * It returns a specific set of enemies for special rounds and a calculated composition based on the round number for regular rounds.
 *
 * @param {number} round - The current round number.
 * @returns {Object} The composition of enemy types and their counts for the given round.
 * @author Philip, Muhamed
 */
function getWaveComposition(round) {
    if (specialRounds[round]) {
        return specialRounds[round];
    }

    let composition = {};
    for (let type in baseComposition) {
        let baseCount = baseComposition[type].count;
        let increment = baseComposition[type].increment;
        composition[type] = Math.floor(baseCount + increment * round);
    }

    if (round > 15) {  // Add cyclops with a progressive chance increment
        addCyclopsIfNeeded(composition, round);
    }

    return composition;
}
/**
 * Conditionally adds a Cyclops to the enemy composition based on the round number.
 * The likelihood of adding a Cyclops increases with the round number.
 *
 * @param {Object} composition - The current composition of enemies.
 * @param {number} round - The current round number.
 * @author Muhamed
 */
function addCyclopsIfNeeded(composition, round) {
    let cyclopsChance = 0.005 + 0.005 * Math.floor((round - 5) / 3); // Increase chance by 0.5% every 3 rounds after round 5
    if (Math.random() < cyclopsChance) {
        composition['Cyclops'] = (composition['Cyclops'] || 0) + 1;
    }
}


/**
 * Calculates the wave of enemies based on the round. The number of enemies increases by 2% per round.
 * Every third round the number of enemies increases by 2. The enemies are created based on a random number.
 * The path for the enemies to follow is also chosen based on a random number.
 * @param round
 * @returns {*[]}
 * @author Philip, Muhamed
 */
export function calculateWave(round) {
    let composition = getWaveComposition(round);

    const waveEnemies = [];
    Object.keys(composition).forEach(type => {
        let count = composition[type];
        let xOffSet = 0;  // Initialize xOffSet within this loop to reset for each type
        for (let i = 0; i < count; i++) {
            let activePath = choosePath();
            createEnemyType(xOffSet, activePath, type, waveEnemies);
            xOffSet += 10;  // Increment the xOffSet within the loop
        }
    });

    waveEnemies.reverse();  // Reverse the array to get the enemies to spawn in the correct order
    return waveEnemies;
}

/**
 * Creates a specific type of enemy and positions it along a path.
 * The enemy type and its position are determined by the inputs.
 * @param {number} xOffSet - The offset on the x-axis for enemy positioning.
 * @param {Object} activePath - The path the enemy will follow.
 * @param {string} type - The type of enemy to create.
 * @param {Array} waveEnemies - The array to which the new enemy will be added.
 * @author Philip, Muhamed
 */
function createEnemyType(xOffSet, activePath, type, waveEnemies) {
    switch (type) {
        case 'Goblin':
            waveEnemies.push(new goblin({position: {x: activePath[0].x + xOffSet, y: activePath[0].y}}, activePath));
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
        // Add other cases as needed
        default:
            console.log('Undefined enemy type encountered: ' + type);
            break;
    }
}

/**
 * Chooses the path for the enemies to follow based on a random number.
 * @returns {{x: number, y: number}[]} - The path for the enemies to follow.
 * @author Philip, Muhamed
 */
function choosePath(){
    const routeCount = pathRoutesForMap.length; // Get the number of available routes
    const randomIndex = Math.floor(Math.random() * routeCount); // Choose a random index based on the available routes
    return pathRoutesForMap[randomIndex]; // Return the randomly chosen route
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
