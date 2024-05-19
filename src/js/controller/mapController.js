import {changeMapRoutes} from "../model/WaveCalculator.js";
import {changeTowerArea} from "./placementTiles.js";

/** @type {HTMLCanvasElement} */
let /** HTMLImageElement */ img = new Image();

/*
--- variables ---
 */
let gameCanvas = null;
let gameBackgroundCtx = null;


/*
--- dependencies ---
 */
export function setMapControllerDependencies(Canvas, BackgroundCtx) {
    gameCanvas = Canvas;
    gameBackgroundCtx = BackgroundCtx;
}

/**
 * Class that handles the map selection. Changes the map based on the selected mapId.
 * @param mapId - The ID of the selected map gotten from the query parameter.
 * @author Philip
 */
export class mapSelection {
    constructor(mapId) {
        this.selectedMap = mapId;
        this.changeMap();
    }

    changeMap(){
        switch (this.selectedMap) { // Load the map based on the activeMap variable
            case "1":
                img.src = '../js/model/assets/gameMap/Map1.png';
                break;

            case "2":
                img.src = '../js/model/assets/gameMap/Map2.png';
                break;

            case "3":
                img.src = '../js/model/assets/gameMap/Map3.png';
                break;

            default:
                console.log('Map not found!');
                break;
        }

        changeMapRoutes(this.selectedMap);
        changeTowerArea(this.selectedMap);

        img.onload = () => {
            gameBackgroundCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);
        }
    }

}

/**
 * Get the query parameter value by name.
 * @param name - The name of the query parameter.
 * @returns {string} - The value of the query parameter.
 * @author Philip
 */
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


/*
--- Event listeners ---
 */

/**
 * Event listener for DOMContentLoaded. Instantiates the mapSelection class with the selected map.
 * @param event - The DOMContentLoaded event.
 * @author Philip
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const map = getQueryParameter('map');
    new mapSelection(map);
});