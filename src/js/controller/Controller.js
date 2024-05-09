import {calculateWave, changeMapRoutes, testEnemyType} from "../model/WaveCalculator.js";
import {gameIsRunning, setGameInfo, updateHoverTiles} from "./placementTiles.js";
import {ArcherTower, InfernoTower, WizardTower, IceTower, StoneTower} from "../model/towerTypes.js";


/**
 *  -TODO-
 *  - Add a way to upgrade towers
 *  - Add a way to change the map
 *  - add functionality to the sell button
 *  - balance the game
 *  - add more bosses
 *  - add enemy death animations
 *  - flush out the tower targeting system
 */

/**
 * -BUGS-
 * If you sell a tower to fast it does not find the tower
 */

/*
--- variables ---
 */

const  /** HTMLCanvasElement */ gameCanvas = document.querySelector('#GameScreen');
const gameBackground = document.querySelector('#GameBackground');
const /** HTMLCanvasElement */ interactiveCanvas = document.querySelector('#GameUI');
const /** HTMLCanvasElement */ towerCanvas = document.querySelector('#TowerScreen');
const /** HTMLCanvasElement */ gameHover = document.querySelector('#GameHover');
const towerCtx = towerCanvas.getContext('2d');
const /** number */ activeMapNbr = 1;  
let /** number */ round = 0;
let playerHealth = 20;
let coins = 1350;
let activeTowers = [];
let img = new Image();

let showFPS = false;
let showTowerRadius = false;

let enemies;
let inSettings = false;
let lastTime = 0;
let currentTime;
let elapsed;
let frameCount = 0;
let fpsAccumulator = 0;

let gameActive = false;
let animationID;
let activeTiles;
let activeTileID;
let allPlacedTowers = [];
// let selectedTower = null;

const fpsCounterElement = document.querySelector('#fpsCounter');

document.getElementById("closeSettings").addEventListener("click", closeSettings);
document.getElementById("settingsButton").addEventListener("click", openSettings);
const checkboxFPS = document.querySelector('.checkbox1');
const checkboxTowerRadius = document.querySelector('.checkbox2');


const /** CanvasRenderingContext2D */ gameCtx = gameCanvas.getContext('2d');
document.getElementById("GameWaveButton").addEventListener("click", nexWave);
document.getElementById("tower1").addEventListener("click", () => selectTower(1));
document.getElementById("tower2").addEventListener("click", () => selectTower(2));
document.getElementById("tower3").addEventListener("click", () => selectTower(3));
document.getElementById("tower4").addEventListener("click", () => selectTower(4));
const settingsElement = document.querySelector('.settingsScreen');


document.getElementById("sellButton").addEventListener("click", sellTower);
let sellButton = document.querySelector('#sellButton');

let tower1Button = document.querySelector('#tower1');
let tower2Button = document.querySelector('#tower2');
let tower3Button = document.querySelector('#tower3');
let tower4Button = document.querySelector('#tower4');



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
if (gameCanvas && interactiveCanvas && towerCanvas && gameHover){
    const canvasWidth = 1120;
    const canvasHeight = 960;

    gameCanvas.width = canvasWidth;
    gameCanvas.height = canvasHeight;

    gameBackground.width = canvasWidth;
    gameBackground.height = canvasHeight;

    gameHover.width = canvasWidth;
    gameHover.height = canvasHeight;

    towerCanvas.width = canvasWidth;
    towerCanvas.height = canvasHeight;

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
    console.log(tile)

    if(allPlacedTowers.length >= 0 && !inSettings){

        if (tile === undefined){ //no valid tile found

            tower1Button.disabled = true;
            tower2Button.disabled = true;
            tower3Button.disabled = true;
            tower4Button.disabled = true;

            sellButton.disabled = true;
            sellButton.style.backgroundColor = 'gray';
            sellButton.style.filter = 'blur(1px)';

        } else { //found a valid tile

            if (allPlacedTowers.includes(tile.positionID)){ // has a tower on it
                tilesHasTower()

            } else { // has no tower on it
                tileValidButHasNoTower()
            }

            activeTiles = tile;
            activeTileID = activeTiles.positionID; // the id of the tile that was clicked
        }
    }
}

/**
 *
 */
function tileValidButHasNoTower(){
    tower1Button.disabled = false;
    tower2Button.disabled = false;
    tower3Button.disabled = false;
    tower4Button.disabled = false;

    sellButton.style.backgroundColor = 'gray';
    sellButton.style.filter = 'blur(1px)';
    sellButton.disabled = true;
}

/**
 *
 */
function tilesHasTower(){
    sellButton.disabled = false;
    sellButton.style.backgroundColor = '';
    sellButton.style.filter = 'blur(0px)';

    tower1Button.disabled = true;
    tower2Button.disabled = true;
    tower3Button.disabled = true;
    tower4Button.disabled = true;
}

/**
 * Gives the player the option to sell the tower that is placed on the selected tile.
 * @author Philip
 */
function sellTower(){

    activeTowers.forEach((tower) => {

        const towerID = tower.getPositionID()
        if(towerID === activeTileID){

            allPlacedTowers.splice(allPlacedTowers.indexOf(towerID), 1);
            activeTowers.splice(activeTowers.indexOf(tower), 1);
            coins += (tower.getTowerValue() * 0.8); // 80% of the tower value
            updateCoins();
            tileValidButHasNoTower()
        }

    });

    /*
    allPlacedTowers.forEach((tower) => {

        if (tower === activeTileID) {
            allPlacedTowers.splice(allPlacedTowers.indexOf(tower), 1);
            activeTowers.splice(activeTowers.includes(activeTileID), 1);
            coins += 50;
            updateCoins()
            selectTile(undefined);
        }

    });

     */
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
        case 1: // Ice Tower
            if (coins >= 700){
                activeTowers.push(new IceTower(towerCtx, activeTiles, showTowerRadius));
                allPlacedTowers.push(activeTileID);
                coins -=700;

            }
            break;

        case 2: // WizardTower
            if(coins >= 200){
                activeTowers.push(new WizardTower(towerCtx, activeTiles, showTowerRadius));
                allPlacedTowers.push(activeTileID);
                coins -= 200;
            }
            break;

        case 3: // InfernoTower
            if(coins >= 700){
                activeTowers.push(new InfernoTower(towerCtx, activeTiles, showTowerRadius));
                allPlacedTowers.push(activeTileID);
                coins -= 700;
            }
            break;

        case 4: // StoneTower
            if(coins >= 300){
                activeTowers.push(new StoneTower(towerCtx, activeTiles, showTowerRadius));
                allPlacedTowers.push(activeTileID);
                coins -= 300;
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
    tilesHasTower()
}


/**
 * Loads the next wave of enemies.
 * Disables the "GameWaveButton" button while the wave is running.
 * @author Philip
 */
function nexWave(){
    disableButton()
    gameActive = true;

    enemies = calculateWave(round);
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

/**
 * Adds coins to the player based on the amount of coins the player gets when called.
 * @param amount - The amount of coins the received has.
 * @author Philip
 */
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
 * The main tower loop. Updates the tower state and draws the towers.
 * @author Philip
 */
towerLoop();
function towerLoop(){
    towerCtx.clearRect(0, 0, towerCanvas.width, towerCanvas.height);
    activeTowers.forEach(tower => { // drawTower
        tower.drawTower();
    });
    requestAnimationFrame(towerLoop);
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

            addCoins(100)

            return;
        }

        enemies = enemies.filter(enemy => !enemy.update(gameCtx, reduceHealth, addCoins)); // Remove dead enemies, !!Optimization needed, maybe a web worker per enemy?!!
        updateHoverTiles()

        activeTowers.forEach(tower => { // tower shooting
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
        if (showFPS){
            fpsCounterUpdate(1000 / elapsed);
        }
    }

    // Request next frame
    animationID = requestAnimationFrame(() => gameLoop(enemies));
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

/**
 * Opens the settings screen and pauses the game.
 * If the game is active, the game loop will be paused.
 * If the game is not active, the buttons will be disabled.
 * @author Philip
 */
function openSettings(){

    if (!inSettings){
        inSettings = true;
        cancelAnimationFrame(animationID)

        tower1Button.disabled = true;
        tower2Button.disabled = true;
        tower3Button.disabled = true;
        tower4Button.disabled = true;

        disableButton();

        settingsElement.style.display = 'flex';
    }else {
        closeSettings();
    }
}

/**
 * Closes the settings screen and resumes the game.
 * If the game is not active, the buttons will be enabled.
 * If the game is active, the game loop will be resumed.
 * @author Philip
 */
function closeSettings(){
    settingsElement.classList.add('flyOut');

    if(gameActive){
        requestAnimationFrame(() => gameLoop(enemies));
    }else {
        enableButton();
    }

    selectTile();
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


/**
 * animation for settings element tels the element to hide when the animation is done.
 * @param e - The animation event of the settings element.
 * @author Philip
 */
settingsElement.addEventListener('animationend', (e ) => {
    if (e.animationName === 'flyOut'){
        settingsElement.style.display = 'none';
        settingsElement.classList.remove('flyOut');
        inSettings = false;
    }
});


/**
 * Event listener for the FPS checkbox. Shows the FPS counter if the checkbox is checked. Hides the FPS counter if the checkbox is unchecked.
 * @param {Event} change - The change event of the FPS checkbox.
 * @author Philip
 */
checkboxFPS.addEventListener('change', function () {
    if (this.checked){
        showFPS = true;
        fpsCounterElement.style.display = 'block';
    }else {
        showFPS = false;
        fpsCounterElement.style.display = 'none';
    }
});

/**
 * Event listener for the tower radius checkbox. Shows the tower radius if the checkbox is checked. Hides the tower radius if the checkbox is unchecked.
 * @param {Event} change - The change event of the tower radius checkbox.
 * @author Philip
 */
checkboxTowerRadius.addEventListener('change', function () {
    if (this.checked){
        showTowerRadius = true;
    }else {
        showTowerRadius = false;
    }

    activeTowers.forEach(tower => {
        tower.setStatusOfTowerRange(showTowerRadius);
    });
});