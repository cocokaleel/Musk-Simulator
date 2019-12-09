//sets up baseline game mechanics variables
var GAME = {
  canvas : {
    width : 1000,
    height : 600
  },
  started : true,
  gravity : 0.05,
  death : "",
  deathQual : 1, //2 means obstacle impact, 1 means explosion, 0 means good landing
  level : 0,
  score : 0,
  highScore : 0,
  mode : 1,
  savedXVel : 0,
  savedyVel : 0,
  paused : false,
  fuelCan : [],
  obstacles : [],
  levelSelect: false,
  music : false,
  background : 0
};

//sets up initial values and variables for main rocket
//used in single player and multiplayer
var ROCKET1 = {
  x : 0,
  y : 0,
  width : 60,
  height : 120,
  thrusting : false,
  xvel : 0,
  xacc : 0,
  yvel : 0,
  yacc : 0,
  rot : Math.PI/2, //initial angle of rocket
  rotating : false, //checked in rockets.js
  rotspeed : 0.02, //a FIXED VALUE - the rocket is rotated by multiplying this variable by -1
  power : 0.3,
  tipping : false, //used to determine death
  fuel : 500 //decreases with thrust
};

//sets up initial values and variables for secondary rocket
//used in MULTIPLAYER ONLY
var ROCKET2 = {
  x : 0,
  y : 0,
  width : 80,
  height : 120,
  thrusting : false,
  xvel : 0,
  xacc : 0,
  yvel : 0,
  yacc : 0,
  rot : Math.PI/2,
  rotating : false,
  rotspeed : Math.PI/70,
  power : 0.3,
  fuel : 500,

};

//sets up explosion animation variables
var EXPLOSION = {
  currentFrame : 0,
  totalFrames : 23,
  frameDuration : 5,
  width : 5382,
  height : 189,
  size : []
};

//sets up platform VARIABLES
//platform randomized in rockets.js
var PLATFORM = {
  x : 0,
  y : 0,
  width : 0,
  height : 0
};
