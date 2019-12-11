var turtles = []; var soap = new Audio(); soap.src="Audio/soundeffect_test.mp3";var turtleTimer=40; var spr_turtle = new Image(); spr_turtle.src="Images/space_turtle copy.png";
var overrideImages=false; var stoutcount=0;

function Turtle() {this.x=0;this.y=Math.random()*GAME.canvas.height; this.presentTimer=Math.floor(Math.random()*50)+5;}
function addTurtle(){turtles.push(new Turtle());}
function animateTurtles(){if(CONTROLS.start){
  if(turtleTimer==0) {addTurtle();turtleTimer=10+Math.floor(Math.random()*25);}  else{turtleTimer--;}
  for(var i = 0; i < turtles.length; i++) {
    turtles[i].x+=10;
    turtles[i].presentTimer--;
    if(turtles[i].presentTimer<=0) {
      turtles[i].presentTimer=Math.floor(Math.random()*50)+2;
      addPresent(turtles[i].x,turtles[i].y);
    }
    if(turtles[i].x>GAME.canvas.width) {
      turtles.splice(i,1);
      i--;
    }
  }
  animatePresents();
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

function renderTurtles(context){
  for(var i = 0; i < turtles.length; i++) {context.drawImage(spr_turtle,turtles[i].x,turtles[i].y,140,110);}
  renderPresents(context);
}

var presents = [];
var spr_present = new Image(); spr_present.src="Images/present.png";
function Present(x,y) {
  this.x=x;
  this.y=y;
  this.yspeed=8;
}

function addPresent(x,y) {
  presents.push(new Present(x,y));
}

function animatePresents() {
  for(var p = 0; p < presents.length; p++) {
    presents[p].yspeed-=0.2;
    presents[p].y-=presents[p].yspeed;
    if(presents[p].y>GAME.canvas.height) {presents.splice(p,1);p--;}
  }
}

function renderPresents(context) {
  for(var p = 0; p < presents.length; p++) {context.drawImage(spr_present, presents[p].x,presents[p].y,90,90);}
}

function overrideAllImages() {
  overrideImages=true;
  spr_turtle.src="Images/sample.png";
  spr_present.src="Images/sample.png";
  spr_blackhole.src="Images/sample.png";
  spr_asteroid.src="Images/sample.png";
  r1.src="Images/sample.png";
  r2.src="Images/sample.png";
  r1Thrust.src="Images/sample.png";
  r2Thrust.src="Images/sample.png";
  platform.src="Images/sample.png";
  fuelCanPic.src="Images/sample.png";
  GAME.background.num=0;
  background.src="Images/sample.png";
}
