// TODO: Detect if user is on mobile or computer
//    If mobile = 480x320; browser = 1024x576
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const enemyHeight = 75;
// Image holding the city
let city = new Image();
city.src = 'CIUDAD2.png';
let cityLength = 0;
let scrollSpeed = -0.9;
// Holds the value of the last key pressed by user to control movement
let lastKey;
// Periodicity for enemies to spawn
let spawn = 3500;
let enemyCounter = 1;
let collisionFound = false;

canvas.width = 1024;
canvas.height = 576;

//c.fillRect(0, 0, canvas.width, canvas.height);
// Start Classes declaration
const backGround = new Sprite({
    position: {
        x: -350,
        y: 0
    },
    height: canvas.height,
    width: canvas.width,
    imageSrc: 'cielako.png'
});
const player = new Player({
    position: {
        x: 150,
        y: 150
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    height: 160,
    width: 50,
    imageSrc: 'rapero1.png'
});

const enemy = [new Player({
    position: {
        x: 400,
        y: 40
    }, 
    velocity: {
        x: 1.1,
        y: 0
    },
    height: enemyHeight,
    width: 50,
    imageSrc: 'rata12.png'
})];
// End Classes Declaration

// Object holding all the keys used by the player to manipulate in @animate() function
const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    }
}
animate();
// TODO: Change by touch for mobile
enemySpawner();