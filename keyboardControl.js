var CONTROLS = {
  running : false,
  student : {
    jumping : false
  }

};

//sets up keyboard controls
document.addEventListener('keydown', function(event) {
  switch (event.key) {
    //w key makes rocket thrust
    case "w": ROCKET1.thrusting = true;
    break;
    
    //a key turns on rotating variable and makes the rotation direction positive.
    case "a":
    if (ROCKET1.y < GAME.canvas.height-ROCKET1.height/4 ){
      ROCKET1.rotating = true;
      ROCKET1.rotspeed = Math.abs(ROCKET1.rotspeed);
    }
    break;
    
    //d key turns on rotating variable and makes the rotation direction negative.
    case "d":
    if (ROCKET1.y < GAME.canvas.height-ROCKET1.height/4 ){
      ROCKET1.rotating = true;
      ROCKET1.rotspeed = -Math.abs(ROCKET1.rotspeed);
    }
    break;

    //r key "resets" game
    case "r":
    if (!GAME.started){
      initializeRockets();
      EXPLOSION.currentFrame = 0;
      GAME.started = true;
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

    default:
    break;
  }
});

//undoes 'on' modes when buttons aren't pressed
document.addEventListener('keyup', function(event) {
  switch (event.key) {
  case "w": ROCKET1.thrusting = false;
  break;
  case "a": ROCKET1.rotating = false;
  break;
  case "d": ROCKET1.rotating = false;
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
