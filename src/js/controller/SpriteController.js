/**
 * ToDo:
 * 1. add delay for every enemy. So the enemies are not synced
 */


/**
 * Class for the sprite controller.
 * Handles the sprite animations for the enemies.
 * @class SpriteController
 * @author Philip
 * @author Mahyar
 */
export class SpriteController {

    /**
     * Constructor for the sprite controller. Sets the position, sprite images and frames for the sprite.
     * @param position
     * @param spriteImages
     * @param frames
     * @author Philip
     */
    constructor({position = {x: 0, y: 0}}, {spriteImages = {upp: "", down: "", right: "", left: ""}}, frames = {max: 6, min: 0}){
        this.position = position
        this.sprite = new Image();
        this.spriteImages = spriteImages;

        this.spriteFrames = {
            max: frames.max, //the number of frames in the sprite
            min : frames.min, //the starting frame, typically 0
            current: 0, // current frame
            elapsedTime: 0, //how many frames have passed
            hold: 6 // how many frames to hold each frame, made for fine-tuning the animation
        };
    }



    /**
     * Changes the orientation of the sprite.
     * @param orientation
     * @author Philip
     * @author Mahyar
     */
    changeSpriteOrientation(orientation){
        switch (orientation) {
            case 'up':
                this.sprite.src = this.spriteImages.up;
                break;

            case 'down':
                this.sprite.src = this.spriteImages.down;
                break;

            case 'right':
                this.sprite.src = this.spriteImages.right;
                break;
            case 'left':
                this.sprite.src = this.spriteImages.left;
                break;

            case 'unknown':
                console.log('Unknown orientation of enemy sprite!');
                break;

            default:
                console.log('Something went wrong when setting the orientation')
                break;
        }
    }

    /**
     * Draws the sprite on the canvas.
     * crops the sprite and holds the animation.
     * @param gameCtx
     * @param orientation
     * @author Philip
     */
    drawSprite(gameCtx, orientation){
        this.changeSpriteOrientation(orientation);

        const cropWidth = this.sprite.width / this.spriteFrames.max;

        //crop the sprite
        const crop = {
            position: {
                x: cropWidth * this.spriteFrames.current,
                y: 0
            },

            width: cropWidth,
            height:  this.sprite.height
        };

        gameCtx.drawImage(
            this.sprite,
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.position.x,
            this.position.y,
            crop.width,
            crop.height
        );

        //hold animation
        this.spriteFrames.elapsedTime++;
        if(this.spriteFrames.elapsedTime % this.spriteFrames.hold === 0){
            this.spriteFrames.current++;

            if (this.spriteFrames.current >= this.spriteFrames.max -1) {
                this.spriteFrames.current = 0;
            }
        }
    }
}