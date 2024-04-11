import {map1TowerArea} from "../model/map1/Map1PlacebleArea.js";

const placementTilesData2D = [];
for (let i = 0; i < map1TowerArea.length; i+= 35) { // 35 is the width of the map
    placementTilesData2D.push(map1TowerArea.slice(i, i + 35));
}

const mouse = {
    x: 'undefined',
    y: 'undefined'
}
const neighbors = [];
let hoverColor = 'rgba(235,232,237,0.015)';
let gameStatus;

export function gameIsRunning(running){
    gameStatus = running;
    if (gameStatus === true){
        hoverColor = 'rgba(235,232,237,0.5)';
    }else {
        hoverColor = 'rgba(235,232,237,0.015)';
    }
}

let hoverTile = undefined;
let activeTile = undefined;
let hoveredTiles = undefined;

export function setGameInfo(newGamecanvas, newGameCtx){
    gameCanvas = newGamecanvas
    gameCtx = newGameCtx
}

let gameCanvas;
let gameCtx
let lastTile = undefined;

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



window.addEventListener('click', (ev) =>{
    const rect = gameCanvas.getBoundingClientRect()
    mouse.x = ev.clientX - rect.left
    mouse.y = ev.clientY - rect.top

    if (mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height) { //inside canvas
        const hoveredTiles = isTile()

    }



});

function isTile(){
    for (let i = 0; i < placementTiles.length; i++){
        const tile = placementTiles[i]

        if (mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size){

            return getTiles(tile, placementTiles)
        }
    }
}

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
        tile4: neighbors[2]
    }
}
let lastHovered = undefined;
export function updateHoverTiles(){

    if(hoveredTiles !== undefined){
        console.log("update")
        hoveredTiles.tile1.hovered(true)
        hoveredTiles.tile1.update(gameCtx)

        hoveredTiles.tile2.hovered(true)
        hoveredTiles.tile2.update(gameCtx)

        hoveredTiles.tile3.hovered(true)
        hoveredTiles.tile3.update(gameCtx)

        hoveredTiles.tile4.hovered(true)
        hoveredTiles.tile4.update(gameCtx)

        if(!gameStatus){

        }
    }
}

    export class PlaceableTile{
        constructor({position}) {
            this.position = position;
            this.size =  32; // tile size
            this.isHovered = false;
        }

        draw(gameCtx){
            gameCtx.fillStyle = hoverColor;
            gameCtx.fillRect(this.position.x, this.position.y, this.size, this.size);
        }

        hovered(status){
            this.isHovered = status;
        }
        
        update(gameCtx) {
            if(this.isHovered){
                this.draw(gameCtx)
            }
        }
    }


const placementTiles = []
placementTilesData2D.forEach(((row, yIndex) => {
    row.forEach((tile , xIndex) => {

        if (tile === 61){
            placementTiles.push(new PlaceableTile(
                {position: {
                        x: xIndex * 32,
                        y: yIndex * 32,
                    }
                }
            ))
        }
    })
}));




