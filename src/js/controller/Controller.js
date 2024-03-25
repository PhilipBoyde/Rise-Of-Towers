const gameCanvas = document.querySelector('.GameScreen');
const interactiveCanvas = document.querySelector('.GameUI');
const activeMap = 1;    // Change this to the map you want to load
import map1Controller from './map1Controller.js';


/*
window.addEventListener('resize', function()        {
    if (window.innerWidth < 1352  || window.innerHeight < 700) {
        alert('Your browser window is too small!');
    }
});

 */





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


if (gameCanvas){
    gameCanvas.width = 1024;
    gameCanvas.height = 640;
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

if (activeMap === 1) {
    map1Controller(gameCanvas, interactiveCanvas);

    //import Map1TowerHitBox from '../model/map1/Map1TowerHitBox.js';
    //Map1TowerHitBox();
}else {
    console.error('Map not found!');
}


