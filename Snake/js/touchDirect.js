let startingX , startingY , movingX , movingY;
document.addEventListener("touchstart", touchStart);
document.addEventListener("touchmove", touchMove);
document.addEventListener("touchend", touchEnd);
    
function touchStart(evt){
    startingX = evt.touches[0].clientX ;
    startingY = evt.touches[0].clientY ;
}

function touchMove(evt){
    movingX = evt.touches[0].clientX ;
    movingY = evt.touches[0].clientY ;
}
    
function touchEnd(){
    if(startingX+100 < movingX && dir != "left"){
        dir = "right";
    } else if(startingX-100 > movingX && dir != "right"){
        dir ="left";
}
    if(startingY+100 < movingY && dir != "up"){
        dir = "down";
    } else if(startingY-100 > movingY && dir != "down"){
        dir = "up";
    }
}