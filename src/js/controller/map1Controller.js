import { path1Route1, path1Route2, path1Route3 } from '../model/map1/Map1Paths.js';
function map1Controller(gameCanvas, interactiveCanvas) {
    const c = gameCanvas.getContext('2d');
    startGame(c, gameCanvas)
}

function startGame(c, gameCanvas) {
    if (c) {
        
        let img = new Image();
        img.onload = function() {
            c.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);
            drawTowerHitBox(c,);
            animate(c, gameCanvas, img)
        }
        
        img.src = '../assets/gameMap/map1.png';
    } else {
        console.error('Game canvas element not found!');
    }
}


function drawTowerHitBox(gameCtx){
    gameCtx.strokeStyle = '#3cff00';
    gameCtx.lineWidth = 2;

    gameCtx.strokeRect(135, 70, 85, 80); //Tower 1
    gameCtx.strokeRect(675, 70, 85, 80); //Tower 2
    gameCtx.strokeRect(540, 265, 85, 80); //Tower 3
    gameCtx.strokeRect(360, 265, 85, 80); //Tower 4
    gameCtx.strokeRect(360, 685, 85, 80); //Tower 5
    gameCtx.strokeRect(810, 535, 85, 80); //Tower 6
    gameCtx.strokeRect(1035, 265, 85, 80); //Tower 7
}


class Enemy {
    constructor({position = {x: 0, y: 0}}, speed, path){
        this.position = position;
        this.width = 50;
        this.height = 50;
        this.speed = speed;
        this.path = path;
        this.pathIndex = 0;

        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2

        }
    }
    draw(gameCtx) {
        gameCtx.fillStyle = '#ff0000';
        gameCtx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(gameCtx) {
        this.draw(gameCtx);

        const path = this.path[this.pathIndex]
        console.log(this.position.y)
        const yDistance = path.y -  this.center.y
        const xDistance = path.x -  this.center.x
        
        const angle = Math.atan2(yDistance, xDistance);
        this.position.x += Math.cos(angle) * this.speed;
        this.position.y += Math.sin(angle) * this.speed;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        if (Math.round(this.center.x) === Math.round(path.x) &&  Math.round(this.center.y) === Math.round(path.y) && this.pathIndex < this.path.length - 1) {
            this.pathIndex++;
        }
    }
}
const enemy = new Enemy({position: {x: path1Route1[0].x, y: path1Route1[0].y}}, 0.2, path1Route1);

function animate(gameCtx, gameCanvas, img){
    requestAnimationFrame(() => animate(gameCtx, gameCanvas, img));
    gameCtx.clearRect(0,0,gameCanvas.width, gameCanvas.height);
    gameCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);

    enemies.forEach(enemy => {
        enemy.update(gameCtx);
    });
}


const enemies = [];
for (let i = 1; i <10;  i++){
    const xOffset = i * 60;
    enemies.push(new Enemy({position: {x: path1Route1[0].x - xOffset, y: path1Route1[0].y}}, 0.2, path1Route1));
}

export default map1Controller;