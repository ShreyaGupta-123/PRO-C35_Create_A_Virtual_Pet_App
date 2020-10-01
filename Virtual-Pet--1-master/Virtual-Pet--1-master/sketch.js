var database ;
var foodS=20,foodStock;
var dog;
var position;
var feedTheDog,addTheFood ;
var foodObject;
var TimeforFood;
var lastFood;
var time;
function preload()
{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
  MilkImage=loadImage('images/Milk.png');
	//load images here
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();
  
  console.log(database);
  foodObject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  lastFood = database.ref('FeedTime')
  lastFood.on("value",readTime)

  var dog1 = database.ref('Food');
  dog1.on("value", readPosition);
  feedTheDog = createButton("FEED "+name)
  feedTheDog.position(600,100)
  feedTheDog.mousePressed(FeedDog)
  addTheFood = createButton("ADD FOOD")
  addTheFood.position(500,100)
  addTheFood.mousePressed(AddFood)
 
   
}
function readTime(time){
  TimeforFood = time.val()
}
function readStock(data){
 foodS = data.val();

}

function writeStocks(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

var timeFed,delay = 15;
function draw() {  

  background(46,139,87);

  foodObject.display()

  
  drawSprites();
   
  fill(255,255,254);
  textSize(15);
  //console.log(TimeforFood)
  text("Last Feed: "+timeFed, 600, 115)
 drawSprites();
 setToHour()
 if(time<frameCount-delay){
  dog.addImage(dogimg1) 
 }
 if(time>frameCount-delay){
  image(MilkImage,500+(frameCount-time),220,100,80);
 }
}
function setToHour(){
  timeFed = "Undefined"
  if(TimeforFood){
    if(TimeforFood >=12)
    timeFed = TimeforFood- 12 +"PM"
   }
   else {
     timeFed = TimeforFood +"AM"
   }
}

function readPosition(data){
  position = data.val();
  foodObject.updateFoodStock(position);
}

function writePosition(Pos){
  if(Pos>0){
    Pos=Pos-1;
  }
  else{
    Pos=0;
  }
  database.ref('/').set({
    'Food': Pos
  })

}

function FeedDog(){

  if(foodS>0){
    time = frameCount;

    dog.addImage(dogimg2) 
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodObject.getFoodStock(),
     TimeforFood:hour()
   })
  }
  }
  function AddFood(){
    position++
    database.ref('/').update({
      Food:position})
    }
    

    
