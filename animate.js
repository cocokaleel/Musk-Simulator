
function renderRockets(context) {
  var canvas = document.getElementById('canvas');
  handleRocketMovement();
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
function drawRotatedImage(context, image, x, y, width, height, angle) {
	context.save();
	context.translate(x, y);
	context.rotate(Math.PI/2-angle);
	context.drawImage(image, -width/2, -height/2, width, height) ;
	context.restore();
}
function initializeRockets(){
  ROCKET1.x = (GAME.canvas.width-ROCKET1.width)/2;
  ROCKET1.y = (GAME.canvas.height-ROCKET1.height)/2;
  ROCKET1.xvel = 0;
  ROCKET1.xacc = 0;
  ROCKET1.yvel = 0;
  ROCKET1.yacc = 0;
  ROCKET1.rot = Math.PI/2;
}
function handleRocketMovement() {
  if (ROCKET1.thrusting){
    ROCKET1.xacc = ROCKET1.power * Math.cos(ROCKET1.rot);
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
  if (ROCKET1.y > GAME.canvas.height-ROCKET1.height/4 ){
    if (ROCKET1.rot<Math.PI/2-0.5 || ROCKET1.rot > Math.PI/2+0.5){
      GAME.death = "Too much rotation";
      GAME.started = false;
    }
    else if(ROCKET1.yvel > 4){
      GAME.death = "Too much speed";
      GAME.started = false;
    }
    else{
      ROCKET1.y = GAME.canvas.height-ROCKET1.height/4;
      ROCKET1.yvel = 0;
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
function renderBackground(context){
  var canvas = document.getElementById('canvas');
  var background = new Image();
  background.src = 'Space Background.png';
  context.drawImage(background, 0, 0, GAME.canvas.width, GAME.canvas.height);
}
function sprite(options) {
    var that = {};
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0;
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.loop = options.loop;
    that.numnerOfFrames = options.numberOfFrames;
    that.x = options.x;
    that.y = options.y;
    that.render = function () {
      that.context.drawImage(that.image,frameIndex * that.width / that.numberOfFrames,that.width / that.numberOfFrames,that.width,that.height,that.x,that.y,that.width / that.numberOfFrames,that.height);
    };
    that.update = function () {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
          tickCount = 0;
          if (frameIndex < that.numberOfFrames - 1) {
            frameIndex++;
          }
          else if (that.loop) {
              frameIndex = 0;
          }
        }
    };
    return that;
}
function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {
    renderBackground(context);
    renderRockets(context);
  } else {
    context.font = "30px Arial";
    if (GAME.score > document.cookie){
      document.cookie = GAME.score;
    }
    var explosionImg = new Image();
    explosionImg.src = 'explosion.png';
    var explosion =  sprite({
        context : canvas.getContext("2d"),
        width : 5382,
        height : 189,
        image : explosionImg,
        loop : false,
        numberOfFrames : 21,
        x : ROCKET1.X,
        y : ROCKET1.y
    });
    explosion.render();
    explosion.update();
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("Game Over: " + GAME.death, GAME.canvas.width/2, 200);
    context.fillText("Press R to try again", GAME.canvas.width/2, 260);

    if (CONTROLS.running){
      GAME.started = true;
    }
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
