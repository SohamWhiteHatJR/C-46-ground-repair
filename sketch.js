const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var score=0;
var engine, world;
var punchImg , punchPC;
var PC , pcImg;
var ground;
var  sword , swordAttackImg; 
var cloudImage;
var boss , bossImg;
var robot , robotImage , robotGrp;
var bullet , bulletGrp;

function preload(){

pcImg = loadAnimation("images/stickman walk-0.png",
"images/stickman walk-2.png","images/stickman walk-3.png",
"images/stickman walk-4.png","images/stickman walk-7.png",
"images/stickman walk-8.png","images/stickman walk-9.png","images/stickman walk-10.png");

cloudImage = loadImage("images/cloud.png")

bossImg = loadAnimation("images/boss-0.png","images/boss-1.png","images/boss-2.png","images/boss-3.png",
"images/boss-4.png","images/boss-5.png","images/boss-6.png","images/boss-10.png","images/boss-11.png",
"images/boss-12.png","images/boss-13.png","images/boss-14.png","images/boss-16.png","images/boss-22.png",
"images/boss-23.png","images/boss-24.png","images/boss-25.png","images/boss-27.png","images/boss-28.png",
"images/boss-32.png","images/boss-33.png","images/boss-34.png","images/boss-36.png");

swordAttackImg = loadAnimation("images/s1.png")
// ,"images/s2.png","images/s3.png",
// "images/s4.png","images/s5.png","images/s6.png","images/s7.png","images/s8.png","images/s9.png",
// "images/s10.png","images/s11.png","images/s12.png","images/s13.png","images/s14.png","images/s15.png");

punchImg = loadAnimation("images/p1.png","images/p2.png","images/p3.png","images/p4.png",
"images/p5.png","images/p6.png",);

robotImage = loadAnimation("images/r1.png","images/r2.png","images/r3.png","images/r4.png",
"images/r5.png","images/r6.png")
}

function setup(){

    var canvas = createCanvas(1200,500);
    engine = Engine.create();
    world = engine.world;

    ground = createSprite(1200,480,1200,7);
    ground.shapeColor = "black"
    ground.x = ground.width/2;

    PC = createSprite(100,400);
    PC.addAnimation("moving",pcImg);
   
    robotGrp = new Group();
    bulletGrp = new Group();

    score = 0;
}

function draw(){
    background(255,255,255);

    text("Score: "+ score, 500,50);
    Engine.update(engine);

    ground.velocityX = -2;
    if (ground.x < 0){
        ground.x = ground.width/2;
    }

    SwordAttack123();
    spawnClouds();
    punch();
    obstacles();
    hit();

    if(score===10){
    Boss();
    }
    
    drawSprites();
  //  console.log(frameCount)
}

function Boss(){

if(frameCount%100===0){
boss = createSprite(700,275)
boss.addAnimation("boss",bossImg);
}
}

function SwordAttack123(){
    if(keyWentDown("q")){
        PC.visible = false;;
        sword = createSprite(200,375);
        sword.addAnimation("attack",swordAttackImg)
        sword.scale = 0.5

        bullet = createSprite(300,310,10,5);
        bullet.shapeColor = "gold"
        bullet.velocityX = 2;
        bullet.lifetime = 275;
        bulletGrp.add(bullet);

        console.log("abcd")
        if(keyWentUp("q")){
            bullet.velocityX = 0
        }
       
    }
}

function spawnClouds() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      var cloud = createSprite(600,120,40,10);
       cloud.y = Math.round(random(80,150));
        cloud.addImage(cloudImage);
         cloud.scale = 1;
          cloud.velocityX = -3;
      
       //assign lifetime to the variable
      cloud.lifetime = 200;
   
    }
}

function punch(){
    if (keyDown(LEFT_ARROW)){
        PC.visible = false;
        punchPC = createSprite(200,253);
        punchPC.addAnimation("punch",punchImg)
        console.log("abcd")
    }
}

function obstacles() {
   
    if (frameCount % 100 === 0) {
      var robot = createSprite(1200,350);
       robot.addAnimation("robots",robotImage);
        robot.scale = 0.5;
        robot.velocityX = -3;
        robot.lifetime = 500;
        robotGrp.add(robot);
    }
  }

  function hit(){
          for(var i = 0; i<bulletGrp.length; i++){
              if(bulletGrp.get(i).isTouching(robotGrp)){
                robotGrp.get(i).destroy();
                bulletGrp.get(i).destroy();
                score=score+1;
              }
          } 
      }
