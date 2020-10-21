var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup, invisibleGround
var  ground, stage, gameover;

var survivalTime = 0;
var score = 0;

function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameover = loadImage("download.jpg");
  
  
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
}



function setup() {
  createCanvas(800,350)
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  
  invisibleGround=createSprite(400,350,900,10); 

  invisibleGround.visible=true;
}


function draw() {
background("blue");
 // monkey.debug=true
  if(gameState===PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    survivalTime = survivalTime+Math.round(getFrameRate()/60);
    
    ground.velocityX = -(6 + 3*score/100);
    
    if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    monkey.collide(invisibleGround);
    food();
    obstacleg();
    
    if(monkey.isTouching(foodGroup)){
      score = score+2;
      foodGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstaclesGroup)){
      gameState = END
    }
  }else if(gameState===END){
    background(0)
     ground.velocityX = 0;
     ground.visible=false;
    monkey.velocityY = 0;
    monkey.visible=false;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    
  }
  drawSprites();
  fill("white");
  textSize(20);
text("score :" +score,500,50);
  fill("white");

text("Survival Time:" +survivalTime,100,50);
}








function food() {

  if(frameCount % 80 === 0){
  banana = createSprite(900,300,20,20)
  banana.y = Math.round(random(170,200)); 
    banana.velocityX=-3;
  banana.addImage(bananaImage)  
  banana.scale=0.1;
  banana.lifetime = 400;
    banana.depth = monkey.depth;
  monkey.depth = monkey.depth+1;
    foodGroup.add(banana);
  }
   
}

function obstacleg() {
  if(frameCount % 80===0){
    obstacle=createSprite(900,330,10,10);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX= -(6 + 3*score/100);
    obstacle.scale=0.2;
    obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  
 monkey.changeAnimation("running",monkey_running);
  
  
 
  
  score = 0;
  
}

