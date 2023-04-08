class Player{
    constructor({position, velocity, height, width}) {
        this.position = position;
        this.velocity = velocity;
        this.height = height;
        this.width = width
    }
    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x -= this.velocity.x;
    }
}