
/**
 * The MapController class is responsible for handling the game's map.
 * It can change the map displayed on the canvas based on the given map ID.
 *
 * @class MapController
 * @author Muhamed
 */
export class MapController {

    /**
     * Constructor for the MapController class.
     * Initializes the canvas, context, and available map images.
     *
     * @param {HTMLCanvasElement} gameCanvas - The canvas element for the game.
     * @param {CanvasRenderingContext2D} backgroundCtx - The context of the canvas.
     * @author Muhamed
     */
    constructor(gameCanvas, backgroundCtx) {
        this.gameCanvas = gameCanvas;
        this.backgroundCtx = backgroundCtx;
        this.currentMap = null;
        this.mapImages = {
            'Map1': '../assets/gameMap/Map1.png',
            'Map2': '../assets/gameMap/Map2.png',
            'Map3': '../assets/gameMap/Map3.png'
        };
    }

    /**
     * Changes the map displayed on the canvas based on the given map ID.
     *
     * @param {string} mapId - The ID of the map to be displayed.
     * @author Muhamed
     */
    changeMap(mapId) {
        const imageUrl = this.mapImages[mapId];
        if (!imageUrl) {
            console.error('Map not found!');
            return;
        }

        this.currentMap = mapId;
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            this.backgroundCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
            this.backgroundCtx.drawImage(image, 0, 0, this.gameCanvas.width, this.gameCanvas.height);
        };
        image.onerror = () => {
            console.error('Failed to load the map image.');
        };
    }
}
