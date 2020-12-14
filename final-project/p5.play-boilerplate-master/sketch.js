var monkey,monkeyimg,monkeywin,monkeywinimg;
var bg;
var bananaimg,banana;
var invisibleGround;
var riverimg,movingRiver;
var CrocGroup,LogGroup1,LogGroup2,LogGroup3,LogGroup4,LogGroup5,LogGroup6,LogGroup7,LogGroup8,LogGroup9,twigGroup;
var score=0;
var check;
var gameState;
var dummy;
function preload(){
  monkeyimg = loadImage("monkey.png");
  monkeywinimg = loadImage("monkey2.png");
  bg = loadImage("a.png");
  riverimg = loadImage("r.png");
  bananaimg = loadImage("banana.png");
  crocodile = loadImage("croc.png");
  log1 = loadImage("1.png");
  log2 = loadImage("2.png");
  log3 = loadImage("3.png");
  twigt = loadImage("4.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  movingRiver = createSprite(width-500,height-275,width*10000,height-175);
  movingRiver.addImage(riverimg);
  movingRiver.velocityX=-5;
  movingRiver.scale=1.55;

  invisibleGround=createSprite(width/2,height-590,width,5);
  invisibleGround.visible=false;
   
  dummy=0;
  if(movingRiver.x < 750){
    movingRiver.x=movingRiver.width/1.5;
  }
  monkey = createSprite(width-750,height-600,20,20);
  monkey.addImage(monkeyimg);
  monkeywin = createSprite(width-700,height-80,20,20);
  monkeywin.addImage(monkeywinimg);
  monkeywin.scale=0.45;
  monkeywin.visible=false;
  banana = createSprite(width-750,height-80,20,20);
  banana.addImage(bananaimg);
  banana.scale=0.30;
  monkey.scale=0.45;
  monkey.setCollider("rectangle",0,20,350,250);
  monkey.debug=true;
  check=0;
  gameState="wait";
  crocGroup = new Group();
  logGroup1 = new Group();
  logGroup2 = new Group();
  logGroup3 = new Group();
  logGroup4 = new Group();
  logGroup5 = new Group();
  logGroup6 = new Group();
  logGroup7 = new Group();
  logGroup8 = new Group();
  logGroup9 = new Group();
  twigGroup = new Group();
}

function draw() {
  background(bg);  
  
  if(movingRiver.x < 500){
    movingRiver.x=movingRiver.width/1.5;
  }
  if(keyDown("space") && check===1){
    gameState="play";
  }
  if(keyWentDown(DOWN_ARROW) && gameState==="play" && check===1){
    monkey.velocityY=-2
    invisibleGround.y+=20;
  }
  
  monkey.velocityY+=0.8;
  if(keyDown(RIGHT_ARROW) && check===1 && gameState==="play"){
    monkey.velocityY=-2
    invisibleGround.y+=20;
    monkey.x += 50;

  }
    monkey.velocityY+=0.8;
    if(keyDown(LEFT_ARROW) && check===1 && gameState==="play"){
      monkey.velocityY=-2
      invisibleGround.y+=20;
      monkey.x -= 50;
  
    }
      monkey.velocityY+=0.8;


  spawnCroc();
  spawnLog1();
  spawnLog2();
  spawnLog3();
  spawnLog4();
  spawnLog5();
  spawnLog6();
  spawnLog7();
  spawnLog8();
  spawnLog9();
  spawnTwig();

  if(monkey.isTouching(crocGroup)){
    crocGroup.destroyEach;
    monkey.y=height-600;
  }
  if(monkey.isTouching(twigGroup)){
    twigGroup.destroyEach;
    monkey.y=height-600;
  }
  if(monkey.isTouching(logGroup1)){
    score+=10;
    monkey.collide(logGroup1);
  }
  if(monkey.isTouching(logGroup2)){
    score+=15;
    monkey.collide(logGroup2);
  }
  if(monkey.isTouching(logGroup3)){
    score+=20;
    monkey.collide(logGroup3);
  }  
  if(monkey.isTouching(logGroup4)){
    score+=10;
    monkey.collide(logGroup4);
  }
  if(monkey.isTouching(logGroup5)){
    score+=15;
    monkey.collide(logGroup5);
  }
  if(monkey.isTouching(logGroup6)){
    score+=20;
    monkey.collide(logGroup6);
  }
  if(monkey.isTouching(logGroup7)){
    score+=10;
    monkey.collide(logGroup7);
  }
  if(monkey.isTouching(logGroup8)){
    score+=15;
    monkey.collide(logGroup8);
  }
  if(monkey.isTouching(logGroup9)){
    score+=20;
    monkey.collide(logGroup9);
  }

  console.log(invisibleGround.y);
 
  fill("white");
  textSize(30);
  text("score:" +score,width-125,20);
  monkey.collide(invisibleGround)
  drawSprites();
  var time = 10 - World.seconds;
  
  if (time > 0 && gameState==="wait") { 
    textSize(100);
     text(time,width/2,height/2 );
     textSize(30);
     textFont("bradley hand ITC");
     text(" Navigate using LEFT and RIGHT",width/20,height/14);
     text("arrow keys and SPACE to move down",width/20,height/9);
    } 
  else if(gameState==="wait" && time===0) {
    textSize(100);
    textFont("bradley hand ITC");  
     text("press space to START", width/2-400,height/2); 
     check = 1;
    }

  if(monkey.isTouching(banana) && gameState==="play"){
    console.log("Banana")
  dummy=1;
  gameState="end";

  }
  if(monkey.y > 880 && monkey.isTouching(banana)===false && gameState==="play"){
    
  dummy=2;
 
  gameState="end";
  }
  
if(gameState==="end" && dummy===1){
  fill("white");
  textFont("Broadway");  
  textSize(100);
  text("Got you",width/2-100,height/2);
  textSize(75);
  text("score "+score,width/2-100,height/2+100);
  monkey.visible=false;
  monkeywin.visible=true;
  monkey.velocityY=0;
  monkey.velocityX=0;
}
if(gameState==="end" && dummy===2){
  fill("white");
  textFont("Broadway");  
  textSize(100);
  text("Too bad",width/2-100,height/2);
  monkey.velocityY=0;
  monkey.velocityX=0;
}
  
}

function spawnCroc(){
  if(frameCount % 200===0){
    var croc = createSprite(width,random(height-475,height-145),10,10);
    croc.addImage(crocodile);
    croc.velocityX = -10;
    croc.scale=0.5;
    croc.lifetime=width/10;
    crocGroup.add(croc);
    croc.setCollider("rectangle",0,0,450,275);

  }
}
function spawnTwig(){
  if(frameCount % 150===0){
    var twig = createSprite(width,random(height-475,height-145),10,10);
    twig.addImage(twigt);
    twig.velocityX = -10;
    twig.scale=0.5;
    twig.lifetime=width/10;
    twigGroup.add(twig);

  }
}
function spawnLog1(){
  if(frameCount % 50===0){
    var l1 = createSprite(width,height-430,10,10);
    l1.addImage(log1);
    l1.velocityX = -10;
    l1.scale=0.5;
    l1.lifetime=width/10;
    logGroup1.add(l1);
    monkey.depth=l1.depth+1;
    l1.setCollider("rectangle",0,20,100,50);
    crocGroup.setDepthEach(l1.depth+1);
    l1.debug=true;

  }
}
function spawnLog2(){
  if(frameCount % 150===0){
    var l2 = createSprite(width,height-430,10,10);
    l2.addImage(log2);
    l2.velocityX = -20;
    l2.scale=0.5;
    l2.lifetime=width/10;
    logGroup1.add(l2);
    monkey.depth=l2.depth+1;
    l2.setCollider("rectangle",0,20,300,65);
    crocGroup.setDepthEach(l2.depth+1);
    l2.debug=true;
  }
}
function spawnLog3(){
  if(frameCount % 125===0){
    var l3 = createSprite(width,height-430,10,10);
    l3.addImage(log3);
    l3.velocityX = -15;
    l3.scale=0.5;
    l3.lifetime=width/10;
    logGroup1.add(l3);
    monkey.depth=l3.depth+1;
    l3.setCollider("rectangle",0,20,300,65);
    crocGroup.setDepthEach(l3.depth+1);
    l3.debug=true;
  }
}
function spawnLog4(){
  if(frameCount % 100===0){
    var l4 = createSprite(width,height-330,10,10);
    l4.addImage(log1);
    l4.velocityX = -15;
    l4.scale=0.5;
    l4.lifetime=width/10;
    logGroup1.add(l4);
    monkey.depth=l4.depth+1;
    l4.setCollider("rectangle",0,20,100,50);
    crocGroup.setDepthEach(l4.depth+1);
    l4.debug=true;
  }
}


function spawnLog5(){
  if(frameCount % 50===0){
    var l5 = createSprite(width,height-330,10,10);
    l5.addImage(log2);
    l5.velocityX = -20;
    l5.scale=0.5;
    l5.lifetime=width/10;
    logGroup1.add(l5);
    monkey.depth=l5.depth+1;
    l5.setCollider("rectangle",0,20,300,65);
    crocGroup.setDepthEach(l5.depth+1);
    l5.debug=true;
  }
}


function spawnLog6(){
  if(frameCount % 125===0){
    var l6 = createSprite(width,height-330,10,10);
    l6.addImage(log3);
    l6.velocityX = -10;
    l6.scale=0.5;
    l6.lifetime=width/10;
    logGroup1.add(l6);
    monkey.depth=l6.depth+1;
    l6.setCollider("rectangle",0,20,300,65);
    crocGroup.setDepthEach(l6.depth+1);
    l6.debug=true;
  }
}
function spawnLog7(){
  if(frameCount % 100===0){
    var l7 = createSprite(width,height-230,10,10);
    l7.addImage(log1);
    l7.velocityX = -20;
    l7.scale=0.5;
    l7.lifetime=width/10;
    logGroup1.add(l7);
    monkey.depth=l7.depth+1;
    l7.setCollider("rectangle",0,20,100,50);
    crocGroup.setDepthEach(l7.depth+1);
    l7.debug=true;
  }
}


function spawnLog8(){
  if(frameCount % 150===0){
    var l8 = createSprite(width,height-230,10,10);
    l8.addImage(log2);
    l8.velocityX = -10;
    l8.scale=0.5;
    l8.lifetime=width/10;
    logGroup1.add(l8);
    monkey.depth=l8.depth+1;
    l8.setCollider("rectangle",0,20,300,65);
    crocGroup.setDepthEach(l8.depth+1);
    l8.debug=true;
  }
}


function spawnLog9(){
  if(frameCount % 50===0){
    var l9 = createSprite(width,height-230,10,10);
    l9.addImage(log3);
    l9.velocityX = -15;
    l9.scale=0.5;
    l9.lifetime=width/10;
    logGroup1.add(l9);
    monkey.depth=l9.depth+1;
    l9.setCollider("rectangle",0,20,300,65);
    crocGroup.setDepthEach(l9.depth+1);
    l9.debug=true;
  }
}


