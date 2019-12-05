/**
 * This document deals with all animations
*/

var scorePlayerOne = 0;
var scorePlayerTwo = 0
var highScore = 0;


//rotates an image
function drawRotatedImage(context, image, x, y, width, height, angle) {
	context.save();
	context.translate(x, y);
	context.rotate(Math.PI/2-angle);
	context.drawImage(image, -width/2, -height/2, width, height) ;
	context.restore();
}

//draws the rocket
function renderRocket(context) {
  if (GAME.started){

  }
  //if the rocket is thrusting, it shows the thrusting-rocket image
  //otherwise, the thrust beams are not present in the default image
  if (ROCKET1.thrusting){
    drawRotatedImage(context, r1Thrust, ROCKET1.x, ROCKET1.y, ROCKET1.width, ROCKET1.height, ROCKET1.rot);
  }
  else {
    drawRotatedImage(context, r1, ROCKET1.x, ROCKET1.y, ROCKET1.width, ROCKET1.height, ROCKET1.rot);
  }
}


//for rocket2
function renderRocket2(context) {
  if (GAME.started){

  }

  if (ROCKET2.thrusting){
    drawRotatedImage(context, r2Thrust, ROCKET2.x, ROCKET2.y, ROCKET2.width, ROCKET2.height, ROCKET2.rot);
  }
  else {
    drawRotatedImage(context, r2, ROCKET2.x, ROCKET2.y, ROCKET2.width, ROCKET2.height, ROCKET2.rot);
  }
}



//draws score
function renderCurrentScore(context){
  context.font = "30px Arial";
  context.fillStyle = "red";
  context.fillText("Score: " + scorePlayerOne, 60, 70);

}
//draws player 2 score (Multiplayer)
function renderCurrentScore2(context){
  context.font = "30px Arial";
  context.fillStyle = "red";
  context.fillText("P2 Score: " + scorePlayerTwo, 90, 100);
  context.fillText("P1 Score: " + scorePlayerOne, 90, 70);
}

function renderHighScore(context){
  context.font = "30px Arial";
  context.fillStyle = "red";
  context.fillText("High score: " + highScore, 800, 70);
}


var background = new Image();
background.src = 'Images/Space Background.png';
function renderBackground(context){
  context.drawImage(background, 0, 0, GAME.canvas.width, GAME.canvas.height);
}



//Hello


//EXPLOSION STUFF
var explosion = new Image();
explosion.src = "Images/explosion.png";
function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {

    //multiplayer extra rendering
    if (GAME.mode == 2){
			handleRocketMovement();
			handleRocketMovement2();
      renderBackground(context);
      renderRocket(context);
      renderRocket2(context);
      renderPlatform(context);
      renderFuel(context);
      renderCurrentScore(context);
      renderHighScore(context);

    }
    else{
			handleRocketMovement();
      //default rendering
      renderBackground(context);
      renderRocket(context);
      renderPlatform(context);
      renderFuel(context);
      renderCurrentScore(context);
      renderHighScore(context);
    }

  }
  else {
    //deals with rocket tipping
    if (ROCKET1.tipping){
      renderBackground(context);
      renderRocket(context);
    }
    else if (EXPLOSION.currentFrame < EXPLOSION.totalFrames * EXPLOSION.frameDuration){
      renderBackground(context);
      renderPlatform(context);
      EXPLOSION.currentFrame++;
    }
    else{
      renderBackground(context);
      context.font = "30px Arial";
      context.fillStyle = "red";
      context.textAlign = "center";
      context.fillText(GAME.death, GAME.canvas.width/2, 200);
      context.fillText("Press R to try again", GAME.canvas.width/2, 260);
      context.fillText("Press 1 for singleplayer", GAME.canvas.width/2, 320);
      context.fillText("Press 2 for multiplayer", GAME.canvas.width/2, 380);
    }
    if (CONTROLS.running){
      GAME.started = true;
    }
    else if (ROCKET2.tipping){
      renderBackground(context);
      renderRocket(context);
    }
    else if (EXPLOSION.currentFrame < EXPLOSION.totalFrames * EXPLOSION.frameDuration){

      renderBackground(context);
      renderPlatform(context);
      if (GAME.mode == 2){
        context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET2.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET2.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
        context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET1.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET1.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
      }
      else{
        context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET1.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET1.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
      }

      EXPLOSION.currentFrame++;
    }
    if (CONTROLS.running){
      GAME.started = true;
    }
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
