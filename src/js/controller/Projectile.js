/**
 * Projectile class that handles the projectile movement and damage.
 * @class Projectile
 * @author Muhammed
 */
export class Projectile {
    /**
     * Constructor for the projectile. Sets the position, speed, damage, target, onDelete and gameCtx for the projectile.
     * @constructor
     * @param {number} x - x position of the projectile
     * @param {number} y - y position of the projectile
     * @param {number} speed - speed of the projectile
     * @param {number} damage - damage the projectile does
     * @param {Object} target - the target of the projectile
     * @param {function} onDelete - function to delete the projectile
     * @param {CanvasRenderingContext2D} gameCtx - the game context
     * @param {string[]} imagePaths - array of image paths for the projectile
     * @author Muhammed
     */
    constructor(x, y, speed, damage, target, onDelete, gameCtx, imagePaths) {
        this.gameCtx = gameCtx;
        this.onDelete = onDelete;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.target = target;
        this.markedForDeletion = false;
        this.imagePaths = imagePaths;
        this.imageLoaded = false;
        this.imageIndex = 0;
        this.frameCount = 0;
        this.images = [];
        this.loadImage(imagePaths);
    }

    /**
     * Loads images from the given image paths.
     * @param {string[]} imagePaths - array of image paths
     * @returns {void}
     */
    loadImage(imagePaths) {
        this.images = [];
        let loadedImages = 0;
        imagePaths.forEach((path, index) => {
            const image = new Image();
            image.onload = () => {
                loadedImages++;
                if (loadedImages === imagePaths.length) {
                    this.imageLoaded = true;
                }
            };
            image.src = path;
            this.images.push(image);
        });
    }

    /**
     * Moves the projectile towards the target. If the projectile hits the target, the target's health is reduced by the damage of the projectile.
     * If the projectile hits the target, it is marked for deletion.
     * @method move
     * @memberof Projectile
     * @instance
     * @public
     * @returns {void}
     */
    move() {
        this.draw();
        const dx = this.target.center.x - this.x;
        const dy = this.target.center.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        const ratio = this.speed / distance;
        this.x += dx * ratio;
        this.y += dy * ratio;

        if (Math.abs(this.x - this.target.center.x) < 5 && Math.abs(this.y - this.target.center.y) < 5) {
            this.target.health -= this.damage;
            if (this.towerType === "Ice") {
                this.target.slowEnemy(0.5) //Fiendens hastighet subtraheras med 0.5, vanligtvis ungefär 1/3 av sin normala hastighet
            }
            this.markedForDeletion = true;
            this.onDelete(this);
        }
    }

    /**
     * Draws the projectile on the canvas.
     * @method draw
     * @memberof Projectile
     * @instance
     * @public
     * @returns {void}
     */
    draw() {
        const frameChangeInterval = 200;

        if (this.markedForDeletion) {
            return;
        }

        if (this.imageLoaded) {
            const currentImage = this.images[this.imageIndex];
            this.gameCtx.drawImage(currentImage, this.x, this.y, 40, 40);

            this.frameCount++;
            if (this.frameCount >= frameChangeInterval / this.speed) {
                this.imageIndex = (this.imageIndex + 1) % this.images.length;
                this.frameCount = 0;
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }

}
