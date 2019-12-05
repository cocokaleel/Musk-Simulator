//sets up canvas
var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');

//called on load of HTMl
function Start() {
  giveBackFuel();
  initializeRockets();
  randomizePlatform();
}
