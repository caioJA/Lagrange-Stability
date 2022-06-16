class sun {
  constructor(x, y, vX, vY, mass, diameter){
    this.x=x;
    this.y=y;
    this.vX=vX;
    this.vY=vY;
    this.mass=mass;
    this.diameter=diameter;
  }
  
  show(){
    noStroke();
    fill(255, 242, 34);
    circle(this.x, this.y, this.diameter);
  }
  
  move(){
    this.x=this.x+this.vX;
    this.y=this.y+this.vY;
  }
}

class planet {
  constructor(x, y, vX, vY, mass, diameter){
    this.x=x;
    this.y=y;
    this.vX=vX;
    this.vY=vY;
    this.mass=mass;
    this.diameter=diameter;
  }
  show(){
    fill(227, 110, 75);
    circle(this.x, this.y, this.diameter);
  }
  move(){
    this.x=this.x+this.vX;
    this.y=this.y+this.vY;
  }
}

class asteroid {
  constructor(x, y, vX, vY, mass){
    this.x=x;
    this.y=y;
    this.vX=vX;
    this.vY=vY;
    this.mass=mass;
  }
  
  show(){
    stroke(255);
    strokeWeight(2);
    point(this.x, this.y);
  }
  
  move(){
    this.x=this.x+this.vX;
    this.y=this.y+this.vY;
  }
}

function asteroidOrbit(asteroid, sun, planet){
  let fX = (9.62*sun.mass*asteroid.mass/
        (dist(sun.x,sun.y,asteroid.x,asteroid.y)*dist(sun.x,sun.y,asteroid.x,asteroid.y)))*
        (sun.x-asteroid.x)/dist(sun.x,sun.y,asteroid.x,asteroid.y)+
        (9.62*planet.mass*asteroid.mass/
        (dist(planet.x,planet.y,asteroid.x,asteroid.y)*dist(planet.x,planet.y,asteroid.x,asteroid.y)))*
        (planet.x-asteroid.x)/dist(planet.x,planet.y,asteroid.x,asteroid.y);
  
  let fY = (9.62*sun.mass*asteroid.mass/
        (dist(sun.x,sun.y,asteroid.x,asteroid.y)*dist(sun.x,sun.y,asteroid.x,asteroid.y)))*
        (sun.y-asteroid.y)/dist(sun.x,sun.y,asteroid.x,asteroid.y)+
        (9.62*planet.mass*asteroid.mass/
        (dist(planet.x,planet.y,asteroid.x,asteroid.y)*dist(planet.x,planet.y,asteroid.x,asteroid.y)))*
        (planet.y-asteroid.y)/dist(planet.x,planet.y,asteroid.x,asteroid.y);
  
  
  asteroid.vX=asteroid.vX+fX/asteroid.mass;
  asteroid.vY=asteroid.vY+fY/asteroid.mass;
}

function planetOrbit(sun, planet){
  let forceX = (9.62*sun.mass*planet.mass/
        (dist(sun.x,sun.y,planet.x,planet.y)*dist(sun.x,sun.y,planet.x,planet.y)))*
        (sun.x-planet.x)/dist(sun.x,sun.y,planet.x,planet.y);
  let forceY = (9.62*sun.mass*planet.mass/
        (dist(sun.x,sun.y,planet.x,planet.y)*dist(sun.x,sun.y,planet.x,planet.y)))*
        (sun.y-planet.y)/dist(sun.x,sun.y,planet.x,planet.y);
  planet.vX=planet.vX+forceX/planet.mass;
  planet.vY=planet.vY+forceY/planet.mass;
  sun.vX=sun.vX-forceX/sun.mass;
  sun.vY=sun.vY-forceY/sun.mass;
  
  //text('Radius: '+(dist(sun.x, sun.y, planet.x, planet.y)-310),400,450);
  
}

function showLagrangePoints(sun, planet){
  //let asteroidDirection = atan(asteroids[i].velocityY/asteroids[i].velocityX);
            //if(asteroids[i].velocityX<0){
             // asteroidDirection=asteroidDirection+PI;
            //}
  let angle = atan((400-planet.y)/(planet.x-400));
  if(planet.x<400){
    angle+=PI;
  }
  let L1x = planet.x-64.3469*(planet.x-400)/300;
  let L1y = planet.y-64.3469*(planet.y-400)/300;
  let L2x = planet.x+72.1321*(planet.x-400)/300;
  let L2y = planet.y+72.1321*(planet.y-400)/300;
  let L3x = 2*sun.x-planet.x+5.83391*(planet.x-400)/300;
  let L3y = 2*sun.y-planet.y+5.83391*(planet.y-400)/300;
  let L4x = sun.x+dist(planet.x, planet.y, 
                       sun.x, sun.y)*cos(angle+PI/3);
  let L4y = sun.y-dist(planet.x, planet.y, 
                       sun.x, sun.y)*sin(angle+PI/3);
  let L5x = sun.x+dist(planet.x, planet.y, 
                       sun.x, sun.y)*cos(angle-PI/3);
  let L5y = sun.y-dist(planet.x, planet.y, 
                       sun.x, sun.y)*sin(angle-PI/3);
  stroke(0,255,0);
  point(L1x,L1y);
  point(L2x,L2y);
  point(L3x,L3y);
  point(L4x,L4y);
  point(L5x,L5y);
  
  
  //stroke(0,0,255);
  //line(L3x,L3y, L2x, L2y);
  //line(Sun.x, Sun.y, L4x, L4y);
  //line(L4x, L4y, Jupiter.x, Jupiter.y);
  //text('distance: '+dist(L4x, L4y, 400, 400), 400, 350);
  //line(Sun.x, Sun.y, L5x, L5y);
  //line(L5x, L5y, Jupiter.x, Jupiter.y);
}

let asteroids = [];
let Sun = new sun(390, 400, 0, 0.1, 300, 20);
let Jupiter = new planet(700, 401.5, 0, -3, 10, 8);
let asteroidTest = new asteroid(545, 668.47, 2.7, -1.5, 1);

function collision(asteroid, sun, planet){
  if(dist(asteroid.x, asteroid.y, sun.x, sun.y)<=15 || 
     dist(asteroid.x, asteroid.y, planet.x, planet.y)<=6){
    return true;
  }else{
    return false;
  }
}

function setup() {
  createCanvas(800, 800);
  for(let i=0; i<800; i++){
    let angleRange = random(-PI/100,PI/100);
    let distanceRange = 305+random(-5,5);
    if(i<400){
      let velocityX = -2.7+random(-0.05,0.05);
      let velocityY = -1.45+random(-0.01,0.01);
      asteroids[i] = new asteroid(400+distanceRange*cos(PI/3+angleRange),
                                  400-distanceRange*sin(PI/3+angleRange),
                                  velocityX, velocityY, 1);
    }else{
      let velocityX = 2.7+random(-0.05,0.05);
      let velocityY = -1.45+random(-0.01,0.01);
      asteroids[i] = new asteroid(400+distanceRange*cos(-PI/3+angleRange),
                                  400-distanceRange*sin(-PI/3+angleRange),
                                  velocityX, velocityY, 1);
    }
  }
}

function draw() {
  background(55);
  
  noFill();
  stroke(100);
  circle(400, 400, 600);
  circle(400, 400, 20)
  
  
  showLagrangePoints(Sun, Jupiter);
  Sun.show();
  Jupiter.show();
  asteroidTest.show();
  for(let i=asteroids.length-1; i>=0; i--){
    asteroids[i].show();
    asteroidOrbit(asteroids[i], Sun, Jupiter);
    asteroids[i].move();
    if(collision(asteroids[i], Sun, Jupiter)){
      asteroids.splice(i, 1);
    }
  }
  Sun.move();
  Jupiter.move();
  planetOrbit(Sun, Jupiter);
  asteroidOrbit(asteroidTest, Sun, Jupiter);
  //noStroke();
  //textSize(20);
  //text('distance: '+ dist(Jupiter.x, Jupiter.y, Sun.x, Sun.y),400, 350);
  asteroidTest.move();
}