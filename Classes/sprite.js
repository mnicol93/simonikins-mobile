class Sprite{
    constructor({position, height, width, imageSrc}) {
        this.position = position;
        this.height = height;
        this.width = width;
        // Creates an HTML image but within a JS property
        this.bgImage = new Image();
        this.bgImage.src = imageSrc;
    }
    draw(){
        c.drawImage(this.bgImage, this.position.x, this.position.y);
    }
    update(){
        this.draw();
    }
}