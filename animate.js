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
	renderTurtles(context);
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
  context.font = "30px Source Code Pro";
  context.fillStyle = "red";
  context.fillText("Score: " + scorePlayerOne, 60, 70);

}

//when the game is paused it will display so on the screen
function renderPaused(context){
	if(GAME.paused){
		context.font = "200px Tomorrow";
  	context.fillStyle = "red";
  	context.fillText("PAUSED", 520, 330);
		context.font = "75px Tomorrow";
		context.fillText("Click p key to resume", 520, 430);
	}
}

//draws player 2 score (Multiplayer)
function renderCurrentScore2(context){
  context.font = "30px Source Code Pro";
  context.fillStyle = "red";
  context.fillText("P2 Score: " + scorePlayerTwo, 90, 100);
  context.fillText("P1 Score: " + scorePlayerOne, 90, 70);
}

function renderHighScore(context){
  context.font = "30px Source Code Pro";
  context.fillStyle = "red";
  context.fillText("High score: " + highScore, 800, 70);
}


var background = new Image();
var background1 = new Image();
var background2 = new Image();
var background3 = new Image();
var background4 = new Image();
var background5 = new Image();
background.src = 'Images/Space Background.png';
background1.src = 'Images/background1.png';
background2.src = 'Images/background2.jpeg';
background3.src = 'Images/background3.png';
background4.src = 'Images/background4.png';
background5.src = 'Images/background5.jpeg';


function renderBackground(context){
	switch(GAME.background) {
		case 0:
		context.drawImage(background, 0, 0, GAME.canvas.width, GAME.canvas.height);
		break;
		case 1:
		context.drawImage(background1, 0, 0, GAME.canvas.width, GAME.canvas.height);
		break;
		case 2:
		context.drawImage(background2, 0, 0, GAME.canvas.width, GAME.canvas.height);
		break;
		case 3:
		context.drawImage(background3, 0, 0, GAME.canvas.width, GAME.canvas.height);
		break;
		case 4:
		context.drawImage(background4, 0, 0, GAME.canvas.width, GAME.canvas.height);
		break;
		case 5:
		context.drawImage(background5, 0, 0, GAME.canvas.width, GAME.canvas.height);
		break;
	}
}


//EXPLOSION STUFF
var explosion = new Image();
explosion.src = "Images/explosion.png";

//runs moving game
function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');


  //GAME.started is TRUE when game is running, gets triggered FALSE at death
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
      renderFuel2(context);
      renderCurrentScore(context);
      renderHighScore(context);
			InitializeFuelCans();
			RenderFuelCans(context);

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
			renderPaused(context);
			InitializeFuelCans();
			RenderFuelCans(context);
			handleFuelCansAnimation ();
    }

  }
  else {
    //WHEN R is pressed, CONTROLS.running is true
    if (CONTROLS.running){
      GAME.started = true;
    }
    else if (GAME.death!=0){
      advanceExplosion();
    }
    else if (GAME.death==0) {
      renderPostWinMessage();
    }
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);


function renderPostDeathMessage() {
  context.font = "30px Source Code Pro";
  context.fillStyle = "red";
  context.textAlign = "center";
  context.fillText(deathMessage(GAME.death), GAME.canvas.width/2, 320);
  context.fillText("Press R to try again", GAME.canvas.width/2, 380);
}

function renderPostWinMessage() {
  context.font = "30px Source Code Pro";
  context.fillStyle = "red";
  context.textAlign = "center";
  context.fillText("Congrats! You landed successfully.", GAME.canvas.width/2, 320);
  context.fillText("Press R to move on", GAME.canvas.width/2, 380);
}


function advanceExplosion(){
  if (EXPLOSION.currentFrame < EXPLOSION.totalFrames * EXPLOSION.frameDuration){

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
  else {
    renderBackground(context);
    renderPostDeathMessage();
  }
}
