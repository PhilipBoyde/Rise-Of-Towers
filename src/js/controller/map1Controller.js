import { path1Route1, path1Route2, path1Route3 } from '../model/map1/Map1Paths.js';
function map1Controller(gameCtx, interactiveCanvas) {
    
}

let x = 200;
function testEnemy(gameCtx) {
    gameCtx.fillStyle = '#ff0000';

    
}

function animate(gameCtx){
    requestAnimationFrame(animate);
    testEnemy()
    gameCtx.fillRect(x,100,50,50);
    x++
}


export default map1Controller;