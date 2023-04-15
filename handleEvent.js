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
// Delete initial screen button
document.getElementById('button').onclick = () => {
    theme.loop = true;
    theme.play();
    animate(); 
    button.remove();
    isReady = true;
};