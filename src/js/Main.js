import {Tower} from './Tower.js';
import {ArcherTower} from './ArcherTower.js';


const gameCanvas = document.querySelector('.GameScreen');
const interactiveCanvas = document.querySelector('.GameUI');
const towers = [];
let selectedTowerType = null;



if (gameCanvas) {
    const gameCtx = gameCanvas.getContext('2d');
    const interactiveCtx = interactiveCanvas.getContext('2d');

    gameCanvas.width = 1366;
    gameCanvas.height = 768;
    interactiveCanvas.width = 200;
    interactiveCanvas.height = 768;

    gameCtx.fillStyle = 'white';
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    interactiveCtx.fillStyle = 'blue';
    interactiveCtx.fillRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);
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
function gameLoop() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    towers.forEach(tower => {
        tower.update();
        tower.draw(gameCtx);
    });

    function placeTower(x, y) {
        let tower;
        switch (selectedTowerType) {
            case 'archer':
                tower = new ArcherTower(x, y);
                break;
            default:
                return;
        }
        towers.push(tower);
        selectedTowerType = null; // reset
    }

    document.querySelectorAll('.tower-icon').forEach(icon => {
        icon.addEventListener('click', function () {
            selectedTowerType = this.id.replace('tower', ''); // 'tower1' becomes 'archer', etc.
        });
    });

    gameCanvas.addEventListener('click', function (event) {
        if (selectedTowerType) {
            const rect = gameCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            placeTower(x, y);
        }
    });

    gameLoop();
}



