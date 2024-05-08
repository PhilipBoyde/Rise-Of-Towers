/**
 * Projectile class that handles the projectile movement and damage.
 * @class Projectile
 */
export class Projectile {
    /**
     * Constructor for the projectile.
     * @constructor
     * @param towerType - The type of the tower
     * @param {number} x - x position of the projectile
     * @param {number} y - y position of the projectile
     * @param {number} speed - speed of the projectile
     * @param {number} damage - damage the projectile does
     * @param {Object} target - the target of the projectile
     * @param {function} onDelete - function to delete the projectile
     * @param {CanvasRenderingContext2D} gameCtx - the game context
     * @param {string[]} imagePaths - array of image paths for the projectile
     */
    constructor(towerType, x, y, speed, damage, target, onDelete, gameCtx, imagePaths) {
        this.towerType = towerType;
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
     * Moves the projectile towards the target.
     */
    move() {
        this.draw();
        const dx = this.target.center.x - this.x;
        const dy = this.target.center.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        const ratio = this.speed / distance;
        this.x += dx * ratio;
        this.y += dy * ratio;


        // Check if the projectile hits the target
        if (Math.abs(this.x - this.target.center.x) < 5 && Math.abs(this.y - this.target.center.y) < 5) {
            this.target.health -= this.damage;
           if (this.towerType === "Ice") {
               this.target.slowEffect();
           }
            this.markedForDeletion = true;
        }
    }

    /**
     * Draws the projectile on the canvas.
     */
    draw() {
        const frameChangeInterval = 400;

        if (this.markedForDeletion) {
            // If the projectile is marked for deletion, remove it and exit the draw() method
            this.onDelete(this);
            return;
        }

        if (this.imageLoaded) {
            const currentImage = this.images[this.imageIndex];
            this.gameCtx.drawImage(currentImage, this.x, this.y, 30, 30);

            this.frameCount++;
            if (this.frameCount >= frameChangeInterval / this.speed) {
                this.imageIndex = (this.imageIndex + 1) % this.images.length;
                this.frameCount = 0;
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }

    setInvisible() {
        this.markedForDeletion = true;
    }
}
