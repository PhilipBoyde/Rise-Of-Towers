import { Projectile } from "./Projectile.js";

/**
 * Class for the Tower. The tower has a position, range, damage, cost, upgrade cost, max level, speed and projectile speed.
 * @class Tower
 * @constructor
 * @param {CanvasRenderingContext2D} gameCtx - The canvas rendering context.
 * @param {Object} tiles - Tiles information.
 * @param {number} cost - The cost of the tower.
 * @param {number} range - The range of the tower.
 * @param {number} damage - The damage of the tower.
 * @param {number} upgradeCost - The cost of upgrading the tower.
 * @param {number} maxLevel - The maximum level of the tower.
 * @param {number} speed - The shooting speed of the tower.
 * @param {number} projectileSpeed - The speed of the projectile.
 * @param {string[]} imagePaths - Array of image paths for tower frames.
 * @author Muhammed
 * @author Philip
 * @author Mahyar
 */
export class Tower {
    /**
     * Constructor for the Tower.
     * @param {CanvasRenderingContext2D} gameCtx - The canvas rendering context.
     * @param {Object} tiles - Tiles information.
     * @param {number} cost - The cost of the tower.
     * @param {number} range - The range of the tower.
     * @param {number} damage - The damage of the tower.
     * @param {number} upgradeCost - The cost of upgrading the tower.
     * @param {number} maxLevel - The maximum level of the tower.
     * @param {number} speed - The shooting speed of the tower.
     * @param {number} projectileSpeed - The speed of the projectile.
     * @param {string[]} imagePaths - Array of image paths for tower frames.
     * @param projectileImagePath
     * @param options
     * @param towerType
     */
    constructor(gameCtx, tiles, cost, range, damage, upgradeCost, maxLevel, speed, projectileSpeed, imagePaths, projectileImagePath, options, towerType) {
        this.gameCtx = gameCtx;
        this.positionID = tiles.positionID;
        delete tiles.positionID;

        this.towerType = towerType.toString();

        this.level = 1;


        const closets = this.findClosestToTopLeft(tiles);

        if (this.towerType === "Wizard") { //Check if it's a Wizard tower to calibrate
            this.x = closets.position.x - 15;// top left corner of the tower
        } else {
            this.x = closets.position.x;// top left corner of the tower
        }

        this.y = closets.position.y; // top left corner of the tower
        this.range = range; // not a value we want, just to try
        this.damage = damage; // start damage, test values
        this.cost = cost; // test, susceptible to changes
        this.upgradeCost = upgradeCost; // Starting upgrade cost
        this.maxLevel = maxLevel; // Maximum level of the tower
        this.speed = speed;
        this.delay = 0;
        this.level = 1;
        this.projectileSpeed = projectileSpeed;
        this.projectiles = [];
        this.imagePaths = imagePaths; // Store the image paths for later use
        this.projectileImagePath = projectileImagePath;

        this.loadImages(imagePaths);

        this.frameWidth = options.frameWidth; // Bredden på varje frame (280 / 4)
        this.frameHeight = options.frameHeight; // Höjden på varje frame
        this.frameIndex = options.frameIndex; // Aktuell frame-index
        this.frameCount = options.frameCount; // Antal frames i bilden
        this.frameUpdateCounter = options.frameUpdateCounter;
        this.frameSpeed = options.frameSpeed; // Hastigheten för att byta frame (? frames per sekund)

    }

    /**
     * Loads tower images.
     * @param {string[]} imagePaths - Array of image paths for tower frames.
     */
    loadImages(imagePaths) {
        this.towerImages = [];
        let loadedImages = 0;
        imagePaths.forEach((path, index) => {
            const towerImage = new Image();
            towerImage.src = path;
            towerImage.onload = () => {
                loadedImages++;
                if (loadedImages === imagePaths.length) {
                    this.drawTower();
                }
            };
            this.towerImages[index] = towerImage;
        });
    }

    /**
     * Finds the tile in the left corner of the different tiles.
     * it is used to paint the tower on the selected tiles.
     * @param {Object} Tiles - the selected tiles.
     * @param towerType
     * @returns {Object} - the tile in the left corner.
     * @author Philip
     */
    findClosestToTopLeft(Tiles, towerType) {

        let closestTile = undefined;
        let minDistance = Infinity;

        for (const key of Object.keys(Tiles)) {
            const tile = Tiles[key];
            const dx = tile.position.x;
            const dy = tile.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                minDistance = distance;
                closestTile = tile;
            }
        }

        console.log(closestTile)
        return closestTile;
    }

    /**
     * Draws the tower on the canvas.
     * @private
     */
    drawTower() {
        this.displayRange();
        if (this.towerImages.every(image => image.complete)) {
            // Alla bilder har laddats, rita tornet med den aktuella frame från towerImages-arrayen
            const towerImage = this.towerImages[0];
            let adjustedWidth = this.frameWidth;
            let adjustedHeight = this.frameHeight;
            const frameX = this.frameIndex * this.frameWidth; // X cordination for frames
            const frameY = 0; // y is 0 bcs we only use on row of frames



            this.gameCtx.drawImage(towerImage, frameX, frameY, adjustedWidth, adjustedHeight, this.x, this.y - 65, adjustedWidth, adjustedHeight);
        } else {
            this.gameCtx.fillStyle = 'rgba(18,19,17,0)';
            this.gameCtx.fillRect(this.x, this.y, 64, 64); // test value
        }
    }


    /**
     * Finds the enemies within the tower range.
     * @param {Object[]} enemies - the enemies on the canvas.
     * @returns {Object[]} - the enemies within the tower range.
     */
    findTargets(enemies) {
        enemies.sort((a, b) => a.pathIndex - b.pathIndex); // sort enemies by pathIndex (the further the enemy is on the path, the higher the pathIndex)
        console.log(enemies)

        //  enemies within the tower range
        return enemies.filter(enemy => {
            const dx = enemy.center.x - this.x;
            const dy = enemy.center.y - this.y;
            return Math.sqrt(dx * dx + dy * dy) <= this.range;
        });
    }

    /**
     * Shoots the enemies within the tower range.
     * @param {Object[]} enemies - The enemies on the canvas.
     */
    shoot(enemies) {
        //  targeting part
        const target = this.findTargets(enemies);

        if (target.length > 0) {

            target.reverse();

            const projectile = new Projectile(
                this.towerType,
                this.x,
                this.y,
                this.projectileSpeed,
                this.damage,
                target[0],
                this.handleProjectileRemoval.bind(this), // Bind the current context
                this.gameCtx,
                this.projectileImagePath
            );
            this.projectiles.push(projectile);


        }
    }

    /**
     * Handles the removal of the projectile from the canvas when it hits the target.
     * @param {Projectile} projectile - The projectile that is shot from the tower.
     */
    handleProjectileRemoval(projectile) {
        const index = this.projectiles.indexOf(projectile);
        if (index > -1) {
            this.projectiles.splice(index, 1);
            this.projectiles.setInvisible();
        }
    }

    /**
     * Updates the tower animation.
     */
    updateAnimation() {
        if (this.frameUpdateCounter >= this.frameSpeed) {
            this.frameIndex++; // Öka frame-indexet
            this.frameUpdateCounter = 0; // Återställ räknaren
        } else {
            this.frameUpdateCounter++; // Öka räknaren
        }

        if (this.frameIndex >= this.frameCount) {
            this.frameIndex = 0; // Återgå till första frame när vi når slutet av frames
        }
    }

    /**
     * Updates the tower.
     * @param {Object[]} enemies - The enemies on the canvas.
     */
    update(enemies) {
        this.updateAnimation();
        this.drawTower();
        this.projectiles.forEach(projectile => projectile.move());
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);

        if (this.delay === this.speed) {
            this.delay = 0;
            this.shoot(enemies);
        } else {
            this.delay++;
        }

        // Check if all enemies are dead
        const allEnemiesDead = enemies.every(enemy => enemy.isDead);

        // If all enemies are dead, mark all projectiles as invisible
        if (allEnemiesDead) {
            this.projectiles.forEach(projectile => projectile.markedForDeletion = true);
        }
    }

    /**
     * Displays the range of the tower on the canvas.
     */
    displayRange() {
        this.gameCtx.fillStyle = '#ff0000';
        this.gameCtx.beginPath();
        this.gameCtx.arc(this.x + 32, this.y + 32, this.range, 0, Math.PI * 2); // test value
        this.gameCtx.stroke();
    }



    // The following code is not used in the final version of the game, and is kept for reference for later development.
/*
canUpgrade(coins) {
        return this.level < this.maxLevel && coins >= this.upgradeCost;

    }

    export

    upgrade(coins) {
        if (this.canUpgrade(coins)) {
            this.level ++;
            this.range += 20; // for ex. Increase range by 20 each upgrade
            this.damage += 15; // and damage by 15 each upgrade
            this.upgradeCost *= 1.5; // it increases cost for upgrading by 50%
            coins -= this.upgradeCost; // subtract the cost from player's coins
            this.updateTowerStats(); // Redraw or recalculate relevant stats
        } else {
            console.log("Tower is at maximum level! or Not enough coins to upgrade!");
        }
    }

    updateTowerStats() { // Redraw the tower with new stats
        this.drawTower();
        this.displayRange();
    }


 */
}

