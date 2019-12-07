
//for rocket2
function handleRocketMovement2() {
    if (ROCKET2.thrusting){
      ROCKET2.xacc = ROCKET2.power * Math.cos(ROCKET2.rot);
      ROCKET2.fuel -= 1;
      ROCKET2.yacc = -ROCKET2.power * Math.sin(ROCKET2.rot)+GAME.gravity;
  
    }
    else{
      ROCKET2.xacc = 0;
      ROCKET2.yacc = GAME.gravity;
    }
  
    if (ROCKET2.tipping){
      if (ROCKET2.rot < Math.PI/2 && ROCKET2.rot > 0){
        ROCKET2.rot -= Math.abs(ROCKET2.rotspeed);
      }
      else if (ROCKET2.rot > Math.PI/2 && ROCKET2.rot < Math.PI){
        ROCKET2.rot += Math.abs(ROCKET2.rotspeed);
      }
      else{
        ROCKET2.tipping = false;
      }
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
        die("PLAYER 2 had too much rotation",1);
        ROCKET2.tipping = true;
        ROCKET2.thrusting = false;
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
        die("PLAYER 2 had an excellent landing",1);
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