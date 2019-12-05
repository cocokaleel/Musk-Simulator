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
  PLATFORM.x = Math.random ()*(GAME.canvas.width-50);
  PLATFORM.y = Math.random()*(GAME.canvas.height-50);
  PLATFORM.width = Math.random()*400 +50*GAME.level;
  PLATFORM.height = 100;
}
