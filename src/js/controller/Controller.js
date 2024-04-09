import {calculateWave, changeMapRoutes, testEnemyType} from "../model/WaveCalculator.js";
const  /** HTMLCanvasElement */ gameCanvas = document.querySelector('#GameScreen');
const gameBackground = document.querySelector('#GameBackground');
const /** HTMLCanvasElement */ interactiveCanvas = document.querySelector('#GameUI');
const /** number */ activeMapNbr = 1;  
let /** number */ round = 0;
let playerHealth = 20;

document.getElementById("GameWaveButton").addEventListener("click", nexWave);
const /** CanvasRenderingContext2D */ gameCtx = gameCanvas.getContext('2d');
const gameBackgroundCtx = gameBackground.getContext('2d');

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
    gameBackground.width = gameCanvas.width;
    gameBackground.height = gameCanvas.height;
    
    interactiveCanvas.width = 200;
    interactiveCanvas.height = 966;

    const interactiveCtx = interactiveCanvas.getContext('2d');
    interactiveCtx.fillStyle = '#574629';
    interactiveCtx.fillRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);
}else {
    alert('Canvas not found!, Pleas try again later');
}


let img = new Image();
changeMap()

/**
 * Changes the map based on the activeMap variable.
 *
 * @param {number} activeMapNbr - The number of the active map to be loaded.
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

/**
 * Loads the next wave of enemies.
 *
 * @param {number} round - The current round of the game.
 * @author Philip
 */
function nexWave(){
    disableButton()
    
    //const enemies = calculateWave(round);
    const enemies = testEnemyType(); // Temporary test function
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
            console.log('Health not found!');
            break;
    }
}

function updateScoreCounter(newScore){
    const scoreCounter = document.querySelector('#scoreCounter');
    scoreCounter.textContent = newScore;
}

function updateWaveCounter(round){
    const waveCounter = document.querySelector('#WaveCounter');
    waveCounter.textContent = 'Wave ' + round;
}

let lastTime = 0;
let lastFpsUpdateTime = 0;
let currentTime;
let elapsed;

/**
 * Animates the enemies on the game screen. 
 * Also checks if all enemies are dead or if the player health is 0.
 *
 * @param enemies
 * @author Philip,
 */
function animate(enemies) {
    currentTime = performance.now();
    elapsed = currentTime - lastTime;

    if (elapsed > 1000 / 60) { //Limit the frame rate to about 60 FPS
        lastTime = currentTime - (elapsed % (1000 / 60));

        // Check if all enemies are dead
        if (enemies.length === 0) {
            console.log('%cWave ' + round + ' Completed!', 'color: green; font-size: 20px;');
            enableButton();
            round++;
            updateWaveCounter(round);
            return;
        }

        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        enemies = enemies.filter(enemy => !enemy.update(gameCtx, reduceHealth));

        // Check if player health is 0
        if (playerHealth <= 0) {
            document.querySelector('#GameOver').style.display = 'flex';
            console.log('%cGAME OVER!', 'color: red; font-size: 20px;');
            cancelAnimationFrame(animationID);
        }


        // Update FPS counter
        fpsCounterUpdate(1000 / elapsed);
    }
    
    // Request next frame
    const animationID = requestAnimationFrame(() => animate(enemies));
}

let frameCount = 0;
let fpsAccumulator = 0;

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
