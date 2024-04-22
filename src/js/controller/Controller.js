import {calculateWave, changeMapRoutes, testEnemyType} from "../model/WaveCalculator.js";
import {gameIsRunning, setGameInfo, updateHoverTiles} from "./placementTiles.js";
import {ArcherTower, FastTower, InfernoTower, WizardTower} from "../model/towerTypes.js";

/**
 *  -TODO-
 *  - Add a way to upgrade towers
 *  - Add a way to change the map
 *  - add functionality to the sell button
 *  - add more towers
 *  - balance the game
 *  - add more bosses
 *  - add enemy death animations
 *  - add sprites for the towers
 *  - add sprites for projectiles
 *  - add animations for the towers
 *  - flush out the tower targeting system
 */

/*
--- variables ---
 */

const  /** HTMLCanvasElement */ gameCanvas = document.querySelector('#GameScreen');
const gameBackground = document.querySelector('#GameBackground');
const /** HTMLCanvasElement */ interactiveCanvas = document.querySelector('#GameUI');
const /** HTMLCanvasElement */ gameHover = document.querySelector('#GameHover');
const /** number */ activeMapNbr = 1;  
let /** number */ round = 0;
let playerHealth = 20;
let coins = 350;
let activeTowers = [];
let img = new Image();


let lastTime = 0;
let currentTime;
let elapsed;
let frameCount = 0;
let fpsAccumulator = 0;

let activeTiles;
let activeTileID;
let allPlacedTowers = [];

const /** CanvasRenderingContext2D */ gameCtx = gameCanvas.getContext('2d');
document.getElementById("GameWaveButton").addEventListener("click", nexWave);
document.getElementById("tower1").addEventListener("click", () => selectTower(1));
document.getElementById("tower2").addEventListener("click", () => selectTower(2));
/*
document.getElementById("tower3").addEventListener("click", () => selectTower(3));
document.getElementById("tower4").addEventListener("click", () => selectTower(4))

 */

document.getElementById("sellButton").addEventListener("click", sellTower);
let sellButton = document.querySelector('#sellButton');
let tower1Button = document.querySelector('#tower1');
let tower2Button = document.querySelector('#tower2');
/*
let tower3Button = document.querySelector('#tower3');
let tower4Button = document.querySelector('#tower4');
 */


const gameBackgroundCtx = gameBackground.getContext('2d');

/*
--- stop of variables ---
 */
/*
--- program initialization ---
 */

/**
 * Sets up canvas dimensions and styling if both gameCanvas and interactiveCanvas exist.
 * Otherwise, alerts the user.
 *
 * @author Philip
 */
if (gameCanvas && interactiveCanvas){
    gameCanvas.width = 1120;
    gameCanvas.height = 960;
    gameBackground.width = gameCanvas.width;
    gameBackground.height = gameCanvas.height;
    gameHover.width = gameCanvas.width;
    gameHover.height = gameCanvas.height;

    interactiveCanvas.width = 200;
    interactiveCanvas.height = 966;

    const interactiveCtx = interactiveCanvas.getContext('2d');
    interactiveCtx.fillStyle = '#574629';
    interactiveCtx.fillRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);
    setGameInfo(gameCanvas, gameCtx)
}else {
    alert('Canvas not found!, Pleas try again later');
}

/**
 * Changes the map based on the activeMap variable.
 *
 * @author Philip
 */
function changeMap(){
    switch (activeMapNbr) { // Load the map based on the activeMap variable
        case 1:
            img.src = '../js/model/assets/gameMap/Map1.png';
            break;

        case 2:
            img.src = '../js/model/assets/gameMap/Map2.png';
            break;

        case 3:
            img.src = '../js/model/assets/gameMap/Map3.png';
            break;

        default:
            console.log('Map not found!');
            break;
    }
    changeMapRoutes(activeMapNbr)
    img.onload = () => {
        gameBackgroundCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);
    }
}

/*
-- start upp methods --
 */
updateCoins()
changeMap()

/*
--- end of program initialization ---
 */

/**
 * Selects the tile that the player clicked on.
 * If the tile is already occupied by a tower, the player can sell the tower.
 * Disables towers based on the kind of tile that was clicked.
 * @param tile
 * @author Philip
 */
export function selectTile(tile){

    if(allPlacedTowers.length >= 0){

        if (tile === undefined){

            tower1Button.style.backgroundColor = 'gray';
            tower1Button.style.filter = 'blur(1px)';
            tower1Button.disabled = true;

            tower2Button.style.backgroundColor = 'gray';
            tower2Button.style.filter = 'blur(1px)';
            tower2Button.disabled = true;

            /*
            tower3Button.style.backgroundColor = 'gray';
            tower3Button.style.filter = 'blur(1px)';
            tower3Button.disabled = true;

            tower4Button.style.backgroundColor = 'gray';
            tower4Button.style.filter = 'blur(1px)';
            tower4Button.disabled = true;
             */

            sellButton.style.backgroundColor = 'gray';
            sellButton.style.filter = 'blur(1px)';
            sellButton.disabled = true;

        } else {

            if (allPlacedTowers.includes(tile.positionID)){
                sellButton.disabled = false;
                sellButton.style.backgroundColor = '';
                sellButton.style.filter = 'blur(0px)';

            } else {

                activeTiles = tile;
                activeTileID = activeTiles.positionID;
                console.log(activeTiles.positionID)
                tower1Button.style.backgroundColor = 'white';
                tower1Button.style.filter = 'blur(0px)';
                tower1Button.disabled = false;

                tower2Button.style.backgroundColor = 'white';
                tower2Button.style.filter = 'blur(0px)';
                tower2Button.disabled = false;

                /*
                tower3Button.style.backgroundColor = 'white';
                tower3Button.style.filter = 'blur(0px)';
                tower3Button.disabled = false;

                tower4Button.style.backgroundColor = 'white';
                tower4Button.style.filter = 'blur(0px)';
                tower4Button.disabled = false;

                 */

                sellButton.style.backgroundColor = 'gray';
                sellButton.style.filter = 'blur(1px)';
                sellButton.disabled = true;
            }
        }
    }
}

/**
 * Gives the player the option to sell the tower that is placed on the selected tile.
 * @author Philip
 */
function sellTower(){
    allPlacedTowers.forEach((tower) => {
        if (tower === activeTileID) {
            allPlacedTowers.splice(allPlacedTowers.indexOf(tower), 1);
            activeTowers.splice(activeTowers.includes(activeTileID), 1);
            coins += 50;
            updateCoins()
            selectTile(undefined);
        }

    });
}

/**
 * Based on the buttonID, the player can select a tower to place on the selected tile.
 * if the player has enough coins, the tower will be placed on the selected tile.
 * else the player will not be able to place the tower.
 * @param buttonID
 * @author Philip
 * @author Emil
 */
function selectTower(buttonID) {

    switch (buttonID) {
        case 1:
            if(coins >= 100){
                activeTowers.push(new ArcherTower(gameCtx, activeTiles));
                allPlacedTowers.push(activeTileID);
                coins -= 100;
                selectTile(undefined);
            }
            break;

        case 2:
            if(coins >= 200){
                activeTowers.push(new WizardTower(gameCtx, activeTiles));
                allPlacedTowers.push(activeTileID);
                coins -= 200;
                selectTile(undefined);
            }
            break;
        case 3:
            if (coins >= 700){
                activeTowers.push(new InfernoTower(gameCtx, activeTiles));
                allPlacedTowers.push(activeTileID);
                coins -=700;
                selectTile(undefined);
            }
            break;
        case 4:
            if (coins >= 150){
            activeTowers.push(new FastTower(gameCtx, activeTiles));
            allPlacedTowers.push(activeTileID);
            coins -= 150;
            selectTile(undefined);
            }
            break;

        default:
            console.log('Tower not found!')
            break;
    }

    activeTowers.forEach(tower => { // tower
        tower.drawTower();
    });
    updateCoins()
}


/**
 * Loads the next wave of enemies.
 * Disables the "GameWaveButton" button while the wave is running.
 * @author Philip
 */
function nexWave(){
    disableButton()
    
    const enemies = calculateWave(round);
    //const enemies = testEnemyType(); // Temporary test function
    gameIsRunning(true);
    gameLoop(enemies);
}


/**
 * Disables the "GameWaveButton" button by changing its style and setting its disabled property to true.
 *
 * @author Philip
 */
function disableButton(){
    let button = document.getElementById("GameWaveButton");
    button.style.backgroundColor = 'gray';
    button.style.filter = 'blur(1px)';
    document.getElementById("GameWaveButton").disabled = true;
}


/**
 * Enables the "GameWaveButton" button by changing its style and setting its disabled property to false.
 *
 * @author Philip
 */
function enableButton(){
    let button = document.getElementById("GameWaveButton");
    button.style.backgroundColor = '';
    button.style.filter = 'none';
    document.getElementById("GameWaveButton").disabled = false;

}

/**
 * Reduces the player health by 1.
 * Updates the health counter on the game screen.
 * @author Philip
 */
function reduceHealth(){
    playerHealth--;
    updateHealthCounter(playerHealth);
}

/**
 * Updates the health with the new health in the game
 * @param newHealth -New number for the health
 * @author Mahyar
 * @author Philip
 */
function updateHealthCounter (newHealth) {
    const healthCounter = document.querySelector('#healthCounter');
    const heartAnimation = document.querySelector('#heartAnimation');
    healthCounter.textContent = newHealth;
    
    switch (newHealth) {
        case 15:
            heartAnimation.src = '../js/model/assets/Life/75.png';
            break;
            
        case 10:
            heartAnimation.src = '../js/model/assets/Life/50.png';
            break;
            
        case 5:
            heartAnimation.src = '../js/model/assets/Life/25.png';
            break;
            
        case 0:
            heartAnimation.src = '../js/model/assets/Life/0.png';
            break;
            
        default:
            break;
    }
}

function addCoins(amount){
    coins += amount;
    updateCoins();
}

/**
 * Updates the coin counter on the game screen. based on the amount of coins the player has.
 * @author Philip
 */
function updateCoins(){
    const CoinsCounter = document.querySelector('#CoinsCounter');
    CoinsCounter.textContent = coins;
}

/**
 * Updates the wave counter on the game screen.
 * @param round
 * @author Philip
 */
function updateWaveCounter(round){
    const waveCounter = document.querySelector('#WaveCounter');
    waveCounter.textContent = 'Wave ' + round;
}



/**
 * The main game loop. Updates the game state and draws the game.
 * is limited to about 60 FPS and is called recursively.
 * Activated by the nextWave button.
 * @param enemies
 * @author Philip,
 */
function gameLoop(enemies) {
    currentTime = performance.now();
    elapsed = currentTime - lastTime;

    if (elapsed > 1000 / 60) { //Limit the frame rate to about 60 FPS
        lastTime = currentTime - (elapsed % (1000 / 60));
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Check if all enemies are dead
        if (enemies.length === 0) {
            console.log('%cWave ' + round + ' Completed!', 'color: green; font-size: 20px;');
            enableButton();
            round++;
            updateWaveCounter(round);
            gameIsRunning(false)

            activeTowers.forEach(tower => { // tower
                tower.drawTower();
            });

            return;
        }

        enemies = enemies.filter(enemy => !enemy.update(gameCtx, reduceHealth, addCoins)); // Remove dead enemies, !!Optimization needed, maybe a web worker per enemy?!!
        updateHoverTiles()

        activeTowers.forEach(tower => { // tower
            tower.update(enemies);
        });
        updateCoins()

        // Check if player health is 0
        if (playerHealth <= 0) {
            document.querySelector('#GameOver').style.display = 'flex';
            console.log('%cGAME OVER!', 'color: red; font-size: 20px;');
            cancelAnimationFrame(animationID); // fix animationID not defined
        }
        // Update FPS counter
        fpsCounterUpdate(1000 / elapsed);
    }
    
    // Request next frame
    const animationID = requestAnimationFrame(() => gameLoop(enemies));
}


/**
 * Updates the FPS counter on the game screen.
 *
 * @param {number} fps - The current FPS of the game.
 * @returns {void}
 * @author Philip
 */
function fpsCounterUpdate(fps){
    frameCount++;
    fpsAccumulator += fps;

    if (frameCount % 60 === 0) { // Update every 60 frames
        const averageFPS = fpsAccumulator / 60;
        document.querySelector('#fpsCounter').innerHTML = 'Average<br>FPS: ' + averageFPS.toFixed(2);
        fpsAccumulator = 0;
    }
}

/*
--- event listeners ---
 */

/**
 * Event listener for the fullscreen button.
 * @author Philip
 */
addEventListener("click", function() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
});

