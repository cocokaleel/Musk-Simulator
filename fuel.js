var fuelCanPic = new Image();
fuelCanPic.src='Images/oilCanPic.png';



function addfuelCan (x,y)
{
  GAME.fuelCan.push(new fuelCan(x,y));
}

function fuelCan (x,y){
  this.x = x;
  this.y = y;
}

var fuelCanAddTimer=100;

function handleFuelCansAnimation (){

if (GAME.paused==false){
  if(fuelCanAddTimer==0 && GAME.fuelCan.length == 0){
    addfuelCan(Math.random()*(GAME.canvas.width -20), Math.random()*(GAME.canvas.height -20));
    fuelCanAddTimer=400;
    console.log("poop");
  }
  if(GAME.fuelCan.length == 0){
  fuelCanAddTimer--;}

  for (var i = 0; i<GAME.fuelCan.length; i++){
   //if(GAME.fuelCan[i].x < (ROCKET1.x+75) && GAME.fuelCan[i].x > (ROCKET1.x-20) && GAME.fuelCan[i].y > (ROCKET1.y -100) && GAME.fuelCan[i].y < (ROCKET1.y +50))
   if(GAME.fuelCan[i].x + 80 > ROCKET1.x && GAME.fuelCan[i].x < ROCKET1.x + ROCKET1.width && GAME.fuelCan[i].y + 110 > ROCKET1.y && GAME.fuelCan[i].y < ROCKET1.y + ROCKET1.height - 80)
   {
     GAME.fuelCan.splice(i,1);
     giveBackFuel();
   }
 }
}
}

function RenderFuelCans(context){
  context.fillStyle='blue';

  for (var i = 0; i<GAME.fuelCan.length;i++)
  {
    //context.fillRect(GAME.fuelCan[i].x,GAME.fuelCan[i].y,20,20);
    context.drawImage(fuelCanPic,GAME.fuelCan[i].x,GAME.fuelCan[i].y,60,60);
  }
}

function InitializeFuelCans() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1,1);
  /*
  for (var i = 0; i<GAME.fuelCan.length; i++){
       GAME.fuelCan.splice(i,1);
       i--;
   }
   */

}


//Draws fuel
function renderFuel(context){
  if(overrideImages) {
    context.drawImage(spr_turtle,10,20, 30, ROCKET1.fuel+60);
    return;
  }

  context.fillStyle="white";
  context.fillRect(10,20,30,30)
  context.fillStyle="rgb(173, 44, 44)";
  context.fillRect(10,50,30,ROCKET1.fuel);
  context.fillStyle="white";
  context.fillRect(10,50+ROCKET1.fuel,30,30);
}

function shiftFuelCans(dx,dy) {
  if (GAME.fuelCan.length>0) {
    for (var i=0; i<GAME.fuelCan.length; i++) {
      GAME.fuelCan[i].x-=dx;
      GAME.fuelCan[i].y-=dy;
    }
  }
}
