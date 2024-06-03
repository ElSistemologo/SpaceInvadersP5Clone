function AlienBullet(x, y) {
  this.x = x;
  this.y = y;
  // this.r = 8;
  this.toDelete = false;
  this.bulletWidth = 5;
  this.bulletHeight = 15; 


  this.show = function() {
    noStroke();
    fill(255 , 0, 0);
    rectMode(CENTER);
    // ellipse(this.x, this.y, this.r*2, this.r*2);
    rect(this.x, this.y, this.bulletWidth, this.bulletHeight);
  }

  this.move = function() {
    // this.y -= 5;
    this.y = this.y + 5;
  }

  //chequeo de colisión basado en los bordes del rectángulo
  this.hitsShip = function(ship) {
    if (this.x < ship.x + ship.ShipWidth / 2 &&
        this.x + this.bulletWidth > ship.x - ship.ShipWidth / 2 &&
        this.y < ship.y + ship.ShipHeight / 2 &&
        this.y + this.bulletHeight > ship.y - ship.ShipHeight / 2) {
      return true;
    } else {
      return false;
    }
  }

  this.delete = function() {
    this.toDelete = true;
  }










}