var rex;

var rexrunning;

var rexdie;

var ground;

var groundpic;

var invisibleGround;

function preload () { 
rexrunning = loadAnimation ("trex1.png","trex3.png","trex4.png");

rexdie = loadImage ("trex_collided.png");

groundpic = loadImage ("ground2.png");
}



function setup() {
  createCanvas(600, 200);
  rex = createSprite (50,180,20,50);
  rex.addAnimation ("running",rexrunning);
  rex.scale = 0.5;
ground = createSprite (200,180,400,20);
ground.addAnimation ("ground",groundpic);
 
invisibleGround = createSprite (200,190,400,10);
invisibleGround.visible = false // deixar variavel invisivel
}

function draw() {
  background(220);
  rex.collide (invisibleGround);
  ground.velocityX = -8;

  if (keyDown("space") && rex.y >= 145 ) {
  rex.velocityY = -8;
  } 
  if (ground.x<0) {
    ground.x = ground.width/2;
  }
console.log(rex.y);

rex.velocityY=rex.velocityY + 0.8


  drawSprites();
}
