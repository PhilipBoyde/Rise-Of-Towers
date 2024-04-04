import {Startmap1 } from './mapControllers/map1Controller.js';

const  /** HTMLCanvasElement */ gameCanvas = document.querySelector('.GameScreen');
const /** HTMLCanvasElement */ interactiveCanvas = document.querySelector('.GameUI');
const /** number */ activeMapNbr = 1;    // Change this to the map you want to load
let /** number */ round = 0;
let /** object */ activeMap;

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
    interactiveCtx.fillStyle = '#A1662F';
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



/**
 * Animates the enemies on the game screen.
 *
 * @param enemies
 * @author Philip,
 */
function animate(enemies) {

        if (enemies.length === 0) {
            console.log('%cWave ' + round + ' Completed!', 'color: green; font-size: 20px;');
            enableButton()
            round++;
            return;
        }
        
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);
        
        console.log("Enemies", enemies);

        enemies = enemies.filter(enemy => !enemy.update(gameCtx));




        requestAnimationFrame(() => animate(enemies));
    }


