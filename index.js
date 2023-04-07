// TODO: Detect if user is on mobile or computer
//    If mobile = 480x320; browser = 1024x576

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// TODO: OOP
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
        //this.velocity.y += gravity;
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if((this.position.y + this.height) >= canvas.height)
            this.velocity.y = 0;
        else this.velocity.y += gravity;
    }
}
//////////////////////////////////////////////////////

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    }
});

const enemy = new Sprite({
    position: {
        x: 400,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    }
});
// Object holding all the keys used by the player to manipulate in @animate() function
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
// Holds the value of the last key pressed by user to control movement
let lastKey;

// TODO: OOP
function animate(){
    // This function will repeat in loop thanks to this line
    window.requestAnimationFrame(animate);
    // Clear canvas prior to drawing new position
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height);
    // Draw the players on screen
    player.update();
    enemy.update();

    if(keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -1;
    } 
    else if(keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 1;
    }
    else player.velocity.x = 0;
}
///////////////////////////////////////////////////
animate();

// Add event listener for moving
// TODO: Change by touch for mobile
// TODO: OOP
window.addEventListener('keydown', (event)=>{
    switch(event.key){
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
});
// Event listener for when key is released
window.addEventListener('keyup', (event)=>{
    switch(event.key){
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});
//////////////////////////////////////////////