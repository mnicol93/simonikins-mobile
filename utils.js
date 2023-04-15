var animation;
var death = false;
var enemySpeed = 1;
// Handles main animation
function animate(){
    // This function will repeat in loop thanks to this line
    animation = window.requestAnimationFrame(animate);
    // Must check right after request animation so it can cancel if gameover
    if(death) gameOver();
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
        if(enem.position.x < 200 && enem.position.x > 125){
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
                console.log(player.position.y+ ' - ' + player.height + ' : ' + enem.position.y + ' - ' + enem.height)
                player.image.src = 'enfermo1.png';
                death = true;
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
        (player.position.y + player.height + 30) >= canvas.height ?
            player.velocity.y = 0 : player.velocity.y = 4;
    }
    else player.velocity.y = 0;

}
// Will spawn enemies as specified by variable spawn
function enemySpawner(){
    setInterval(()=>{
        var enemyY = (Math.random() * canvas.height) - enemyHeight;
        if(enemyY < 0) enemyY = 0;
        // TODO: Change position.x value by variable to adapt for mobile
        if(!collisionFound && isReady){
            enemy[enemyCounter++] = new Player({
                position:{
                    x: canvas.width,
                    y: enemyY
                },
                velocity: {
                    x: enemySpeed,
                    y: 0
                },
                height: enemyHeight,
                width: 50,
                imageSrc: 'rata12.png'
            });
        if (spawn > 500) spawn -= 50;
        //if(enemySpeed < 2) enemySpeed += 0.1;
    }}, spawn);
    
    }
// Handles game over screen
function gameOver(){
    window.cancelAnimationFrame(animation);
    theme.pause();
    deathSound.play();
    collisionFound = true;
    player.velocity.y = 0;
    scrollSpeed = 0;
    enemy.forEach(e => {
        e.velocity.x = 0;
    });

    var containerDiv = document.getElementById('container');
    containerDiv.insertAdjacentHTML(
        'afterbegin',
        '<div id="game-over"></div>');
    
    var goDiv = document.getElementById('game-over');
    //goDiv.style.height = canvas.height;
    //goDiv.style.width = canvas.width;

    goDiv.innerText = 'Te has muerto tio XD';
    goDiv.style.color = 'white';

}
// Infinite background scrolling
function scrollCity(){
    // Draw the city moving
    c.drawImage(city,cityLength, 203);
    // Second image for infinite background effect
    c.drawImage(city, cityLength + canvas.width , 203);
    
    cityLength += scrollSpeed;
    if(cityLength <= -canvas.width){
        cityLength = 0;
    }
}
