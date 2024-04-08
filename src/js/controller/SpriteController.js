/**
 * ToDo:
 * 1. make the sprite controller class take multiple sprite sheets, one for each direction
 * 2. make the sprite controller class take a direction parameter and use it to determine which sprite sheet to use
 * 3. add delay for every enemy. So the enemies are not synced
 */

export class SpriteController {
    constructor({position = {x: 0, y: 0}}, imagePath, frames = {max: 6, min: 0}){
        this.position = position;
        this.sprite = new Image();

        let defaultImagePath = Array.isArray(imagePath) ? imagePath[0] : imagePath;


        this.sprite.src = defaultImagePath;



        this.spriteFrames = {
            max: frames.max, //the number of frames in the sprite
            min : frames.min, //the starting frame, typically 0
            current: 0, // current frame
            elapsedTime: 0, //how many frames have passed
            hold: 6 // how many frames to hold each frame
        };
    }

    updateImagePath(index) {
        if (index >= 0 && index < this.imagePaths.length) {
            this.sprite.src = this.imagePaths[index];
            this.currentImagePathIndex = index;
        }
    }


    drawSprite(gameCtx){
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