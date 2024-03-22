const gameCanvas = document.querySelector('.GameScreen');
const interactiveCanvas = document.querySelector('.GameUI');



if (gameCanvas) {
    const gameCtx = gameCanvas.getContext('2d');

    gameCanvas.width = 1366;
    gameCanvas.height = 768;

    gameCtx.fillStyle = 'white';
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
} else {
    console.error('Game canvas element not found!');
}

if (interactiveCanvas) {
    const interactiveCtx = interactiveCanvas.getContext('2d');

    interactiveCanvas.width = 200;
    interactiveCanvas.height = 768;

    interactiveCtx.fillStyle = '#A1662F';
    interactiveCtx.fillRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);
} else {
    console.error('Interactive canvas element not found!');
}

