var space_song = new Audio(); space_song.src="Audio/relaxing_space_song.mp3"; var songstart=false;

var CONTROLS = {
  running : false,
  student : {
    jumping : false
  },
  spaceCount : 0,
  start : false
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//sets up keyboard controls
document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "m" :
      if(!GAME.music){
        space_song.play();
        GAME.music=true;
      }
      else {
        space_song.pause();
        GAME.music=false;
      }
    break;

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
      manageObstacles();
      EXPLOSION.currentFrame = 0;
      GAME.started = true;
      GAME.background.num = getRandomInt(6);
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
    /*
    case '2':
    if (!GAME.started){
      initializeRockets();
      EXPLOSION.currentFrame = 0;
      GAME.started = true;
      GAME.mode = 2;
    }
    break;
    */

    //Extras
    case 's':
    if(!CONTROLS.start){CONTROLS.start=true; soap.play(); space_song.pause();}
    else{CONTROLS.start=false; soap.pause();}
    break;
    case '0':
    if(stoutcount==4){overrideAllImages();}
    break;
    case '4':
    if(stoutcount==2){stoutcount++;}
    break;
    case '6':
    if(stoutcount==0){stoutcount++;}
    break;
    case '2':
    if(stoutcount==3){stoutcount++;}
    break;
    case '9':
    if(stoutcount==1){stoutcount++;}
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