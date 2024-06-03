function Ship() {
  this.x = width / 2;
  this.y = height - 20;
  this.ShipWidth = 60;
  this.ShipHeight = 20; 

  this.xdir = 0;

  this.show = function() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.ShipWidth, this.ShipHeight);
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }

  this.alienHitsShip = function(alien) {
    // Chequeo de colisión basado en los bordes del rectángulo
    if (this.x - this.ShipWidth / 2 < alien.x + alien.r &&
        this.x + this.ShipWidth / 2 > alien.x - alien.r &&
        this.y - this.ShipHeight / 2 < alien.y + alien.r &&
        this.y + this.ShipHeight / 2 > alien.y - alien.r) {
      return true;
    } else {
      return false;
    }
  }


  this.move = function(dir) {
    this.x += this.xdir * 5;
  }

}