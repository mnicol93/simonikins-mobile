// TODO: Detect if user is on mobile or computer
//    If mobile = 480x320; browser = 1024x576
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const enemyHeight = 75;
const theme = new Audio("tema.wav");
const deathSound = new Audio("muerte.wav");
const deathImage = new Image();
deathImage.src = 'enfermo1.png';
// Image holding the city
var city = new Image();
city.src = 'CIUDAD2.png';
var cityLength = 0;
var scrollSpeed = -0.9;
// Holds the value of the last key pressed by user to control movement
var lastKey;
// Periodicity for enemies to spawn
var spawn = 2500;
var enemyCounter = 1;
var collisionFound = false;
// False until initial button is pressed
var isReady = false;
// TODO: Change for mobile
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
    imageSrc: 'rapero1.png',
    sprites: {
        iddle: {
            imageSrc: 'rapero1.png'
        },
        dead: {
            imageSrc: 'enfermo1.png'
        }
    }
});
// TODO: position.x = canvas.width,
const enemy = [new Player({
    position: {
        x: 350,
        y: 40
    }, 
    velocity: {
        x: 1.1,
        y: 0
    },
    height: enemyHeight,
    width: 30,
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
// Create initial screen, when press play call animate
// document.querySelector('button').addEventListener('click', function() {
//     theme.loop = true;
//     theme.play();
//     animate();
//     isReady = true;
//   });

// TODO: Change by touch for mobile
enemySpawner();