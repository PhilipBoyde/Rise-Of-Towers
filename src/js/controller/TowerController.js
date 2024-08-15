import { Projectile } from "./Projectile.js";

/**
 * Class for the Tower. The tower has a position, range, damage, cost, upgrade cost, max level, speed and projectile speed.
 * @class Tower
 * @constructor
 * @param {CanvasRenderingContext2D} gameCtx - The canvas rendering context.
 * @param {Object} tiles - Tiles information.
 * @param {number} cost - The cost of the tower.
 * @param {number} range - The range of the tower.
 * @param {number} damage - The damage tower deals to the enemies.
 * @param {number} upgradeCost - The cost of upgrading the tower.
 * @param {number} maxLevel - The maximum level of the tower.
 * @param {number} speed - The shooting speed of the tower.
 * @param {number} projectileSpeed - The speed of the projectile.
 * @param {string[]} imagePaths - Array of image paths for tower frames.
 * @author Muhamed
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
     * @param {number} damage - The damage dealt to the enemies.
     * @param {number} upgradeCost - The cost of upgrading the tower.
     * @param {number} maxLevel - The maximum level of the tower.
     * @param {number} speed - The shooting speed of the tower.
     * @param {number} projectileSpeed - The speed of the projectile.
     * @param {string[]} imagePaths - Array of image paths for tower frames.
     * @param projectileImagePath
     * @param options
     * @param towerType
     * @param showRange
     * @param upgradeInfo
     * @param aoeRadius
     * @author Philip
     * @author Mahyar
     * @author Muhamed
     */
    constructor(gameCtx, tiles, cost,upgradeCost, range, damage, maxLevel, speed, projectileSpeed, imagePaths, projectileImagePath, options, towerType, showRange, {upgradeInfo}, aoeRadius = 0) {
        this.gameCtx = gameCtx;
        this.upgradeInfo = upgradeInfo;

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
        this.showRange = showRange;
        this.aoeRadius = aoeRadius;

        this.loadImages(this.imagePaths);

        this.frameWidth = options.frameWidth; // Bredden på varje frame (280 / 4)
        this.frameHeight = options.frameHeight; // Höjden på varje frame
        this.frameIndex = options.frameIndex; // Aktuell frame-index
        this.frameCount = options.frameCount; // Antal frames i bilden
        this.frameUpdateCounter = options.frameUpdateCounter;
        this.frameSpeed = options.frameSpeed; // Hastigheten för att byta frame (frames per sekund)

    }

    /**
     *returns a position of a tower
     * @returns {*}
     * @author Philip
     */
    getPositionID(){
        return this.positionID;
    }

    /**
     * Return the cost av a tower
     * @returns {cost}
     * @author Philip
     */
    getTowerValue(){
        return this.cost;
    }

    /**
     * This metod is used to check the upgraded tower
     * it uses switch case and change the variables of any tower that has been upgraded
     * @author Mahyar
     * @author Philip
     */
    upgradeTower() {
        if (this.level < this.maxLevel) {
            this.level += 1;

            switch (this.level) {
                case 2:
                    this.upgradeCost = this.upgradeInfo.level2.cost;
                    this.damage = this.upgradeInfo.level2.damage;
                    this.speed = this.upgradeInfo.level2.speed;
                    break;

                case 3:
                    this.upgradeCost = this.upgradeInfo.level3.cost;
                    this.damage = this.upgradeInfo.level3.damage;
                    this.speed = this.upgradeInfo.level3.speed;
                    break;

                default:
                    console.error(`Unknown level: ${this.level}`);
                    break;
            }

            if (this.level === this.maxLevel) {
                console.log("Tower is at MAX level");
            }

            console.log(`Upgraded to level ${this.level}: cost=${this.upgradeCost}, damage=${this.damage}, speed=${this.speed}`);
        } else {
            console.log("Tower is already at MAX level");
        }
    }


    /**
     * Loads tower images.
     * @author Philip
     * @author Mahyar
     */
    loadImages(imagePaths) {
        this.towerImages = [];
        let loadedImages = 0;
        imagePaths.forEach((path, index) => {
            const towerImage = new Image();
            towerImage.src = path;
            towerImage.onload = () => {
                loadedImages++;
                if (loadedImages === this.imagePaths.length) {
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
     * @author Mahyar
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

        //console.log(closestTile)
        return closestTile;
    }

    /**
     * Status flag for the tower range to hide or show range
     * @author Philip
     */
    setStatusOfTowerRange(status){
        this.showRange = status;
    }
    /**
     * Draws the tower on the canvas.
     * @author Mahyar
     * @author Philip
     */
    drawTower() {
        this.updateAnimation();

        if (this.showRange){
            this.displayRange();
        }

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
     * @author Philip
     * @author Mahyar
     */
    findTargets(enemies) {
        enemies.sort((a, b) => a.pathIndex - b.pathIndex); // sort enemies by pathIndex (the further the enemy is on the path, the higher the pathIndex)
        //console.log(enemies)

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
     * @author Philip
     * @author Mahyar
     * @author Muhamed
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
                this.projectileImagePath,
                enemies,
                this.aoeRadius
        );
            this.projectiles.push(projectile);


        }
    }

    /**
     * Handles the removal of the projectile from the canvas when it hits the target.
     * @param {Projectile} projectile - The projectile that is shot from the tower.
     * @author Philip
     * @author Mahyar
     */
    handleProjectileRemoval(projectile) {
        const index = this.projectiles.indexOf(projectile);
        if (index > -1) {
            this.projectiles.splice(index, 1);

            try{
                this.projectiles.setInvisible();
            }catch (e) {} //Projectiles can sometimes be called when they don't exist. This fixes that
        }


        }

    /**
     * Updates the tower animation.
     * @author Mahyar
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
     * @author Mahyar
     * @author Muhamed
     * @author Philip
     */
    update(enemies) {
        this.projectiles.forEach(projectile => {
            projectile.enemies = enemies; // Ensure projectiles have access to the enemies array
            projectile.move();
        });
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
     * @author Philip
     * @author Muhamed
     */
    displayRange() {
        this.gameCtx.fillStyle = '#ff0000';
        this.gameCtx.beginPath();
        this.gameCtx.arc(this.x + 32, this.y + 32, this.range, 0, Math.PI * 2); // test value
        this.gameCtx.stroke();
    }
}

