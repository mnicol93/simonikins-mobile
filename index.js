// TODO: Detect if user is on mobile or computer
//    If mobile = 480x320; browser = 1024x576
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// TODO: OOP
class Sprite{
    constructor({position, velocity, height}) {
        this.position = position;
        this.velocity = velocity;
        this.height = height;
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }
    update(){
        this.draw();
        
        this.position.y += this.velocity.y;
        //this.position.x += this.velocity.x;
        if((this.position.y + this.height) >= canvas.height || 
                this.position.y == 0)
            this.velocity.y = 0;   
    }
}
//////////////////////////////////////////////////////

const player = new Sprite({
    position: {
        x: 150,
        y: 150
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    height: 120
});

const enemy = new Sprite({
    position: {
        x: 400,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    height: 75
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

    if(keys.a.pressed && lastKey === 'w'){
        player.velocity.y = -4;
    } 
    else if(keys.d.pressed && lastKey === 's'){
        player.velocity.y = 4;
    }
    else player.velocity.y = 0;
}
///////////////////////////////////////////////////
animate();

// Add event listener for moving
// TODO: Change by touch for mobile
// TODO: OOP
window.addEventListener('keydown', (event)=>{
    switch(event.key){
        case 'w':
            keys.a.pressed = true;
            lastKey = 'w';
            break;
        case 's':
            keys.d.pressed = true;
            lastKey = 's';
            break;
    }
});
// Event listener for when key is released
window.addEventListener('keyup', (event)=>{
    switch(event.key){
        case 'w':
            keys.a.pressed = false;
            break;
        case 's':
            keys.d.pressed = false;
            break;
    }
});
/////////////////////////////////////////////////

// TODO: OOP
function enemySpawner(){

}

/////////////////////////////////////////////////
