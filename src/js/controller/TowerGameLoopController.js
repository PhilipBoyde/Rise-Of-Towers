import { InfernoTower, WizardTower, IceTower, StoneTower } from "../model/towerTypes.js";
import { addCoins, getCoins, removeCoins, setActiveTowers, showErrorPopup } from "./Controller.js";

document.getElementById("tower1").addEventListener("click", () => selectTower(1));
document.getElementById("tower2").addEventListener("click", () => selectTower(2));
document.getElementById("tower3").addEventListener("click", () => selectTower(3));
document.getElementById("tower4").addEventListener("click", () => selectTower(4));
document.getElementById("sellButton").addEventListener("click", sellTower);
document.getElementById("upgradeButton").addEventListener("click", upgradeTower);

let tower1Button = document.querySelector('#tower1');
let tower2Button = document.querySelector('#tower2');
let tower3Button = document.querySelector('#tower3');
let tower4Button = document.querySelector('#tower4');
let sellButton = document.querySelector('#sellButton');
const towerStatsElement = document.querySelector('.towerInfo');

let coins = undefined;
let towerCanvas = null;
let towerCtx = null;
let activeTowers = [];
let inSettings = false;
let activeTiles;
let activeTileID;
let allPlacedTowers = [];
let activeTower = undefined;
let /** @type boolean */ showTowerRadius = false;


/**
 * Sets the dependencies required for the tower game loop.
 * @param {HTMLCanvasElement} newTowerCanvas - The canvas element for tower drawing.
 * @param {CanvasRenderingContext2D} newTowerCtx - The context of the canvas for tower drawing.
 * @author Philip
 */
export function setTowerGameLoopDependencies(newTowerCanvas, newTowerCtx) {
    towerCanvas = newTowerCanvas;
    towerCtx = newTowerCtx;

    towerLoop();
}

/**
 * Sets the status of the settings for the tower.
 * @param {boolean} status - The status of the settings.
 * @author Philip
 */
export function setSettingsStatusForTower(status) {
    inSettings = status;
}

/**
 * Main loop for tower operations, including drawing the towers.
 * @author Philip
 */
function towerLoop() {
    towerCtx.clearRect(0, 0, towerCanvas.width, towerCanvas.height);
    activeTowers.forEach(tower => { // drawTower
        tower.drawTower();
    });
    requestAnimationFrame(towerLoop);
}

/**
 * Selects the tile that the player clicked on.
 * If the tile is already occupied by a tower, the player can sell the tower.
 * Disables towers based on the kind of tile that was clicked.
 * @param tile
 * @author Philip
 */
export function selectTile(tile) {
    //console.log(tile);

    if (allPlacedTowers.length >= 0 && !inSettings) {

        if (tile === undefined) { // no valid tile found
            tower1Button.disabled = true;
            tower2Button.disabled = true;
            tower3Button.disabled = true;
            tower4Button.disabled = true;
            sellButton.disabled = true;
            towerStatsElement.style.display = 'none';
        } else { // found a valid tile
            if (allPlacedTowers.includes(tile.positionID)) { // has a tower on it
                tilesHasTower();
            } else { // has no tower on it
                tileValidButHasNoTower();
            }

            activeTiles = tile;
            activeTileID = activeTiles.positionID; // the id of the tile that was clicked
        }
    }
}

/**
 * Updates the status of the active tower, including its position and stats.
 * @author Philip
 */
function updateTowerStatus() {
    let tempX = undefined;
    let tempY = undefined;

    activeTowers.forEach((tower) => {
        const towerID = tower.getPositionID();

        if (towerID === activeTileID) {
            //console.log(tower.x + ", " + tower.y);
            activeTower = tower;

            // updates stats
            const name = document.querySelector('#towerInfoName');
            const tempName = tower.towerType + ' Tower';
            name.textContent = tempName;

            const stats = document.querySelector('#towerInfoStats');
            const tempStats = 'Level: ' + tower.level + '<br>' + 'Damage: ' + tower.damage + '<br>' + 'Speed: ' + tower.speed + '<br>' + '-----------' + '<br>' + 'Upgrade: ' + tower.upgradeCost;
            stats.innerHTML = tempStats;

            // Position
            towerStatsElement.style.display = 'block';

            tempX = tower.x + 94;
            tempY = tower.y - 20;

            tempX = tempX + "px";
            tempY = tempY + "px";

            towerStatsElement.style.top = tempY;
            towerStatsElement.style.left = tempX;
        }
    });
}

/**
 * Upgrades the currently selected tower if the player has enough coins.
 * @author Philip
 * @author Muhamed
 */
function upgradeTower() {
    coins = getCoins();
    if (coins >= activeTower.upgradeCost) {
        removeCoins(activeTower.upgradeCost);
        activeTower.upgradeTower();
    } else {
        showErrorPopup();
    }
}

/**
 * Enables tower buttons and disables the sell button when a valid tile with no tower is selected.
 * @author Philip
 */
function tileValidButHasNoTower() {
    tower1Button.disabled = false;
    tower2Button.disabled = false;
    tower3Button.disabled = false;
    tower4Button.disabled = false;
    sellButton.disabled = true;
    towerStatsElement.style.display = 'none';
}

/**
 * Enables the sell button and updates the tower status when a tile with a tower is selected.
 * @author Philip
 */
function tilesHasTower() {
    sellButton.disabled = false;

    tower1Button.disabled = true;
    tower2Button.disabled = true;
    tower3Button.disabled = true;
    tower4Button.disabled = true;

    setTimeout(() => { // timer needed to let variables keep up
        updateTowerStatus();
    }, 1);
}

/**
 * Gives the player the option to sell the tower that is placed on the selected tile.
 * @author Philip
 */
function sellTower() {
    activeTowers.forEach((tower) => {
        const towerID = tower.getPositionID();
        if (towerID === activeTileID) {
            allPlacedTowers.splice(allPlacedTowers.indexOf(towerID), 1);
            activeTowers.splice(activeTowers.indexOf(tower), 1);
            addCoins(tower.getTowerValue() * 0.8); // 80% of the tower value is returned to the player
            tileValidButHasNoTower();
        }
    });
}

/**
 * Based on the buttonID, the player can select a tower to place on the selected tile.
 * if the player has enough coins, the tower will be placed on the selected tile.
 * else the player will not be able to place the tower.
 * @param {number} buttonID - The ID of the button that was clicked to select the tower.
 * @author Philip
 * @author Emil
 * @author Muhamed
 */
function selectTower(buttonID) {
    coins = getCoins();
    //console.log(coins);

    switch (buttonID) {
        case 1: // Ice Tower
            if (coins >= 300) {
                activeTowers.push(new IceTower(towerCtx, activeTiles, showTowerRadius));
                allPlacedTowers.push(activeTileID);
                removeCoins(300);
                setActiveTowers(activeTowers);
            } else {
                showErrorPopup();
            }
            break;

        case 2: // WizardTower
            if (coins >= 200) {
                activeTowers.push(new WizardTower(towerCtx, activeTiles, showTowerRadius));
                allPlacedTowers.push(activeTileID);
                removeCoins(200);
                setActiveTowers(activeTowers);
            } else {
                showErrorPopup();
            }
            break;

        case 3: // InfernoTower
            if (coins >= 900) {
                activeTowers.push(new InfernoTower(towerCtx, activeTiles, showTowerRadius));
                allPlacedTowers.push(activeTileID);
                removeCoins(900);
                setActiveTowers(activeTowers);
            } else {
                showErrorPopup();
            }
            break;

        case 4: // StoneTower
            if (coins >= 700) {
                activeTowers.push(new StoneTower(towerCtx, activeTiles, showTowerRadius));
                allPlacedTowers.push(activeTileID);
                removeCoins(700);
                setActiveTowers(activeTowers);
            } else {
                showErrorPopup();
            }
            break;

        default:
            console.error('Tower not found!');
            break;
    }

    activeTowers.forEach(tower => { // tower
        tower.drawTower();
    });

    tilesHasTower();
}

/**
 * Changes the visibility status of the tower radius for all active towers.
 * @param {boolean} status - The new status of the tower radius visibility.
 * @author Philip
 */
export function changeTowerAreaStatus(status) {
    activeTowers.forEach(tower => {
        tower.setStatusOfTowerRange(status);
    });
}

/**
 * Enables or disables all tower and sell buttons, and hides the tower stats element.
 * @param {boolean} status - The new status for the buttons.
 * @author Philip
 */
export function allButtonStatus(status) {
    tower1Button.disabled = status;
    tower2Button.disabled = status;
    tower3Button.disabled = status;
    tower4Button.disabled = status;
    sellButton.disabled = status;

    towerStatsElement.style.display = 'none';
}
