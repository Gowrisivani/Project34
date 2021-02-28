const Engine = Matter.Engine;

const World = Matter.World;

const Bodies = Matter.Bodies;

const Constraint = Matter.Constraint;

//Create variables here

var dog;

var happyDog;

var database;

var foodS;

var foodStock;

function preload()
{
  //load images here
  
  dogimg=loadImage("images/dogImg.png");

  happyDogimg=loadImage("images/dogImg1.png");

}

function setup() 
{

  createCanvas(500,500);
 
  engine=Engine.create();

  world=engine.world;

  dog=createSprite(250,250,10,10);
  dog.addImage("dog",dogimg);
  dog.scale=0.5;

  database=firebase.database();
  
  foodStock=database.ref('food');

  foodStock.on("value",readStock);

}


function draw() 
{  

  background(46,139,87);

  if(keyWentDown(UP_ARROW))
  {
    feedpet();
  }

  drawSprites();

  //add styles here

    stroke(4);
    textSize(20);
    fill("black");
    text("Note:Press UP_ARROW KEY to Feed Drago Milk!",200,50);
}
//Function to read values from DB

function readStock(data)
{
  foodS=data.val();
}

//Function to write values in DB
function writeStock(data)
{
  foodStock.set(data)
}
function feedpet(){
  if(foodS>0){
    writeStock(foodS-1);
    dog.addImage("happydog",happyDogimg);
  }
  else{
    dog.addImage("dog",dogimg);
  }
}