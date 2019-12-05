var scorePlayerOne = 0;
var scorePlayerTwo = 0
var highScore = 0;



function drawRotatedImage(context, image, x, y, width, height, angle) {
	context.save();
	context.translate(x, y);
	context.rotate(Math.PI/2-angle);
	context.drawImage(image, -width/2, -height/2, width, height) ;
	context.restore();
}




function renderCurrentScore(context){
  context.font = "30px Arial";
  context.fillStyle = "red";
  context.fillText("Score: " + scorePlayerOne, 60, 70);

}
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





var explosion = new Image();
explosion.src = "Images/explosion.png";
function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {

    if (GAME.mode == 1){
			renderBackground(context);
      renderRockets(context);
      renderPlatform(context);
      renderFuel(context);
      renderCurrentScore(context);
      renderHighScore(context);

    }
    else if(GAME.mode==2){
			renderBackground(context);
      renderRockets(context);
      renderRockets2(context);
      renderPlatform(context);
      renderFuel(context);
      renderFuel2(context);
      renderCurrentScore2(context);
      renderHighScore(context);
    }

  }
  else {
    if (ROCKET1.tipping){
      if (ROCKET1.rot < Math.PI/2 && ROCKET1.rot > 0){
        ROCKET1.rot -= Math.abs(ROCKET1.rotspeed);
      }
      else if (ROCKET1.rot > Math.PI/2 && ROCKET1.rot < Math.PI){
        ROCKET1.rot += Math.abs(ROCKET1.rotspeed);
      }
      else{
        ROCKET1.tipping = false;
      }
      renderBackground(context);
      renderRockets(context);
    }
    else if (EXPLOSION.currentFrame < EXPLOSION.totalFrames * EXPLOSION.frameDuration){
      renderBackground(context);
      renderPlatform(context);
      //context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET1.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET1.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
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
      if (ROCKET2.rot < Math.PI/2 && ROCKET2.rot > 0){
        ROCKET2.rot -= Math.abs(ROCKET2.rotspeed);
      }
      else if (ROCKET2.rot > Math.PI/2 && ROCKET2.rot < Math.PI){
        ROCKET2.rot += Math.abs(ROCKET2.rotspeed);
      }
      else{
        ROCKET2.tipping = false;
      }
      renderBackground(context);
      renderRockets(context);
    }
    else if (EXPLOSION.currentFrame < EXPLOSION.totalFrames * EXPLOSION.frameDuration){

      renderBackground(context);
      renderPlatform(context);
      if (GAME.mode == 2){
        context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET2.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET2.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
        context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET1.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET1.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
      }
      else{
        //context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET2.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET2.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
        context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET1.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET1.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
      }

      EXPLOSION.currentFrame++;
    }
    // else{
    //   renderBackground(context);
    //   context.font = "30px Arial";
    //   context.fillStyle = "red";
    //   context.textAlign = "center";
    //   context.fillText("Game Over: " + GAME.death, GAME.canvas.width/2, 200);
    //   context.fillText("Press R to try again", GAME.canvas.width/2, 260);
    // }
    if (CONTROLS.running){
      GAME.started = true;
			giveBackFuel();
			CONTROLS.running=false;
    }
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
