import {path1Route1} from "../model/map1/Map1Paths.js";
import { Enemy } from './EnemyController.js';
import {Startmap1 } from './map1Controller.js';

const gameCanvas = document.querySelector('.GameScreen');
const interactiveCanvas = document.querySelector('.GameUI');
const activeMapNbr = 1;    // Change this to the map you want to load
let round = 0;
let activeMap;
document.getElementById("GameWaveButton").addEventListener("click", nexWave);
const gameCtx = gameCanvas.getContext('2d');

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

            break

        default:
            console.log('Map not found!')
            break;
    }
}


function nexWave(){
    disableButton()
    activeMap.nexWave(round);
    
    const enemies = test();
    animate(enemies)
}

function disableButton(){
    let button = document.getElementById("GameWaveButton");
    button.style.backgroundColor = 'gray';
    button.style.filter = 'blur(1px)';
    document.getElementById("GameWaveButton").disabled = true;
}

function enableButton(){
    let button = document.getElementById("GameWaveButton");
    button.style.backgroundColor = '';
    button.style.filter = 'none';
    document.getElementById("GameWaveButton").disabled = false;
    
}




function test() {
    const enemies = [];
    for (let i = 1; i <10;  i++){
        const xOffSet = i * 80;
        enemies.push(new Enemy({position: {x: path1Route1[0].x + xOffSet, y: path1Route1[0].y}}, 1, path1Route1, 100));
    }

    return enemies;
}


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


