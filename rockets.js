




//Rocket Images:
var r1Thrust = new Image();
r1Thrust.src = 'Images/Rocket Ship 1 Thrust.png';
var r1 = new Image();
r1.src = 'Images/Rocket Ship 1.png';
var r2Thrust = new Image();
r2Thrust.src = 'Images/Rocket Ship 2 Thrust.png';
var r2 = new Image();
r2.src = 'Images/Rocket Ship 2.png';





//intializes rockets like config.js
//resets movement and position variables
//useful for level sequencing
function initializeRockets(){
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

  //resets platform spot
  randomizePlatform();
}
function renderTurtles(context){
  for(var i = 0; i < turtles.length; i++) {context.drawImage(spr_turtle,turtles[i].x,turtles[i].y,140,110);}
}
//for rocket1
function handleRocketMovement() {
  collideTurtle();
  //if rocket is tp
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
  }
  animateTurtles();

  //if rocket is thrusting, it accelerates x and y components in the direction of rotation
  if (ROCKET1.thrusting){
    ROCKET1.yacc = -ROCKET1.power * Math.sin(ROCKET1.rot)+GAME.gravity;
    ROCKET1.xacc = ROCKET1.power * Math.cos(ROCKET1.rot);
    ROCKET1.fuel -= 1;
  }
  else{
    ROCKET1.xacc = 0;
    ROCKET1.yacc = GAME.gravity;
  }

  //changes xy velocities based on acceleration (handles acceleration)
  ROCKET1.xvel+=ROCKET1.xacc;
  ROCKET1.yvel+=ROCKET1.yacc;
  ROCKET1.x += ROCKET1.xvel;
  ROCKET1.y += ROCKET1.yvel;

  //handles main rocket running out of fuel
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



  if(checkCollidePlatform())
  {
    handleDeath1();
  }
  else if(ROCKET1.y>GAME.canvas.height+200) {
    handleDeath1();
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
    rotate1();
  }
}

function rotate1() {
  ROCKET1.rot += ROCKET1.rotspeed;
  if (ROCKET1.rot > Math.PI){
    ROCKET1.rot = Math.PI;
  }
  if (ROCKET1.rot < 0){
    ROCKET1.rot = 0;
  }
}

function handleDeath1() {
  if(ROCKET1.y>GAME.canvas.height+200) {
    GAME.death = "GAME OVER: PLAYER 1 was sucked into a black hole!";
    //ROCKET1.tipping = true;
    ROCKET1.thrusting = false;
    GAME.started = false;
    GAME.level = GAME.level/2;
    scorePlayerOne = 0;
    GAME.deathQual=1;
  }
  else if (ROCKET1.rot<Math.PI/2-0.25 || ROCKET1.rot > Math.PI/2+0.25){
    GAME.death = "GAME OVER: PLAYER 1 had too much rotation";
    //ROCKET1.tipping = true;
    ROCKET1.thrusting = false;
    GAME.started = false;
    GAME.level = GAME.level/2;
    scorePlayerOne = 0;
    GAME.deathQual=1;
  }
  else if(ROCKET1.yvel > 2 || Math.abs(ROCKET1.xvel) > 2){
    GAME.death = "GAME OVER: PLAYER 1 had too much speed";
    ROCKET1.thrusting = false;
    GAME.started = false;
    GAME.level = GAME.level/2;
    scorePlayerOne = 0;
    GAME.deathQual=1;
  }
  else{
    ROCKET1.y = PLATFORM.y-ROCKET1.height/4
    ROCKET1.yvel = 0;
    ROCKET1.xvel = 0;
    GAME.death = "PLAYER 1 had an excellent landing"
    GAME.deathQual = 0;
    GAME.started = false;
    GAME.level = GAME.level++;
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
var turtles = []; var soap = new Audio(); soap.src="Audio/soundeffect_test.mp3";var turtleTimer=40; var spr_turtle = new Image(); spr_turtle.src="Images/space_turtle copy.png";


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

function giveBackFuel(){
  ROCKET1.fuel = 500;
  ROCKET2.fuel = 500;
}

//Draws fuel
function renderFuel(context){
  context.fillStyle="rgb(173, 44, 44)";
  context.fillRect(10,100,30,ROCKET1.fuel);
}

//rocket2
function renderFuel2(context){
  context.fillStyle="rgb(0, 94, 255)";
  context.fillRect(50,100,30,ROCKET2.fuel);
}







































































function Turtle() {this.x=0;this.y=Math.random()*GAME.canvas.height;}
function addTurtle(){turtles.push(new Turtle());}
function animateTurtles(){if(CONTROLS.start){
  if(turtleTimer==0) {addTurtle();turtleTimer=20;}  else{turtleTimer--;}
  for(var i = 0; i < turtles.length; i++) {turtles[i].x+=10;}
}}
function collideTurtle() {
  for(var i = 0 ; i < turtles.length; i++) {
    if(Math.pow(ROCKET1.x-turtles[i].x,2)+Math.pow(ROCKET1.y-turtles[i].y,2)<=1400) {
      if(Math.random()<.3) {
        r1.src="Images/Rocket Ship 2.png"; r1Thrust.src="Images/Rocket Ship 2 Thrust.png";
      }
      else if(Math.random()<.4) {
        r1.src="Images/Rocket Ship 1.png"; r1Thrust.src="Images/Rocket Ship 1 Thrust.png";
      }
      else if(Math.random()<.6) {
        r1.src="Images/swirl.png"; r1Thrust.src="Images/swirl.png";
      }
      else {
          r1.src="Images/space_turtle copy.png"; r1Thrust.src="Images/space_turtle copy.png";
      }
    }
  }

}
