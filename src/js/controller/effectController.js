
export class effectController {
    constructor(position = {x:0, y:0}, imageSrc, imagePath, imageSettings, ctx) {
        this.position = position; //Position of the effect
        this.image = new Image();
        this.imageSettings = imageSettings; //holds settings like amount of frames, how long it should hold etc
        this.ctx = ctx; //The canvas it should be drawn on

        if (imageSettings.imageType){
            this.image.src = imageSrc;
        }else{
            this.imagePath = imagePath;
        }

        this.current = 0; // current frame
        this.elapsedTime = 0; //how many frames have passed
    }

    drawEffect(){
        const cropWidth = this.image.width / this.imageSettings.max;

        //crop the image
        const crop = {
            position: {
                x: cropWidth * this.current + this.imageSettings.cropOffsetX,
                y: this.imageSettings.cropOffsetY
            },

            width: cropWidth,
            height:  this.image.height
        };


        this.ctx.drawImage(
            this.image,
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.position.x,
            this.position.y,
            crop.width * this.imageSettings.scale,
            crop.height * this.imageSettings.scale
        );


        //hold animation
        this.elapsedTime++;
        if(this.elapsedTime % this.imageSettings.hold === 0){
            this.current++;
            console.log("frame")

            if (this.current >= this.imageSettings.max -1) {
                console.log("done")
                return true;
            }
        }
        requestAnimationFrame( () => this.drawEffect());
    }
}