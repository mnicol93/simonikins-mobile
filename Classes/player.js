class Player extends Sprite{
    constructor({position, velocity, height, width, imageSrc, sprites}) {
        super({ position, imageSrc })
        //this.position = position;
        this.velocity = velocity;
        this.height = height;
        this.width = width
        // Creates an HTML image but within a JS property
        this.image = new Image();
        this.image.src = imageSrc;
        this.sprites = sprites; 

        for (const sprite in sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc; 
        }
    }
    update(){
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x -= this.velocity.x;
    }
}