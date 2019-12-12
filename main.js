//sets up canvas
var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');

//called on load of HTMl
function Pause(){
  GAME.paused = true;
  GAME.gravity = 0;
  ROCKET1.thrusting=false;
  ROCKET1.rotating=false;
  GAME.savedXVel = ROCKET1.xvel;
  GAME.savedYVel = ROCKET1.yvel;
  ROCKET1.xvel=0;
  ROCKET1.yvel=0;
}

function Resume(){
  GAME.paused = false;
  GAME.gravity = 0.1;
  ROCKET1.xvel = GAME.savedXVel;
  ROCKET1.yvel = GAME.savedYVel;
}

function Start() {
  giveBackFuel();
  initializeRockets();
}

window.setInterval(addObstacle(asteroid),1000);