//começar criando as variaveis.

var rex;

var rexrunning;

var rexdie;

var ground;

var groundpic;

var invisibleGround;

var cloud;

var cloudpic;

var obstaclePic1

var obstaclePic2

var obstaclePic3

var obstaclePic4

var obstaclePic5

var obstaclePic6

var obstacleGroup

var cloudGroup

var PLAY = 1;

var END = 0;

var gameState = PLAY  

var score = 0

var spriteGameOver

var spriteGameOverPic

var spriteRestart

var spriteRestartPic

function preload () {  //funçao para carregar os arquivos de imagem .png

rexrunning = loadAnimation ("trex1.png","trex3.png","trex4.png");

rexdie = loadImage ("trex_collided.png");

groundpic = loadImage ("ground2.png");

cloudpic = loadImage ("cloud.png");

obstaclePic1 = loadImage ("obstacle1.png");

obstaclePic2 = loadImage ("obstacle2.png");

obstaclePic3  = loadImage ("obstacle3.png");

obstaclePic4 = loadImage ("obstacle4.png");

obstaclePic5 = loadImage ("obstacle5.png");

obstaclePic6 = loadImage ("obstacle6.png");

spriteGameOverPic = loadImage ("gameOver.png")

spriteRestartPic = loadImage ("restart.png")

}


function setup() {
  createCanvas(600, 200);
  rex = createSprite (50,180,20,50);
  rex.addAnimation ("running",rexrunning); //adicionar animação rex correndo.
  rex.addAnimation("rexdying",rexdie); //adicionar animação do rex morrendo. 
  rex.scale = 0.5; //definir tamanho do rex
  
  rex.setCollider ("circle",0,0,40); //adicionar circulo verde ao redor do rex, esse circulo será a area de colisão(contato). 
  rex.debug = false; //deixar esse circulo verde invisivel, para aparecer so o dinossauro, sem circulo nenhum.
  
ground = createSprite (200,180,400,20);
ground.addAnimation ("ground",groundpic);
 
obstacleGroup = new Group ();
cloudGroup = new Group ();

spriteGameOver = createSprite (300,100,10,10);
spriteGameOver.addAnimation ("gameover",spriteGameOverPic);
spriteGameOver.scale = 0.7;

spriteRestart = createSprite (300,140,10,10);
spriteRestart.addAnimation ("restart",spriteRestartPic);
spriteRestart.scale = 0.5;

invisibleGround = createSprite (200,190,400,10); //chao invisivel para fazer o dinossauro ficar encima do sprite ground certinho.
invisibleGround.visible = false // deixar variavel invisivel
}

function draw() {
  background("lightgray") //cor do fundo selecionada a partir de r,g,b (red, green, blue) varia de 0-255 cada uma ou apenas escrever o nome da cor entre aspas.
  rex.collide (invisibleGround); //fazer o rex encostar com o "chao invisivel" para ele ficar encima do sprite ground certinho.
  textSize(15) //tamanho do texto
  text("score: "+score,30,30); //texto que deve ser exibido + pontuação, X , Y


  if (gameState === PLAY) { //se o estado de jogo for play, ou seja, quando o dinossauro esta vivo.
      ground.velocityX = -8; //velocidade do chao indo para esquerda, simulando o movimento do dinossauro.
      
      spawnClouds(); //função para spawnar nuvens (criada la embaixo do codigo)
      spawnObstacles(); //função para spawnar obstaculos (criada la embaixo do codigo) 
  
       score=score + Math.round (getFrameRate()/60); //codigo para fazer a pontuação subir progressivamente, usando o frame rate, /60 para o numero nao ficar muito grande
      
        if (ground.x<0) { //pedir professora para ajudar com comentario
        ground.x = ground.width/2; //pedir professora para ajudar com comentario
            }
        if (keyDown("space") && rex.y >= 155 ) { //se a tecla espaço estiver pressionada e a localização Y do rex for maior ou igual a 155: consequencia abaixo
        rex.velocityY = -11; //pedir professora para ajudar com comentario
              } 
        rex.velocityY=rex.velocityY + 0.8; //pedir professora para ajudar com comentario
        
        if (obstacleGroup.isTouching(rex)) { //se o grupo de obstaculos encostar no rex, transformar o estado de jogo em end, ou seja, acabar
        gameState = END;   
              }
  spriteGameOver.visible = false; // var.visible = false faz com que a variavel não apareça em determinado estado de jogo.                            
  spriteRestart.visible = false;
}

  if (gameState === END) { //se o estado de jogo for end, ou seja, quando o dinossauro morre, fim do jogo.
       ground.velocityX = 0; //velocidade do chão = 0 (essa velocidade do chao q da ideia de movimeneto do dinossauro) deixar o dinossauro parado.
       score = 0; // mudar a pontuação para 0.
       
       cloudGroup.setVelocityXEach(0); //mudar a velocidade do grupo das nuvens para 0.
       
       obstacleGroup.setVelocityXEach(0);  //mudar a velocidade do grupo dos obstaculos para 0.
       
       rex.changeAnimation("rexdying",rexdie); //mudar a animação do rexrunning para rexdie, ou seja, animação do rex morto.
       rex.velocityY = 0;
       
       spriteRestart.visible = true; //deixar o sprite do texto "restart" visivel, pois o jogo "acabou".
       spriteGameOver.visible = true; //deixar o sprite do texto "gameOver" visivel, pois o jogo "acabou".
       
       cloudGroup.setLifetimeEach(-1); //lifetime das nuvens -1 para quando o jogo acabar as nuvens nao sumirem.
       obstacleGroup.setLifetimeEach(-1); //lifetime dos obstaculos -1 para quando o jogo acabar os obstaculos nao sumirem.
}      
drawSprites();

} 
function spawnClouds() { //função para spawnar nuvens
  if (frameCount % 60 === 0) { //cada vez que o frame count dividido por 60 tiver resto 0, ou seja de 60 em 60 frames: consequencia abaixo.
    cloud = createSprite (600,50,40,10); //crias sprite da nuvem, X, Y, largura, altura.
     cloud.velocityX = -6; //definir a velocidade da nuvem, numero negativo pois esta indo para esquerda.
      cloud.addAnimation ("cloud", cloudpic); //adicionando animação das nuvens, cloudpic foi definida la na function preload.
      cloud.y = Math.round(random(50,100)); //codigo para gerar as nuvens de forma aleatoria na posição Y.

      cloudGroup.add(cloud); //criando grupo de nuvens, adicionado a variavel cloud. 

      cloud.depth = rex.depth; //pedir professora para ajudar com comentario
      rex.depth = rex.depth + 1;//pedir professora para ajudar com comentario
      
      cloud.lifetime=108; //lifetime das nuvens para quando elas sairem da area do canvas elas desapareçam, deixando o jogo menos pesado.
  } 
}
function spawnObstacles() { //função para criar obstaculos.
if (frameCount % 60 === 0) { //cada vez que o frame count dividido por 60 tiver resto 0, ou seja de 60 em 60 frames: consequencia abaixo.
  var obstacleSprite = createSprite (400,165,10,40); //criar sprite do obstaculo, X, Y, largura, altura.
       obstacleSprite.velocityX = -8; //definir a velocidade do obstaculo, negativo pois esta indo pra esquerda, na mesma velocidade que o chão.
        obstacleSprite.scale = 0.5; //definir o tamanho do obstaculo
         obstacleSprite.lifetime=55; //lifetime dos sprites para quando eles sairem da area do canvas eles desapareçam, deixando o jogo menos pesado.

         obstacleGroup.add(obstacleSprite); //criando grupo dos obstaculos adicionando a variavel do obstaculo.

         var randomObstacle = Math.round(random(1,6)); //pedir ajuda da professora para o comentario
         switch (randomObstacle) {
        
        case 1: obstacleSprite.addImage(obstaclePic1);
               break;
        case 2: obstacleSprite.addImage(obstaclePic2);
               break;
        case 3: obstacleSprite.addImage(obstaclePic3);
               break;
        case 4: obstacleSprite.addImage(obstaclePic4);
               break;
        case 5: obstacleSprite.addImage(obstaclePic5);
               break;
        case 6: obstacleSprite.addImage(obstaclePic6);
               break;
        default:break;
 }
  }
   }

// linha 121, 124, 126, 
//        182 a 197


