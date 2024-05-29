import "./PreLoader.js";
import {setTowerGameLoopDependencies} from "./TowerGameLoopController.js";
import {setGameControllerDependencies} from "./Controller.js";
import {setMapControllerDependencies} from "./mapController.js";
import {setPlacementTilesDependencies} from "./placementTiles.js";
import {SaveController} from "./SaveController.js";
//import "./SettingsController.js";


/** @type {HTMLCanvasElement} */
const /** HTMLCanvasElement */ gameBackground = document.querySelector('#GameBackground');
const /** HTMLCanvasElement */ gameCanvas = document.querySelector('#GameScreen');
const /** HTMLCanvasElement */ towerCanvas = document.querySelector('#TowerScreen');
const /** HTMLCanvasElement */ interactiveCanvas = document.querySelector('#GameUI');
const /** HTMLCanvasElement */ gameHover = document.querySelector('#GameHover');

/** @type {CanvasRenderingContext2D} */
const /** CanvasRenderingContext2D */ enemyCtx = gameCanvas.getContext('2d');
const /** CanvasRenderingContext2D */ gameBackgroundCtx = gameBackground.getContext('2d');
const /** CanvasRenderingContext2D */ towerCtx = towerCanvas.getContext('2d');
const /** CanvasRenderingContext2D */ gameHoverCtx = gameHover.getContext('2d');


/*
--- variables ---
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

setMapControllerDependencies(gameBackground, gameBackgroundCtx); // for mapController.js
setPlacementTilesDependencies(gameHover, gameHoverCtx); // for placementTiles.js
setGameControllerDependencies(gameCanvas, enemyCtx, gameHover, interactiveCanvas); // for Controller.js
setTowerGameLoopDependencies(towerCanvas, towerCtx); // for TowerGameLoopController.js

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

}else {
    console.error('Canvas not found')
}


