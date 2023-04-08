// TODO: Detect if user is on mobile or computer
//    If mobile = 480x320; browser = 1024x576
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const enemyHeight = 75;

let city = new Image();
city.src = 'CIUDAD2.png';
let cityLength = 0;
let scrollSpeed = -1.2;

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
        x: -370,
        y: 0
    },
    height: canvas.height,
    width: canvas.width,
    imageSrc: 'cielako.png'
});
// // Used to make an infinite loop effect
// const backGround2 = new Sprite({
//     position: {
//         x: 0,
//         y: 75
//     },
//     height: canvas.height,
//     width: canvas.width,
//     imageSrc: 'CIUDAD.png'
// });

const player = new Player({
    position: {
        x: 150,
        y: 150
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    height: 120,
    width: 50
});

const enemy = [new Player({
    position: {
        x: 400,
        y: 40
    }, 
    velocity: {
        x: 1,
        y: 0
    },
    height: enemyHeight,
    width: 50
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
// Holds the value of the last key pressed by user to control movement
let lastKey;

// TODO: OOP Utils
function animate(){
    // This function will repeat in loop thanks to this line
    window.requestAnimationFrame(animate);
    // Clear canvas prior to drawing new position
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height);

    // Draw the sky background
    backGround.update();

    scrollCity();
    
    // Draw the players on screen
    player.update();
    enemy.forEach(enem => {
        enem.update();
        //Detect collision
        if(enem.position.x < 200 && enem.position.x > 98){
            // TODO: Utils OOP
            if(
                player.position.y == enem.position.y + enem.height ||
                (player.position.y >= enem.position.y && 
                 player.position.y <= (enem.position.y + enem.height)) ||
                (player.position.y <= enem.position.y &&
                 (player.position.y + player.height) >= (enem.position.y + enem.height)) ||
                player.position.y + player.height == enem.position.y ||
                (player.position.y + player.height >= enem.position.y && 
                 (player.position.y + player.height) <= (enem.position.y + enem.height))
            ){
                console.log('COLISION');
                gameOver();
            }
            //////////////////////////////////////////////////
        }
    });  
    if(collisionFound) player.velocity.y = 0;
    else if(keys.w.pressed && lastKey === 'w'){
        player.position.y < 0 ? 
            player.velocity.y = 0 : player.velocity.y = -4;
    } 
    else if(keys.s.pressed && lastKey === 's'){
        (player.position.y + player.height) >= canvas.height ?
            player.velocity.y = 0 : player.velocity.y = 4;
    }
    else player.velocity.y = 0;

}
///////////////////////////////////////////////////
// TODO: OOP Utils
function scrollCity(){
    // Draw the city moving
    c.drawImage(city,cityLength, 203);
    // Second image for infinite background effect
    c.drawImage(city, cityLength + canvas.width , 203);
    
    cityLength += scrollSpeed;
    if(cityLength <= -canvas.width){
        console.log(cityLength);
        console.log(canvas.width);
        cityLength = 0;
    }
}
//////////////////////////////////////////////////

animate();

// Add event listener for moving
// TODO: Change by touch for mobile
// TODO: OOP

window.addEventListener('keydown', (event)=>{
    switch(event.key){
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
    }
});
// Event listener for when key is released
window.addEventListener('keyup', (event)=>{
    switch(event.key){
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
    }
});
/////////////////////////////////////////////////

// TODO: OOP
function enemySpawner(){
    setInterval(()=>{
        let enemyY = (Math.random() * canvas.height) - enemyHeight;
        if(enemyY < 0) enemyY = 0;
        
        if(!collisionFound){
            enemy[enemyCounter++] = new Player({
                position:{
                    x: 600,
                    y: enemyY
                },
                velocity: {
                    x: 1,
                    y: 0
                },
                height: 75,
                width: 50
            });
    }}, spawn);
    if (spawn > 1500) spawn -= 50;
    }
/////////////////////////////////////////////////
enemySpawner();

// TODO: UTILS
function gameOver(){
    collisionFound = true;
    player.velocity.y = 0;
    scrollSpeed = 0;
    enemy.forEach(e => {
        e.velocity.x = 0;
    });

    let goDiv = document.getElementById('game-over');

    goDiv.style.height = canvas.height;
    goDiv.style.width = canvas.width;

    goDiv.innerText = 'Te has muerto XD';
    goDiv.style.color = 'white';
}
//////////////////////////////////////////////