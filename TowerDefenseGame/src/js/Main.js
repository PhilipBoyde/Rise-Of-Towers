const gameCanvas = document.querySelector('.GameScreen');
const interactiveCanvas = document.querySelector('.interactiveBar');

if (gameCanvas) {
    const gameCtx = gameCanvas.getContext('2d');

    gameCanvas.width = 1280;
    gameCanvas.height = 950;

    gameCtx.fillStyle = 'white';
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
} else {
    console.error('Game canvas element not found!');
}

if (interactiveCanvas) {
    const interactiveCtx = interactiveCanvas.getContext('2d');

    interactiveCanvas.width = 358;
    interactiveCanvas.height = 100;

    interactiveCtx.fillStyle = '#A1662F';
    interactiveCtx.fillRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);
} else {
    console.error('Interactive canvas element not found!');
}

