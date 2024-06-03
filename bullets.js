function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.r = 8;
  this.toDelete = false;


  this.show = function() {
    noStroke();
    fill(255 , 130, 0);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  this.move = function() {
    // this.y -= 5;
    this.y = this.y - 5;
  }

  this.hits = function(alien) {
    var d = dist(this.x, this.y, alien.x, alien.y);
    if (d < this.r + alien.r) {
      return true;
    } else {
      return false;
    }
  }

  this.delete = function() {
    this.toDelete = true;
  }










}