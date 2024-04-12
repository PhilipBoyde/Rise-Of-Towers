/**
 * ToDo:
 * 1. add delay for every enemy. So the enemies are not synced
 */
let run = true;

/**
 * Class for the sprite controller.
 * Handles the sprite animations for the enemies.
 * @class SpriteController - controls the sprite animations for the enemies
 * @author Philip
 * @author Mahyar
 */
export class SpriteController {

    /**
     * Constructor for the sprite controller. Sets the position, sprite images and frame settings for the sprite.
     * @param position - position of the sprite
     * @param spriteImages - sprite images for the sprite
     * @param frames - settings for the sprite frames
     * @author Philip
     */
    constructor({position = {x: 0, y: 0}}, {spriteImages = {upp: "", down: "", right: "", left: "", death:""}}, frames = {max: 6, min: 0, hold: 6, cropOffsetX: 0, cropOffsetY: 0, scale: 1}){
        this.position = position
        this.sprite = new Image();
        this.spriteImages = spriteImages;

        this.spriteFrames = {
            max: frames.max, //the number of frames in the sprite
            min : frames.min, //the starting frame, typically 0
            current: 0, // current frame
            elapsedTime: 0, //how many frames have passed
            hold: frames.hold, // how many frames to hold each frame, made for fine-tuning the animation
            cropOffsetX: frames.cropOffsetX, // offset for the crop X
            cropOffsetY: frames.cropOffsetY, // offset for the crop Y
            scale: frames.scale // scale of the sprite
        };
    }



    /**
     * Changes the orientation of the sprite.
     * @param orientation - the orientation of the enemy sprite
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

            case 'death':
                this.sprite.src = this.spriteImages.death;
                break

            case 'unknown':
                break;

            default:
                console.log('Something went wrong when setting the orientation')
                break;
        }
    }

    /**
     * Draws the sprite on the canvas.
     * crops the sprite and holds the animation.
     * @param gameCtx - the game context
     * @param orientation - the orientation of the enemy sprite
     * @author Philip
     */
    drawSprite(gameCtx, orientation){
        this.changeSpriteOrientation(orientation);

        const cropWidth = this.sprite.width / this.spriteFrames.max;
        
        //crop the sprite
        const crop = {
            position: {
                x: cropWidth * this.spriteFrames.current + this.spriteFrames.cropOffsetX,
                y: this.spriteFrames.cropOffsetY
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
            crop.width * this.spriteFrames.scale,
            crop.height * this.spriteFrames.scale
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

    /*
    --- old code used for reference ---

    forceDraw(gameCtx, orientation){
        const cropWidth = this.sprite.width / this.spriteFrames.max;
        this.changeSpriteOrientation(orientation);
        this.spriteFrames.elapsedTime = 0;
        this.spriteFrames.current = 0

        while (run) {

            const crop = {
                position: {
                    x: cropWidth * this.spriteFrames.current + this.spriteFrames.cropOffsetX,
                    y: this.spriteFrames.cropOffsetY
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
                crop.width * this.spriteFrames.scale,
                crop.height * this.spriteFrames.scale
            );

            this.spriteFrames.elapsedTime++;
            if(this.spriteFrames.elapsedTime % this.spriteFrames.hold === 0){
                this.spriteFrames.current++;

                if (this.spriteFrames.current >= this.spriteFrames.max -1) {
                    run = false;
                    console.log("done")
                }
            }

        }
        return true;
    }

     */
}