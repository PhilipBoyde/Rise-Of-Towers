import {effectController} from "../controller/effectController.js";

export class smokeEffect extends effectController {
    constructor(position, ctx) {
        const imagePath = "../model/assets/effects/Smoke VFX 2.png"

        super(
            {position},
            imagePath, //Only used if a sprite sheet exist
            {images: { //Only used if multiple images are needed to create effect

            }},
            {imageSettings: {
                    imageType: true, //True = SpriteSheet, False = multiple images
                    max: 6, // the number of frames
                    min: 0, // the starting frame, typically 0
                    hold: 100, // how many frames to hold each frame, made for fine-tuning the animation
                    cropOffsetX: 0, // offset for the crop
                    cropOffsetY: 0, // offset for the crop
                    scale: 1, // scale for the sprite, 1 = normal size
            }},
            ctx
        );
    }
}