//sets up canvas
var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');

//called on load of HTMl
function Pause(){
  GAME.gravity = 0;
  var savedX = ROCKET1.xvel;
  var savedY = ROCKET1.yvel;
  ROCKET1.xvel=0;
  ROCKET1.yvel=0;
}



function Start() {
  giveBackFuel();
  initializeRockets();
  randomizePlatform();
}
