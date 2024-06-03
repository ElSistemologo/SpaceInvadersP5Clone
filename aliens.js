function Alien(x, y, speed) {
  this.x = x;
  this.y = y;
  this.r = 30;
  this.images = [
    alienImages[Math.floor(Math.random() * alienImages.length)],
    alienImages[Math.floor(Math.random() * alienImages.length)]
  ]; // Dos imágenes aleatorias
  this.currentImageIndex = 0;
  this.lastImageChangeTime = 0; // Tiempo en que la imagen fue cambiada por última vez

  
  this.speed = speed;
  this.xdir = 1;
  

  // this.toDelete = false;

  this.show = function() {
    // noStroke();
    // fill(255 , 0, 200, 150);
    // ellipse(this.x, this.y, this.r*2 , this.r*2);
    imageMode(CENTER);
    image(this.images[this.currentImageIndex], this.x, this.y, this.r * 2, this.r * 2); // Dibuja la imagen en lugar de la elipse

  }


  this.move = function() {
    this.x = this.x + this.xdir * this.speed;
    //cambiar de imagen para generar efecto de animación
    // Cambiar imagen cada 0.5 segundos
    if (millis() - this.lastImageChangeTime > 500) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.lastImageChangeTime = millis();
    }
    
  }

  this.shiftDown = function() {
    this.xdir *= -1;
    this.y += this.r;
  }

  //funcion para eliminar alien
  this.deleteAlien = function() {
    // Code to delete the alien
    aliens.splice(aliens.indexOf(this), 1);
  }

}