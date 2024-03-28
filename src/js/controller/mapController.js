import {Startmap1} from "./map1Controller";
let img;

switch (activeMap) { // Load the map based on the activeMap variable
    case 1:
        img.src = '../assets/gamemap/Map1.png';
        img.onload = () => {
            const gameCtx = gameCanvas.getContext('2d');
            gameCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);
        }


        const map1Controller = new Startmap1();
        return img;
        break;
    case 2:
        img.src = '../assets/gamemap/Map2.png';
        img.onload = () => {
            const gameCtx = gameCanvas.getContext('2d');
            gameCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);
        }

        break;
    case 3:
        img.src = '../assets/gamemap/Map3.png';
        img.onload = () => {
            const gameCtx = gameCanvas.getContext('2d');
            gameCtx.drawImage(img, 0, 0, gameCanvas.width, gameCanvas.height);
        }

        break

    default:
        console.log('Map not found!')
        break;
}

