//Platform Image:
var platform = new Image();
platform.src = 'Images/platform.png';


function renderPlatform(context){
  context.drawImage(platform, PLATFORM.x, PLATFORM.y, PLATFORM.width, PLATFORM.height);
}


function debugHitbox(context){
  context.beginPath();
  context.lineWidth = "6";
  context.strokeStyle = "red";
  context.rect(PLATFORM.x, PLATFORM.y, PLATFORM.width, PLATFORM.height);
  context.rect (ROCKET1.x, ROCKET1.y , ROCKET1.width, ROCKET1.height);
  context.stroke();
}


function randomizePlatform(){
  PLATFORM.x = Math.random ()*(GAME.canvas.width-50);
  PLATFORM.y = Math.random()*(GAME.canvas.height-50);
  PLATFORM.width = Math.random()*400 +50*GAME.level;
  PLATFORM.height = 100;
}


//rocket1
function checkCollidePlatform(){
  if (ROCKET1.x < PLATFORM.x + PLATFORM.width +39 && ROCKET1.x + ROCKET1.width  > PLATFORM.x +39 &&
  ROCKET1.y < PLATFORM.y + PLATFORM.height +107 && ROCKET1.y + ROCKET1.height > PLATFORM.y+107) {
    return true;
}
return false;
}
//ROCKET2
function checkCollidePlatform2(){
  if (ROCKET2.x < PLATFORM.x + PLATFORM.width +39 && ROCKET2.x + ROCKET2.width  > PLATFORM.x +39 &&
  ROCKET2.y < PLATFORM.y + PLATFORM.height +107 && ROCKET2.y + ROCKET2.height > PLATFORM.y+107) {
    return true;
}
return false;
}
