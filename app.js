let s; //snake
let scale = 30; //pixel size
let score = 0;
let Hscore = 0;
let lvl = 5; //level
let food;
let boxWidth, boxHeight;
let ox, oy, nx, ny;

function setup() {
  createCanvas(
    scale * floor(windowWidth / scale),
    scale * floor(windowHeight / scale)
  );
  boxWidth = width - 2 * scale;
  boxHeight = height - 3 * scale;

  s = new Snake();
  pickLocation();
}
function pickLocation() {
  let cols = floor(boxWidth / scale);
  let rows = floor(boxHeight / scale);
  food = createVector(1 + floor(random(cols)), 2 + floor(random(rows)));
  food.mult(scale);
  for (let i = 0; i < s.tail.length; i++) {
    if (s.tail[i] == food) {
      pickLocation();
    }
  }
}
function draw() {
  frameRate(lvl);
  background(200);

  drawGrid();
  drawFood();

  if (s.eat(food)) {
    pickLocation();
  }
  s.failed();
  s.update();
  s.show();
  drawGame();
  fill(255, 0, 100);
  rect(food.x, food.y, scale, scale);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function drawGrid() {
  fill(190);
  stroke(200);
  for (let i = scale; i < width - scale; i += scale) {
    for (let j = 2 * scale; j < height - scale; j += scale) {
      rect(i, j, scale, scale);
    }
  }
}
function drawGame() {
  // draw game box
  noFill();
  stroke(51);
  rect(scale, 2 * scale, boxWidth, boxHeight);

  //draw score
  fill(51);
  noStroke();
  textSize(0.7 * scale);
  text("Score: " + score, scale, 0.8 * scale);
  text("High Score: " + Hscore, scale, 1.55 * scale);
}

function drawFood() {
  if (s.eat(food)) {
    lvl += 1 / lvl;
    score += floor(lvl);
    if (score > Hscore) {
      Hscore = score;
    }
    pickLocation();
  }
  fill(255, 0, 0);
  ellipse(food.x + scale * 0.5, food.y + scale * 0.5, scale, scale);
}
