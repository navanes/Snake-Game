function Snake() {
  this.x = scale;
  this.y = 2 * scale;
  this.xspeed = 0;
  this.yspeed = scale;
  this.total = 0;
  this.tail = [];

  this.eat =  (pos) => {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.dir = (x, y) => {
    if (this.xspeed !== abs(x * scale) && this.yspeed !== abs(y * scale)) {
      this.xspeed = x * scale;
      this.yspeed = y * scale;
    }
  };

  this.failed = function () {
    for (let i = 0; i < this.total; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log("starting over");
        score = 0;
        lvl = 5;
        this.total = 0;
        this.tail = [];
      }
    }
  };
  this.update = function () {
    for (let i = this.total; i > -1; i--) {
      this.tail[i + 1] = this.tail[i];
    }
    this.tail[0] = createVector(this.x, this.y);
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.x > boxWidth) {
      this.x -= boxWidth;
    } else if (this.x < scale) {
      this.x += boxWidth;
    } else if (this.y < 2 * scale) {
      this.y += boxHeight;
    } else if (this.y > boxHeight + scale) {
      this.y -= boxHeight;
    }
  };

  this.show = function () {
    fill(80);
    stroke(200);
    strokeWeight(scale*0.15);

    // beginShape();
    for (let i = 0; i < this.total; i++) {
      rect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
    rect(this.x, this.y, scale, scale);
  };
}
