import {map1TowerArea} from "../model/map1/Map1PlacebleArea.js";
import {map2TowerArea} from "../model/map2/Map2PlacebleArea.js";
import {map3TowerArea} from "../model/map3/Map3PlacebleArea.js";
import {selectTile} from "./TowerGameLoopController.js";

/*
--- variables ---
 */
let gameCanvas = undefined;
let lastHovered = undefined;
let gameStatus = false;
let gameHoverCtx =  undefined;
const placementTiles = []
const mouse = {
    x: 'undefined',
    y: 'undefined'
}
/*
--- end of variables ---
 */

/**
 * 2D array to hold the placement tiles data. Used to create the placement tiles. Right now only supports map1TowerArea.
 * @type {*[]}
 * @author Philip
 */

export function changeTowerArea(mapId){
    let towerArea = [];
    const placementTilesData2D = [];


    switch (mapId) {
        case "1":
            towerArea = map1TowerArea;
            break

        case "2":
            towerArea = map2TowerArea;
            break;

        case "3":
            towerArea = map3TowerArea;
            break;
    }

    for (let i = 0; i < towerArea.length; i+= 35) { // 35 is the width of the map
        placementTilesData2D.push(towerArea.slice(i, i + 35));
    }
    initializePlacement(placementTilesData2D);
}

/**
 * Array to hold the placement tiles. Used to create the placement tiles.
 * @type {*[]} - Array to hold the placement tiles.
 * @param placementTilesData2D - The 2D array that holds the placement tiles data.
 * @author Philip
 */
function initializePlacement(placementTilesData2D){

    placementTilesData2D.forEach(((row, yIndex) => {
        row.forEach((tile , xIndex) => {
            if (tile === 61){
                placementTiles.push(new PlaceableTile(
                    {position: {
                            x: xIndex * 32,
                            y: yIndex * 32,
                        }},
                    (yIndex * xIndex) //tile ID
                ));
            }
        })
    }));
}

/**
 * Boolean to check if the game is running or not.
 * @type {boolean}
 * @author Philip
 */
export function gameIsRunning(running){
    gameStatus = running;
}

/**
 * Sets the game canvas and the CanvasRenderingContext2D for hover effect of the game.
 * @param newGameCanvas - The canvas that is used for the game.
 * @param placementCtx - The CanvasRenderingContext2D that is used for the hover effect on the tiles.
 * @author Philip
 */

export function setPlacementTilesDependencies(newGameCanvas, placementCtx){
    gameCanvas = newGameCanvas;
    gameHoverCtx = placementCtx;
}


/**
 * Function to check if the mouse is hovering over a valid tile.
 * @returns {{tile2: *, tile3: *, tile4: *, positionID: *, tile1}}
 * @author Philip
 */
function isTile(){
    for (let i = 0; i < placementTiles.length; i++){
        const tile = placementTiles[i]

        if (mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size){

            return getTiles(tile, placementTiles)
        }
    }
}


/**
 * Function to get the tiles that are next to the tile that is clicked.
 * @param tile
 * @param allTiles
 * @returns {{tile2: *, tile3: *, tile4: *, positionID: *, tile1}}
 * @author Philip
 */
function getTiles(tile, allTiles) {
    const tileX = tile.position.x;
    const tileY = tile.position.y;
    const tileSize = tile.size;
    const neighbors = [];

    for (const otherTile of allTiles) {
        // Skip the same tile
        if (otherTile === tile) continue;

        // Check if otherTile is next to tile
        if (
            (otherTile.position.x === tileX + tileSize && otherTile.position.y === tileY) || // Right
            (otherTile.position.x === tileX - tileSize && otherTile.position.y === tileY) || // Left
            (otherTile.position.x === tileX && otherTile.position.y === tileY + tileSize) || // Bottom
            (otherTile.position.x === tileX && otherTile.position.y === tileY - tileSize) || // Top
            (otherTile.position.x === tileX + tileSize && otherTile.position.y === tileY + tileSize) || // Bottom-right
            (otherTile.position.x === tileX - tileSize && otherTile.position.y === tileY + tileSize) || // Bottom-left
            (otherTile.position.x === tileX + tileSize && otherTile.position.y === tileY - tileSize) || // Top-right
            (otherTile.position.x === tileX - tileSize && otherTile.position.y === tileY - tileSize) // Top-left
        ) {
            neighbors.push(otherTile);
        }
    }

    return {
        tile1: tile,
        tile2: neighbors[0],
        tile3: neighbors[1],
        tile4: neighbors[2],
        positionID: tile.position.x + tile.position.y + neighbors[0].position.x + neighbors[0].position.y + neighbors[1].position.x + neighbors[1].position.y + neighbors[2].position.x + neighbors[2].position.y,
    }
}


/**
 * Function to update the hover effect on the tiles. When clicked on a tile, the tile will be highlighted.
 * @param hoveredTiles - The tiles that are clicked on.
 * @author Philip
 */
export function updateHoverTiles(hoveredTiles){

    if (hoveredTiles !== undefined){
        if(lastHovered !== undefined){
            if(lastHovered.tile1.tileID !== hoveredTiles.tile1.tileID && lastHovered.tile1.tileID !== hoveredTiles.tile2.tileID &&
                lastHovered.tile1.tileID !== hoveredTiles.tile3.tileID && lastHovered.tile1.tileID !== hoveredTiles.tile4.tileID){
                updateTilesState(hoveredTiles)

            }else {
                updateTilesState(hoveredTiles)
            }
        }else {
            updateTilesState(hoveredTiles)
        }
    }
}


/**
 * Function to deselect the tiles that are highlighted. Used every time the mouse is clicked on tiles.
 * @author Philip
 */
    function deselect() {
        if (lastHovered !== undefined){
            gameHoverCtx.clearRect(lastHovered.tile1.position.x, lastHovered.tile1.position.y, 32, 32);
            gameHoverCtx.clearRect(lastHovered.tile2.position.x, lastHovered.tile2.position.y, 32, 32);
            gameHoverCtx.clearRect(lastHovered.tile3.position.x, lastHovered.tile3.position.y, 32, 32);
            gameHoverCtx.clearRect(lastHovered.tile4.position.x, lastHovered.tile4.position.y, 32, 32);
        }
    }


/**
 * Function to update the state of the tiles. Used to highlight the tiles that are clicked on.
 * @param hoveredTiles - The tiles that are clicked on.
 * @author Philip
 */
function updateTilesState(hoveredTiles){
    deselect()

    lastHovered = hoveredTiles
    hoveredTiles.tile1.update()
    hoveredTiles.tile2.update()
    hoveredTiles.tile3.update()
    hoveredTiles.tile4.update()
}


/**
 * Class for the placeable tiles. Used to create the tiles that are placeable on the map.
 * @class PlaceableTile
 * @author Philip
 */
export class PlaceableTile{

    /**
     * Constructor for the placeable tiles. Sets the position and tileID for the tile.
     * @param position - The position of the tile.
     * @param tileID - The ID of the tile.
     * @author Philip
     */
    constructor({position}, tileID) {
        this.position = position;
        this.size =  32; // tile size
        this.tileID = tileID; //used to id the tile
    }

    /**
     * Function to draw the tiles on the canvas.
     * @author Philip
     */
    draw(){
        gameHoverCtx.fillStyle = 'rgba(50,171,255,0.5)';
        gameHoverCtx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    /**
     * Function to update the tiles on the canvas. Used to draw the tiles on the canvas.
     * @author Philip
     */
    update(){
        this.draw()
    }
}





/*
--- Event listeners ---
 */

/**
 * Event listener for the mouse click. Used to check if the mouse is clicking on a tile and if so, update the tile.
 * @param ev
 * @author Philip
 */
window.addEventListener('click', (ev) =>{
    const rect = gameCanvas.getBoundingClientRect()
    mouse.x = ev.clientX - rect.left
    mouse.y = ev.clientY - rect.top

    if (mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height) { //inside canvas
        const hoveredTiles = isTile()

        if(hoveredTiles !== undefined){

            updateHoverTiles(hoveredTiles)
            selectTile(hoveredTiles)

        }else {
            selectTile(hoveredTiles)
            deselect()
        }
    }
});

// The following code is used to check if the mouse is hovering over a tile and if so, update the hover effect on the tile. It is right now only used for reference and is not used in the game.
/*
let lastHover = false;
window.addEventListener('mousemove', (ev) => { // Use canvas
    const rect = gameCanvas.getBoundingClientRect()
    mouse.x = ev.clientX - rect.left
    mouse.y = ev.clientY - rect.top

    if (mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height) { //inside canvas
        hoveredTiles = isTile()

        updateHoverTiles()
    }
});

 */

