import {SpriteController } from '../controller/SpriteController.js';
class SpriteTowerController {

    constructor({position = {x: 0, y: 0}, imageSrc, frames = {max: 1}}) {
        this.position = position;
        this.image = new Image();
        this.imageSrc = imageSrc;
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            hold: 3

        };
        this.spriteController = new SpriteController({position: this.position}, {spriteImages: {upp: '', down: '', right: '', left: ''}}, this.frames);
        this.image.src = this.imageSrc;
    }



    draw() {
        const cropWidth = this.image.width / this.frames.max
        const crop = {
            position: {
                x: cropWidth * this.frames.current,
                y: 0
            },
            width: cropWidth,
            height: this.image.height
        }
        c.drawImage(
            this.image =

            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.position.x,
            this.position.y,
            crop.width,
            crop.height
        )
        this.frames.elapsed++
        if (this.frames.elapsed % 5 === 0) {
            this.frame.current++
            if (this.frames.current >= this.frames.max - 1) {
                this.frames.current = 0;
            }
        }
    }

    forceDraw(orientation) {
        const cropWidth = this.image.width / this.frames.max;
        this.frames.elapsed = 0;
        this.frames.current = 0;
        while (true){
            if (this.frames.current === orientation){
                break;
            }
            this.frames.current++;
        }
    }
/*
    changeSpriteOrientation(orientation) {
        {spriteImages: { //Sprite images for the wolf enemy
            up: '../js/model/assets/EnemySprites/Wolf/U_Walk.png',
                down: '../js/model/assets/EnemySprites/Wolf/D_Walk.png',
                right: '../js/model/assets/EnemySprites/Wolf/R_Walk.png',
                left: '../js/model/assets/EnemySprites/Wolf/L_Walk.png'
        }}
    }
    
 */




}

