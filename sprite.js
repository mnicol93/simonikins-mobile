const gravity = 0.2;

class Sprite{
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    }
    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }
    update(){
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if((this.position.y + this.height) >= canvas.height)
            this.velocity.y = 0;
        else this.velocity.y += gravity;
    }
}

module.exports = {Sprite};