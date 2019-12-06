var CONTROLS = {
  running : false,
  student : {
    jumping : false
  },
  spaceCount : 0,
  start : false
};

//sets up keyboard controls
document.addEventListener('keydown', function(event) {
  switch (event.key) {
    //w key makes rocket thrust
    case "w":
    if(GAME.paused == false) ROCKET1.thrusting = true;
    break;

    //a key turns on rotating variable and makes the rotation direction positive.
    case "a":
    if (ROCKET1.y < GAME.canvas.height-ROCKET1.height/4 && (GAME.paused == false)){
      ROCKET1.rotating = true;
      ROCKET1.rotspeed = Math.abs(ROCKET1.rotspeed);
    }
    break;

    //d key turns on rotating variable and makes the rotation direction negative.
    case "d":
    if (ROCKET1.y < GAME.canvas.height-ROCKET1.height/4 && (GAME.paused == false)){
      ROCKET1.rotating = true;
      ROCKET1.rotspeed = -Math.abs(ROCKET1.rotspeed);
    }
    break;

    case "p":
    CONTROLS.spaceCount++;
    if(CONTROLS.spaceCount == 1)
    {
      Pause();
    }
    else {
      Resume();
      CONTROLS.spaceCount = 0;
    }
    break;

    //r key "resets" game
    case "r":
    if (!GAME.started){
      initializeRockets();
      EXPLOSION.currentFrame = 0;
      GAME.started = true;
      giveBackFuel();
    }
    break;

    //1 key switches game mode?? doesn't currently do anything
    case '1':
    if (!GAME.started){
      initializeRockets();
      EXPLOSION.currentFrame = 0;
      GAME.started = true;
      GAME.mode = 1;
    }
    break;

    //2 key starts multiplayer mode
    case '2':
    if (!GAME.started){
      initializeRockets();
      EXPLOSION.currentFrame = 0;
      GAME.started = true;
      GAME.mode = 2;
    }
    break;
    case '=':
    CONTROLS.start=true; soap.play();
    break;
    default:
    break;
  }
});

//undoes 'on' modes when buttons aren't pressed
document.addEventListener('keyup', function(event) {
  switch (event.key) {
  case "w":
  ROCKET1.thrusting = false;
  break;
  case "a":
  if(GAME.paused == false) ROCKET1.rotating = false;
  break;
  case "d":
  if(GAME.paused == false) ROCKET1.rotating = false;
  break;
  default:
  break;
  }
});

// from here its for rocket2 (MULTIPLAYER)

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "i":
      ROCKET2.thrusting = true;
      break;
      case "j":
      if (ROCKET2.y < GAME.canvas.height-ROCKET2.height/4 ){
        ROCKET2.rotating = true;
        ROCKET2.rotspeed = Math.abs(ROCKET2.rotspeed);
      }
        break;
        case "l":
        if (ROCKET2.y < GAME.canvas.height-ROCKET2.height/4 ){
          ROCKET2.rotating = true;
          ROCKET2.rotspeed = -Math.abs(ROCKET2.rotspeed);
        }
          break;
          case "r":
            if (!GAME.started){
              initializeRockets();
              EXPLOSION.currentFrame = 0;
              GAME.started = true;
              giveBackFuel();
            }
            break;
    default:
      break;
  }
});


document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "i":
      ROCKET2.thrusting = false;
      break;
      case "j":
        ROCKET2.rotating = false;
        break;
        case "l":
          ROCKET2.rotating = false;
          break;
    default:
      break;
  }
});
