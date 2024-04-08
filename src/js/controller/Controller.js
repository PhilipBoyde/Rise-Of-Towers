import {Startmap1 } from './mapControllers/map1Controller.js';

const  /** HTMLCanvasElement */ gameCanvas = document.querySelector('.GameScreen');
const /** HTMLCanvasElement */ interactiveCanvas = document.querySelector('.GameUI');
const /** number */ activeMapNbr = 1;    // Change this to the map you want to load
let /** number */ round = 0;
let /** object */ activeMap;
let playerHealth = 20;

document.getElementById("GameWaveButton").addEventListener("click", nexWave);
const /** CanvasRenderingContext2D */ gameCtx = gameCanvas.getContext('2d');


/**
 * Sets up canvas dimensions and styling if both gameCanvas and interactiveCanvas exist.
 * Otherwise, alerts the user.
 *
 * @param {Canvas} gameCanvas - The canvas element for the game screen.
 * @param {Canvas} interactiveCanvas - The canvas element for the game UI.
 * @author Philip
 */
if (gameCanvas && interactiveCanvas){
    gameCanvas.width = 1120;
    gameCanvas.height = 960;

    interactiveCanvas.width = 200;
    interactiveCanvas.height = 768;

    const interactiveCtx = interactiveCanvas.getContext('2d');
    interactiveCtx.fillStyle = '#574629';
    interactiveCtx.fillRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);
}else {
    alert('Canvas not found!, Pleas try again later');
}


let img = new Image();
changeMap()
img.onload = () => {
    gameCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);
}

/**
 * Changes the map based on the activeMap variable.
 *
 * @param {number} activeMapNbr - The number of the active map to be loaded.
 * @author Philip
 */
function changeMap(){
    switch (activeMapNbr) { // Load the map based on the activeMap variable
        case 1:
            img.src = '../assets/gamemap/Map1.png';
            activeMap = new Startmap1();
            break;

        case 2:
            img.src = '../assets/gamemap/Map2.png';
            break;

        case 3:
            img.src = '../assets/gamemap/Map3.png';
            break;

        default:
            console.log('Map not found!');
            break;
    }
}

/**
 * Loads the next wave of enemies.
 *
 * @param {number} round - The current round of the game.
 * @author Philip
 */
function nexWave(){
    disableButton()
    const enemies = activeMap.nexWave(round);

    animate(enemies);
}


/**
 * Disables the "GameWaveButton" button by changing its style and setting its disabled property to true.
 *
 * @param {Button} button - The button element to be disabled.
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
 * @param {Button} button - The button element to be enabled.
 * @author Philip
 */
function enableButton(){
    let button = document.getElementById("GameWaveButton");
    button.style.backgroundColor = '';
    button.style.filter = 'none';
    document.getElementById("GameWaveButton").disabled = false;

}

function reduceHealth(){
    playerHealth--;
    console.log('%cPlayer health left: ' + playerHealth, 'color: red; font-size: 15px;');
    updateHealthCounter(playerHealth);
}

/**
 * Updates the health with the new health in the game
 * @param newHealth -New number for the health
 * @author Mahyar
 */
function updateHealthCounter (newHealth) {
    const healthCounter = document.querySelector('.healthCounter');

    healthCounter.textContent = newHealth;
}

/**
 * Animates the enemies on the game screen.
 *
 * @param enemies
 * @author Philip,
 */
let lastTime = 0;
const fpsInterval = 1000 / 60; // Assuming 60 FPS
let lastFpsUpdateTime = 0;
let currentTime;
let elapsed;

function animate(enemies) {
    currentTime = performance.now();
    elapsed = currentTime - lastTime;

    if (elapsed > fpsInterval) { //Limit the frame rate to about 60 FPS
        lastTime = currentTime - (elapsed % fpsInterval);

        // Check if all enemies are dead
        if (enemies.length === 0) {
            console.log('%cWave ' + round + ' Completed!', 'color: green; font-size: 20px;');
            enableButton();
            round++;
            return;
        }

        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height); // !!Try to optimize this, unnecessary to redraw each frame!!

        enemies = enemies.filter(enemy => !enemy.update(gameCtx, reduceHealth));

        // Check if player health is 0
        if (playerHealth <= 0) {
            document.querySelector('.GameOver').style.display = 'flex';
            console.log('%cGAME OVER!', 'color: red; font-size: 20px;');
            cancelAnimationFrame(animationID);
        }


    }

    // Update FPS counter
    fpsCounterUpdate(1000 / elapsed);

    // Request next frame
    const animationID = requestAnimationFrame(() => animate(enemies));
}

let frameCount = 0;
let fpsAccumulator = 0;
function fpsCounterUpdate(fps){
    frameCount++;
    fpsAccumulator += fps;

    if (frameCount % 60 === 0) { // Update every 60 frames
        const averageFPS = fpsAccumulator / 60;
        document.querySelector('.fpsCounter').innerHTML = 'Average<br>FPS: ' + averageFPS.toFixed(2);
        fpsAccumulator = 0;
    }
}
