
//SPACE INVADERS GAME P5.JS - GRUPO CYBER 4/2

var ship;
var bullets  = [];

let alienImages = [];
var aliens = [];
var alienBullets = [];
var alienNumber = 12;
let alienSpeed = 1;

let level = 1;
let scoreShip = 0;
let scoreAlien = 0;
let aliensDead = 0;
let highScore = 0; // almacenar el puntaje más alto
let lives = 100;


function preload() {
  alienImages.push(loadImage('images/alien1_a.png'));
  alienImages.push(loadImage('images/alien1_b.png'));
  alienImages.push(loadImage('images/alien2_a.png'));
  alienImages.push(loadImage('images/alien2_b.png'));
  alienImages.push(loadImage('images/alien3_a.png'));
  alienImages.push(loadImage('images/alien3_b.png'));
}

function setup() {
  createCanvas(1200, 800);
  ship = new Ship();
  // bullet = new Bullet(  width/2, height-20);
  for (var i = 0; i < alienNumber; i++) {
    aliens[i] = new Alien(i*80+80, 60, alienSpeed); //80 es el espacio entre aliens y 60 es la altura
  }

}


function draw() {
  background(51);
  ship.show();
  ship.move();

  //generacion de aliens si se eliminan 

  
  // cada que se eliminen todos los aliens, se generan nuevos aliens

  // if(aliensKilled != 0 && aliensKilled % alienNumber == 0){
    if (aliensDead == alienNumber) {
    console.log("Aliens DEAD: " + aliensDead);
    console.log("Alien Number: " + alienNumber);
    level += 1;
    alienNumber += 12 ;
    aliensDead = 0;
    console.log("LEVEL: " + level);
    for (var i = 0; i < 12; i++) {
      
      //generar una fila de aliens por cada nivel

      for (var j = 0; j< level; j++){ 
        valorYFila = 60 + (j*80);
        aliens.push(new Alien(i*80+80, valorYFila, alienSpeed));
      }


      
      // // console.log("Alien Speed: " + alienSpeed);
      // if (alienSpeed >= 5){
      //   //velocidad aleatoria entre 1 y 50
      //   // alienSpeed = Math.floor(Math.random() * 20) + 1;
      //   alienSpeed = 1;
      //   // console.log("Alien Speed changed to: " + alienSpeed);
      // }else {
      //   alienSpeed += 0.5;
      //   // console.log("Alien Speed changed to: " + alienSpeed);
      // }   
    }
  }

  // while (aliens.length < alienNumber) {
  // }

  // GENERACION E IMPACTO DE BALAS DE la nave
  for (var i = 0; i < bullets.length ; i++) {
    bullets[i].show();
    bullets[i].move();

    for (var j = 0; j < aliens.length ; j++) {
      if (bullets[i].hits(aliens[j])) {
        aliensDead += 1;
        // console.log("HIT, Aliens Killed: "+ aliensKilled );
        scoreShip += 10;
        // aliensNumber -= 1;
        aliens[j].deleteAlien();
        bullets[i].delete();
      }
    }
  }

  // GENERACION E IMPACTO DE BALAS DE LOS ALIENS
  for (var i = 0; i < alienBullets.length ; i++) {

    alienBullets[i].show();
    alienBullets[i].move();

    if (alienBullets[i].hitsShip(ship)) {
      lives -= 1;
      scoreAlien += 100;
      alienBullets[i].delete();
      if (lives == 0){
        //GAME OVER
        noLoop();
        textSize(64);
        fill(255);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width/2, height/2);
   z   }
    }
  }
  //seria chevere hacer que cada fila haga shiftDown de forma independiente a las otras filas  (filas nuevas y filas viejas) - no se si alcance a hacerlo -- lo mismo para la velocidad ....
  var AlienEdge = false;
  var ShipEdge = false;
  var AlienLanded = false;
  var AlienFireProb = 0.001; //probabilidad de que un alien dispare
  for (var i = 0; i < aliens.length ; i++) {
    aliens[i].show();
    aliens[i].move();
    if (aliens[i].x > width || aliens[i].x < 0) {
      AlienEdge = true;
    }
    if (aliens[i].y > height) {
      AlienLanded = true;
    }
    if (AlienLanded){
      scoreAlien += 10;
      aliens[i].deleteAlien();
      aliensDead += 1;
      // AlienLanded = false;
    }
    if (random(1) < AlienFireProb) {
      var alienBullet = new AlienBullet(aliens[i].x, aliens[i].y);
      alienBullets.push(alienBullet);
    }
  }

  if (AlienEdge) {
    for (var i = 0; i < aliens.length ; i++) {
      aliens[i].shiftDown();
    }
  }

  //eliminar balas que salen de la pantalla
  for (var i = bullets.length-1; i >= 0  ; i--) {
    if (bullets[i].toDelete) {
      bullets.splice(i, 1);
      
    }
  }

  //eliminar balas que salen de la pantalla de los aliens
  for (var i = alienBullets.length-1; i >= 0  ; i--) {
    if (alienBullets[i].toDelete) {
      alienBullets.splice(i, 1);
    }
  }
  
  if(ship.x > width || ship.x < 0){
    ShipEdge = true;
  }

  if (ShipEdge) { 
    ship.setDir(0);
  }


  for (var j = 0; j < aliens.length ; j++) {
    if (ship.alienHitsShip(aliens[j])) {
      console.log("SHIP HIT");
      lives -= 1;
      aliens[j].deleteAlien();
      aliensDead += 1;

      if (lives == 0){
        //GAME OVER
        noLoop();
        textSize(64);
        fill(255);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width/2, height/2);
      }
    }
  }

  //Puntaje
  //show Ship score
  textSize(32);
  fill(255);
  textAlign(LEFT, TOP);
  text("Ship Score: " + scoreShip, 10, 10);
  //show Alien score
  textSize(32);
  fill(255);
  textAlign(RIGHT, TOP);
  text("Alien Score: " + scoreAlien, width-10, 10);
  //show lives
  textSize(32);
  fill(255);
  textAlign(CENTER, TOP);
  text("Lives: " + lives, width/2, 10);


}

// 5 == "5" //true
// 5 === "5" //false
function keyPressed() {
  if (key === ' ') {
    var bullet = new Bullet(ship.x, height - 20);
    bullets.push(bullet);
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}

function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}
