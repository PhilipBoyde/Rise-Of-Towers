/** @type HTMLElement */
import {disableGameWaveButton, enableGameWaveButton, setFpsStatus, startGame, stopGame} from "./Controller.js";
import {
    allButtonStatus,
    changeTowerAreaStatus,
    selectTile,
    setSettingsStatusForTower
} from "./TowerGameLoopController.js";

document.getElementById("closeSettings").addEventListener("click", closeSettings);
/** @type HTMLElement */ document.getElementById("settingsButton").addEventListener("click", openSettings);

let inSettings = false;
const checkboxFPS = document.querySelector('.checkbox1');
const checkboxTowerRadius = document.querySelector('.checkbox2');
const settingsElement = document.querySelector('.settingsScreen');
let showFPS = false;
let showTowerRadius = false;
let gameActive = false;

export function gameStatus(status){
    gameActive = status;
}

/**
 * Opens the settings screen and pauses the game.
 * If the game is active, the game loop will be paused.
 * If the game is not active, the buttons will be disabled.
 * @author Philip
 */
function openSettings(){
    setSettingsStatusForTower(true);

    if (!inSettings){
        inSettings = true;
        stopGame();
        allButtonStatus(true);

        disableGameWaveButton();

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
        startGame();
    }else {
        enableGameWaveButton()
    }

    setSettingsStatusForTower(false);
    selectTile();
}

/*
--- Event listeners ---
 */

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
        setFpsStatus(true);
    }else {
        setFpsStatus(false);
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

    changeTowerAreaStatus(showTowerRadius);
});