/**
 * THIS DOCUMENT deals with THE PLATFORM STUFF set up in config.js
*/

//Platform Image:
var platform = new Image();
platform.src = 'Images/platform.png';

//draws platform
function renderPlatform(context){
  context.drawImage(platform, PLATFORM.x, PLATFORM.y, PLATFORM.width, PLATFORM.height);
}

//never called
//seems to be broken
//used as a debugging tool?
function debugHitbox(context){
  context.beginPath();
  context.lineWidth = "6";
  context.strokeStyle = "red";
  context.rect(PLATFORM.x, PLATFORM.y, PLATFORM.width, PLATFORM.height);
  context.rect (ROCKET1.x, ROCKET1.y , ROCKET1.width, ROCKET1.height);
  context.stroke();
}

//initializes where the platform generates
//changes variables after original initialization in config.js
function randomizePlatform(){
  PLATFORM.x = Math.random ()*(GAME.canvas.width-200)+100;
  PLATFORM.y = Math.random ()*(GAME.canvas.height-300)+200;
  while (!PLATFORM.y +100 > GAME.canvas.height/2 && !GAME.canvas.height/2 > PLATFORM.y-100 &&
  !PLATFORM.x + 100 > GAME.canvas.width/2 && !GAME.canvas.width/2 > PLATFORM.x-100)
  {
    PLATFORM.y = PLATFORM.y+101;
  }
  PLATFORM.width = Math.random()*300 +100;
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