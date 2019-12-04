function initializeRockets(){
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  ROCKET1.x = (GAME.canvas.width-ROCKET1.width)/2;
  ROCKET1.y = (GAME.canvas.height-ROCKET1.height)/2;
  ROCKET1.xvel = 0;
  ROCKET1.xacc = 0;
  ROCKET1.yvel = 0;
  ROCKET1.yacc = 0;
  ROCKET1.rot = Math.PI/2;
  ROCKET1.tipping = false;

  ROCKET2.x = (GAME.canvas.width-ROCKET2.width)/2;
  ROCKET2.y = (GAME.canvas.height-ROCKET2.height)/2;
  ROCKET2.xvel = 0;
  ROCKET2.xacc = 0;
  ROCKET2.yvel = 0;
  ROCKET2.yacc = 0;
  ROCKET2.rot = Math.PI/2;
  ROCKET2.tipping = false;

  randomizePlatform();

}

//for rocket1
function handleRocketMovement() {
  if (ROCKET1.thrusting){
    ROCKET1.xacc = ROCKET1.power * Math.cos(ROCKET1.rot);
    ROCKET1.fuel -= 1;
  }
  else{
    ROCKET1.xacc = 0;
  }
  if (ROCKET1.thrusting){
    ROCKET1.yacc = -ROCKET1.power * Math.sin(ROCKET1.rot)+GAME.gravity;
  }
  else{
    ROCKET1.yacc = GAME.gravity;
  }
  ROCKET1.xvel+=ROCKET1.xacc;
  ROCKET1.yvel+=ROCKET1.yacc;
  ROCKET1.x += ROCKET1.xvel;
  ROCKET1.y += ROCKET1.yvel;
  if (ROCKET1.fuel == 0){
    GAME.death = "PLAYER 1 ran out of fuel";
    ROCKET1.thrusting = false;
    GAME.started = false;
    GAME.level = 5;
    if (scorePlayerOne > highScore){
      highScore = scorePlayerOne;
    }
    scorePlayerOne = 0;
    giveBackFuel();
  }

  if
    (checkCollidePlatform())
  {
    if (ROCKET1.rot<Math.PI/2-0.25 || ROCKET1.rot > Math.PI/2+0.25){
      GAME.death = "PLAYER 1 had too much rotation";
      ROCKET1.tipping = true;
      ROCKET1.thrusting = false;
      GAME.started = false;
      GAME.level = GAME.level/2;
      scorePlayerOne = 0;
    }
    else if(ROCKET1.yvel > 2 || Math.abs(ROCKET1.xvel) > 2){
      GAME.death = "PLAYER 1 had too much speed";
      ROCKET1.thrusting = false;
      GAME.started = false;
      GAME.level = GAME.level/2;
      scorePlayerOne = 0;
    }
    else{
      ROCKET1.y = PLATFORM.y-ROCKET1.height/4
      ROCKET1.yvel = 0;
      ROCKET1.xvel = 0;
      GAME.death = "PLAYER 1 had an excellent landing"
      GAME.started = false;
      GAME.level = GAME.level/2;
      scorePlayerOne = scorePlayerOne +1;
      if (scorePlayerOne>highScore){
        highScore = scorePlayerOne;
      }
      if (ROCKET1.rot < Math.PI/2 && ROCKET1.rot > 0){
        ROCKET1.rot += Math.abs(ROCKET1.rotspeed);
      }
      else if (ROCKET1.rot > Math.PI/2 && ROCKET1.rot < Math.PI){
        ROCKET1.rot -= Math.abs(ROCKET1.rotspeed);
      }
    }
  }
  if (ROCKET1.y - ROCKET1.height/2 <0){
    ROCKET1.y = ROCKET1.height/2;
    ROCKET1.yvel = 0;
  }
  if (ROCKET1.x > GAME.canvas.width - ROCKET1.width/2){
      ROCKET1.x = GAME.canvas.width-ROCKET1.width/2;
      ROCKET1.xvel = 0;
  }
  if (ROCKET1.x - ROCKET1.width/2 <0){
    ROCKET1.x = ROCKET1.width/2;
    ROCKET1.xvel = 0;
  }
  if (ROCKET1.rotating){
    ROCKET1.rot += ROCKET1.rotspeed;
    if (ROCKET1.rot > Math.PI){
      ROCKET1.rot = Math.PI;
    }
    if (ROCKET1.rot < 0){
      ROCKET1.rot = 0;
    }
  }
}

//for rocket2

function handleRocketMovement2() {
  if (ROCKET2.thrusting){
    ROCKET2.xacc = ROCKET2.power * Math.cos(ROCKET2.rot);
    ROCKET2.fuel -= 1;
  }
  else{
    ROCKET2.xacc = 0;
  }
  if (ROCKET2.thrusting){
    ROCKET2.yacc = -ROCKET2.power * Math.sin(ROCKET2.rot)+GAME.gravity;
  }
  else{
    ROCKET2.yacc = GAME.gravity;
  }
  ROCKET2.xvel+=ROCKET2.xacc;
  ROCKET2.yvel+=ROCKET2.yacc;
  ROCKET2.x += ROCKET2.xvel;
  ROCKET2.y += ROCKET2.yvel;
  if (ROCKET2.fuel == 0){
    GAME.death = "PLAYER 2 ran out of fuel";
    ROCKET2.thrusting = false;
    GAME.started = false;
    GAME.level = 5;
    if (scorePlayerTwo > highScore){
      highScore = scorePlayerTwo;
    }
    scorePlayerTwo = 0;
    giveBackFuel();
  }

  if
    (checkCollidePlatform2())
  {
    if (ROCKET2.rot<Math.PI/2-0.25 || ROCKET2.rot > Math.PI/2+0.25){
      GAME.death = "PLAYER 2 had too much rotation";
      ROCKET2.tipping = true;
      ROCKET2.thrusting = false;
      GAME.started = false;
      GAME.level = GAME.level/2;
      scorePlayerTwo = 0;
    }
    else if(ROCKET2.yvel > 2 || Math.abs(ROCKET2.xvel) > 2){
      GAME.death = "PLAYER 2 too much speed";
      ROCKET2.thrusting = false;
      GAME.started = false;
      GAME.level = GAME.level/2;
      scorePlayerTwo = 0;
    }
    else{
      ROCKET2.y = PLATFORM.y-ROCKET2.height/4
      ROCKET2.yvel = 0;
      ROCKET2.xvel = 0;
      GAME.death = "PLAYER 2 had an excellent landing"
      GAME.started = false;
      GAME.level = GAME.level/2;
      scorePlayerTwo = scorePlayerTwo +1;
      if (scorePlayerTwo>highScore){
        highScore = scorePlayerTwo;
      }
      if (ROCKET2.rot < Math.PI/2 && ROCKET2.rot > 0){
        ROCKET2.rot += Math.abs(ROCKET2.rotspeed);
      }
      else if (ROCKET2.rot > Math.PI/2 && ROCKET2.rot < Math.PI){
        ROCKET2.rot -= Math.abs(ROCKET2.rotspeed);
      }
    }
  }
  if (ROCKET2.y - ROCKET2.height/2 <0){
    ROCKET2.y = ROCKET2.height/2;
    ROCKET2.yvel = 0;
  }
  if (ROCKET2.x > GAME.canvas.width - ROCKET2.width/2){
      ROCKET2.x = GAME.canvas.width-ROCKET2.width/2;
      ROCKET2.xvel = 0;
  }
  if (ROCKET2.x - ROCKET2.width/2 <0){
    ROCKET2.x = ROCKET2.width/2;
    ROCKET2.xvel = 0;
  }
  if (ROCKET2.rotating){
    ROCKET2.rot += ROCKET2.rotspeed;
    if (ROCKET2.rot > Math.PI){
      ROCKET2.rot = Math.PI;
    }
    if (ROCKET2.rot < 0){
      ROCKET2.rot = 0;
    }
  }
}


function renderRockets(context) {
  var canvas = document.getElementById('canvas');
  if (GAME.started){
    handleRocketMovement();
  }
  var r1 = new Image();
  if (ROCKET1.thrusting){
    r1.src = 'Rocket Ship 1 Thrust.png';
    drawRotatedImage(context, r1, ROCKET1.x, ROCKET1.y, ROCKET1.width, ROCKET1.height, ROCKET1.rot);
  }
  else {
    r1.src = 'Rocket Ship 1.png';
    drawRotatedImage(context, r1, ROCKET1.x, ROCKET1.y, ROCKET1.width, ROCKET1.height, ROCKET1.rot);
  }
}
//for rocket2
function renderRockets2(context) {
  var canvas = document.getElementById('canvas');
  if (GAME.started){
    handleRocketMovement2();
  }
  var r2 = new Image();
  if (ROCKET2.thrusting){
    r2.src = 'Rocket Ship 2 Thrust.png';
    drawRotatedImage(context, r2, ROCKET2.x, ROCKET2.y, ROCKET2.width, ROCKET2.height, ROCKET2.rot);
  }
  else {
    r2.src = 'Rocket Ship 2.png';
    drawRotatedImage(context, r2, ROCKET2.x, ROCKET2.y, ROCKET2.width, ROCKET2.height, ROCKET2.rot);
  }
}
