var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var Gameover,GameoverIMG;
var restart,restartIMG;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  GameoverIMG = loadImage("gameOver.png");
  restartIMG = loadImage("restart.png");                        
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  Gameover = createSprite(300,100);
  Gameover.addImage(GameoverIMG);
  Gameover.scale = 0.5;
  Gameover.visible = false;
  
  restart = createSprite(300,140);
  restart.addImage(restartIMG);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background(20);
  
  
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
     if(keyDown("space") && trex.y >= 149) {
      trex.velocityY = -10;
     }
    
    trex.velocityY = trex.velocityY + 0.6;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
      }
    
      spawnClouds();
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(trex)){
        gameState = END;
     }
    
  } else if(gameState === END){
    Gameover.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    score = 0;
    
     if(mousePressedOver(restart)) {
    reset();
  }
    
  }  

  trex.collide(invisibleGround); 
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
        
    obstacle.scale = 0.5;
    
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
  
}

function reset(){
  gameState = PLAY;
  
  Gameover.visible = false;
  restart.visible = false;
  ground.velocityX = -4;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  count = 0;
  
}
