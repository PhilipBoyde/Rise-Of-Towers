/**
 * Projectile class that handles the projectile movement and damage.
 * @class Projectile
 * @author Muhammed
 */
export class Projectile {

    /**
     * Constructor for the projectile. Sets the position, speed, damage, target, onDelete and gameCtx for the projectile.
     * @constructor
     * @param x - x position of the projectile
     * @param y - y position of the projectile
     * @param speed - speed of the projectile
     * @param damage - damage the projectile does
     * @param target - the target of the projectile
     * @param onDelete - function to delete the projectile
     * @param gameCtx - the game context
     * @author Muhammed
     */
    constructor(x, y, speed, damage, target, onDelete, gameCtx) {
        this.gameCtx = gameCtx
        this.onDelete = onDelete;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.target = target;
        this.markedForDeletion = false;
    }

    /**
     * Moves the projectile towards the target. If the projectile hits the target, the target's health is reduced by the damage of the projectile.
     * If the projectile hits the target, it is marked for deletion.
     * @author Muhammed
     */
    move() {
        this.draw();
        let dx = this.target.center.x - this.x;
        let dy = this.target.center.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        dx /= distance;
        dy /= distance;
        this.x += dx * this.speed; // moving projectile
        this.y += dy * this.speed;

        if (Math.abs(this.x - this.target.center.x) < 5 && Math.abs(this.y - this.target.center.y) < 5) {
            this.target.health -= this.damage; // damaging
            this.markedForDeletion = true; // marking it to be deleted
            this.onDelete(this); // Now tower remove this projectile
        }
    }

    /**
     * Draws the projectile on the canvas.
     * @author Muhammed
     */
    draw() {
        this.gameCtx.fillStyle = '#654321'; // brown color
        this.gameCtx.fillRect(this.x, this.y, 10, 10); // test value
    }


}
