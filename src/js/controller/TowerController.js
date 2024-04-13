import {Projectile} from "./Projectile.js";

/**
 * Class for the Tower. The tower has a position, range, damage, cost, upgrade cost, max level, speed and projectile speed.
 * @class Tower
 * @constructor
 * @param gameCtx
 * @param tiles
 * @param cost
 * @param range
 * @param damage
 * @param upgradeCost
 * @param maxLevel
 * @param speed
 * @param projectileSpeed
 * @author Muhammed
 * @author Philip
 */
export class Tower{

    /**
     * Constructor for the Tower. Sets the position, range, damage, cost, upgrade cost, max level, speed and projectile speed for the tower.
     * @param gameCtx
     * @param tiles
     * @param cost
     * @param range
     * @param damage
     * @param upgradeCost
     * @param maxLevel
     * @param speed
     * @param projectileSpeed
     * @author Muhammed
     * @author Philip
     */
    constructor(gameCtx, tiles, cost, range, damage, upgradeCost, maxLevel, speed, projectileSpeed) {
        this.gameCtx = gameCtx
        this.positionID = tiles.positionID;
        delete tiles.positionID;

        const closets = this.findClosestToTopLeft(tiles)

        this.x = closets.position.x; // top left corner of the tower
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
    }

    /**
     * Finds the tile in the left corner of the different tiles.
     * it is used to paint the tower on the selected tiles.
     * @param Tiles - the selected tiles.
     * @returns {closestTile} - the tile in the left corner.
     * @author Philip
     */
    findClosestToTopLeft(Tiles) {
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

        return closestTile;
    }

    /**
     * Draws the tower on the canvas.
     * @author Muhammed
     * @author Philip
     */
    drawTower() {
        this.displayRange()
        this.gameCtx.fillStyle = '#121311';
        this.gameCtx.fillRect(this.x, this.y, 64, 64); // test value
    }

    /**
     * Finds the enemies within the tower range.
     * @param enemies - the enemies on the canvas.
     * @returns {[]} - the enemies within the tower range.
     * @author Muhammed
     * @author Philip
     */
    findTargets(enemies) {
        enemies.sort((a, b) => a.pathIndex - b.pathIndex); // sort enemies by pathIndex (the further the enemy is on the path, the higher the pathIndex)

        //  enemies within the tower range
        return enemies.filter(enemy => {
            const dx = enemy.center.x - this.x;
            const dy = enemy.center.y - this.y;
            return Math.sqrt(dx * dx + dy * dy) <= this.range;
        });
    }

    /**
     * Shoots the enemies within the tower range. by creating a projectile
     * with the tower position, projectile speed, damage, target, handleProjectileRemoval and gameCtx.
     * @param enemies
     * @returns {Projectile} - the projectile that is shot from the tower.
     * @author Muhammed
     * @author Philip
     */
    shoot(enemies) {
        //  targeting part
        const target = this.findTargets(enemies);

        if (target.length > 0) {

                target.reverse();

                const projectile = new Projectile(  // AMO
                    this.x,
                    this.y,
                    this.projectileSpeed,
                    this.damage,
                    target[0],
                    this.handleProjectileRemoval.bind(this), // Bind the current context
                    this.gameCtx
                );
                this.projectiles.push(projectile);

        }
    }

    /**
     * Handles the removal of the projectile from the canvas when it hits the target.
     * @param projectile - the projectile that is shot from the tower.
     * @returns {[]} - the projectiles that are not marked for deletion.
     * @author Muhammed
     */
    handleProjectileRemoval(projectile) {  // should hopefully remove shot arrow
        const index = this.projectiles.indexOf(projectile);
        if (index > -1) {
            this.projectiles.splice(index, 1);
        }
    }

    /**
     * Updates the tower. Draws the tower on the canvas, moves the projectiles, filters the projectiles that are not marked for deletion.
     * @param enemies
     * @author Muhammed
     * @author Philip
     * @author Emil
     */
    update(enemies) {

        this.drawTower()
        this.projectiles.forEach(projectile => projectile.move());
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);

        if (this.delay === this.speed) {
            this.delay = 0;
            this.shoot(enemies);
        }else {
            this.delay++;
        }
    }

    /**
     * Displays the range of the tower on the canvas.
     * @author Philip
     */
    displayRange() {
        this.gameCtx.fillStyle = '#d90808';
        this.gameCtx.beginPath();
        this.gameCtx.arc(this.x+32, this.y+32, this.range, 0, Math.PI * 2); // test value
        this.gameCtx.stroke();
    }



    // The following code is not used in the final version of the game, and is kept for reference for later development.

    /*
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level += 1;
            this.range += 20; // for ex. Increase range by 20 each upgrade
            this.damage += 15; // and damage by 15 each upgrade
            this.upgradeCost *= 1.5; // it increases cost for upgrading by 50%
        } else {
            console.log("Tower is at maximum level!");
        }
    }

    canUpgrade(playerCoins) {
        return playerCoins >= this.upgradeCost;
    }


    performUpgrade(player) {
        if (this.canUpgrade(player.coins)) {
            player.coins -= this.upgradeCost; // update players coins, do cost
            this.upgrade();
            console.log("Tower upgraded to level" ${this.level});
        } else {
            console.log("Not enough coins to upgrade!");
        }


    }
     */
}