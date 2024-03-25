const gameCanvas = document.querySelector('.GameScreen');
const interactiveCanvas = document.querySelector('.GameUI');
const activeMap = 1;    // Change this to the map you want to load
const gameCtx = gameCanvas.getContext('2d');
import map1Controller from './map1Controller.js';


window.addEventListener('resize', function()        {
    if (window.innerWidth < 1352  || window.innerHeight < 700) {
        alert('Your browser window is too small!');
    }
});





window.addEventListener('click', function(event) {
    const rect = gameCanvas.getBoundingClientRect();

    
    //TESTING
    let rectX = 135;
    let rectY = 70;
    let rectWidth = 85;
    let rectHeight = 80;

    // Get the x and y coordinates of the click event
    let pointX = event.clientX - rect.left;
    let pointY = event.clientY - rect.top;

    if (pointX >= rectX && pointX <= rectX + rectWidth && pointY >= rectY && pointY <= rectY + rectHeight) {
        alert( 'Clicked within the specified area!')
    }
});


// Draw the game map
if (gameCanvas) {
    
    gameCanvas.width = 1124;
    gameCanvas.height = 768;

    let img = new Image();
    img.onload = function() {
        gameCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);

        drawTowerHitBox(gameCtx);

       
        if (activeMap === 1) {
            map1Controller(gameCtx, interactiveCanvas);

            //import Map1TowerHitBox from '../model/map1/Map1TowerHitBox.js';
            //Map1TowerHitBox();
        }else {
            console.error('Map not found!');
        }
    }
    img.src = '../assets/gameMap/map1.png';
} else {
    console.error('Game canvas element not found!');
}

//draw the sidebar canvas
if (interactiveCanvas) {
    const interactiveCtx = interactiveCanvas.getContext('2d');

    interactiveCanvas.width = 200;
    interactiveCanvas.height = 768;

    interactiveCtx.fillStyle = '#A1662F';
    interactiveCtx.fillRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);
} else {
    console.error('Interactive canvas element not found!');
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
