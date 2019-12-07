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
  if(fuelCanAddTimer==0){
    addfuelCan(Math.random()*(GAME.canvas.width -20), Math.random()*(GAME.canvas.height -20));
    fuelCanAddTimer=400;
    console.log("poop");
  }
  fuelCanAddTimer--;

  for (var i = 0; i<GAME.fuelCan.length; i++){
   if(GAME.fuelCan[i].x < (ROCKET1.x+75) && GAME.fuelCan[i].x > (ROCKET1.x-20) && GAME.fuelCan[i].y > (ROCKET1.y -100) && GAME.fuelCan[i].y < (ROCKET1.y +50))
   {
     GAME.fuelCan.splice(i,1);

   }
 }
}
}

function RenderFuelCans(context){
  context.fillStyle='blue';
  console.log(GAME.fuelCan.length)

  for (var i = 0; i<GAME.fuelCan.length;i++)
  {
    context.fillStyle='blue';
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
