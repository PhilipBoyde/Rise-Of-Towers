import {calculateWave} from "../model/WaveCalculator.js";
import {gameIsRunning, updateHoverTiles} from "./placementTiles.js";
import {gameStatus} from "./SettingsController.js";
//import {} from "../controller/SpriteTowerController.js";
//import {} from "../controller/SpriteController.js";
//import { MapController } from './mapController.js';
import {SaveController} from "./SaveController.js";


/**
 *  -TODO-
 *  - balance the game
 *  - add more bosses
 *  - add enemy death animations
 *  - flush out the tower targeting system
 */

/*
--- variables ---
 */


const  /** HTMLCanvasElement */ gameCanvas = document.querySelector('#GameScreen');
const gameBackground = document.querySelector('#GameBackground');
const /** HTMLCanvasElement */ interactiveCanvas = document.querySelector('#GameUI');
const /** HTMLCanvasElement */ gameHover = document.querySelector('#GameHover');
const reloadPage = document.querySelector('restartButton')
const /** number */ activeMapNbr = 1;  
let /** number */ round = 0;
let img = new Image();
let /** @type number */ activeWave = 1;
let /** @type number */ playerHealth = 20;
let /** @type number */ coins = 700;
updateCoins();

let /** @type array */ activeTowers = [];
let /** @type boolean */ showFPS = false;
let /** @type array */ enemies = [];
let /** @type number */ lastTime = 0;
let /** @type number */ currentTime;
let /** @type number */ elapsed;
let /** @type number */ frameCount = 0;
let /** @type number */ fpsAccumulator = 0;
let /** @type boolean */ gameActive = false;
let /** @type number */ enemyAnimationID = undefined;

let /** @type HTMLCanvasElement */ enemyCanvas;
let /** @type HTMLCanvasElement */ gameHoverCanvas;
let /** @type CanvasRenderingContext2D */ enemyCtx;
let /** @type CanvasRenderingContext2D */ gameHoverCtx;
const saveCon = new SaveController();

const /** @type HTMLElement */fpsCounterElement = document.querySelector('#fpsCounter');

/** @type HTMLElement */ document.getElementById("GameWaveButton").addEventListener("click", nexWave);
document.getElementById('restartButton').addEventListener('click', restart)

function restart(){
    window.location.reload();
}

// let selectedTower = null;

/*
--- dependencies ---
 */
export function setGameControllerDependencies(newEnemyCanvas, newEnemyCtx, newGameHoverCanvas, newGameHoverCtx){
    enemyCanvas = newEnemyCanvas;
    enemyCtx = newEnemyCtx;
    gameHoverCanvas = newGameHoverCanvas;
    gameHoverCtx = newGameHoverCtx;
}

export function setActiveTowers(towers){
    activeTowers = towers;
}

export function stopGame(){
    cancelAnimationFrame(enemyAnimationID);
}

export function startGame(){
    gameLoop(enemies);
}

export function setFpsStatus(status){
    showFPS = status;

    if (showFPS){
        fpsCounterElement.style.display = 'block';
    }else{
        fpsCounterElement.style.display = 'none';
    }
}

/**
 * Loads the next wave of enemies.
 * Disables the "GameWaveButton" button while the wave is running.
 * @author Philip
 */
function nexWave(){
    disableGameWaveButton()
    gameActive = true;

    enemies = calculateWave(activeWave);
    //const enemies = testEnemyType(); // Temporary test function
    gameStatus(true)
    gameIsRunning(true);
    startGame();
}

/**
 * Disables the "GameWaveButton" button by changing its style and setting its disabled property to true.
 *
 * @author Philip
 */
export function disableGameWaveButton(){
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
export function enableGameWaveButton(){
    let button = document.getElementById("GameWaveButton");
    button.style.backgroundColor = '';
    button.style.filter = 'none';
    document.getElementById("GameWaveButton").disabled = false;
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

/**
 * Adds coins to the player based on the amount of coins the player gets when called.
 * @param amount - The amount of coins the received has.
 * @author Philip
 */
export function addCoins(amount){
    coins += amount;
    updateCoins();
}

export function removeCoins(amount){
    coins -= amount;
    updateCoins();
}

/**
 * Updates the coin counter on the game screen. based on the amount of coins the player has.
 * @author Philip
 */
function updateCoins(){
    const CoinsCounter = document.querySelector('#CoinsCounter');
    CoinsCounter.textContent = coins;
    //setCoinsToTowerGameLoop(coins);
}

export function getCoins(){
    return coins;
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
        enemyCtx.clearRect(0, 0, enemyCanvas.width, enemyCanvas.height);

        // Check if all enemies are dead
        if (enemies.length === 0) {
            console.log('%cWave ' + activeWave + ' Completed!', 'color: green; font-size: 20px;');
            enableGameWaveButton();
            activeWave++;
            updateWaveCounter(activeWave);

            gameStatus(false)
            gameIsRunning(false)

            /*
            activeTowers.forEach(tower => { // tower
                tower.drawTower();
            });
             */

            addCoins(100)
            return;
        }

        enemies = enemies.filter(enemy => !enemy.update(enemyCtx, reduceHealth, addCoins)); // Remove dead enemies, !!Optimization needed, maybe a web worker per enemy?!!
        updateHoverTiles()

        activeTowers.forEach(tower => { // tower shooting
            tower.update(enemies);
        });
        updateCoins()

        // Check if player health is 0
        if (playerHealth <= 0) {
            document.querySelector('#GameOver').style.display = 'flex';
            console.log('%cGAME OVER!', 'color: red; font-size: 20px;');
            cancelAnimationFrame(enemyAnimationID); // fix enemyAnimationID not defined
        }

        // Update FPS counter
        if (showFPS){
            fpsCounterUpdate(1000 / elapsed);
        }
    }

    // Request next frame
    enemyAnimationID = requestAnimationFrame(() => gameLoop(enemies));
}

/**
 * @author Emil
 */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveScoreButton').addEventListener('click', saveHighScorec);
});

/**
 * @author Philip
 * @author Emil
 */
export function saveHighScorec() {

    if(!saveCon){
        console.error('SaveController not initialized');
        return;
    }

    let playerScore = getCoins() * activeWave ;
    let playerName = document.getElementById('playerName').value;

    if (playerName.trim().length === 0) {
        alert("Please enter a name and score to save highscore");
    } else {
        saveCon.addHighscore(playerName.trim(), playerScore);
    }
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
        fpsCounterElement.innerHTML = 'Average<br>FPS: ' + averageFPS.toFixed(2);
        fpsAccumulator = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const towerButtons = document.querySelectorAll('.towerButton');
    const tooltip = document.getElementById('tooltip');

    towerButtons.forEach(button => {
        button.addEventListener('mouseenter', (event) => {
            const damage = button.getAttribute('data-damage');
            const range = button.getAttribute('data-range');
            const description = button.getAttribute('data-description');
            tooltip.innerHTML = `Damage: ${damage}<br>Range: ${range}<br>${description}`;
            tooltip.style.display = 'block';
            const rect = button.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.pageXOffset}px`;
            tooltip.style.top = `${rect.top + window.pageYOffset - tooltip.offsetHeight}px`;
        });

        button.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });

        button.addEventListener('mousemove', (event) => {
            tooltip.style.left = `${event.pageX}px`;
            tooltip.style.top = `${event.pageY - tooltip.offsetHeight - 10}px`;
        });
    });
});

/**
 * Function to show an error popup when player tries to buy or upgrade a tower
 * without having enough coins.
 * @author Muhamed
 */
export function showErrorPopup() {
    const errorPopup = document.getElementById('errorPopup');
    errorPopup.style.display = 'block';
    errorPopup.style.opacity = '1';

    setTimeout(() => {
        errorPopup.style.opacity = '0';
        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 300); // Match this duration with the transition duration in CSS
    }, 2000); // Display the message for 2 seconds
}