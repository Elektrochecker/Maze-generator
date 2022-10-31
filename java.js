const scl = 20;
var cells = [];
let start = [0, 0];
let goal = [];
const w = 1200;
const h = 800;
let pcolor = [100, 100, 200];
let showEnds = false;

function setup() {
  frameRate(24);
  // preVisit();

  createCanvas(w, h);
  background(100);
  for (var y = 0; y < height / scl; y++) {
    cells[y] = [];

    for (var x = 0; x < width / scl; x++) {
      cells[y][x] = [true, true, true, true];
    }
  }
  goal = [width / scl - 1, height / scl - 1];
  preVisit();
}


function draw() {
  background(100);
  generate();
  drawVisited();
  drawPrevious();
  if (showEnds) {
    drawEnds();
  }
  drawWalls();
  drawActive(4);
  visitedColor += 255 / width / height * scl * scl;
}

function drawWalls() {
  for (var yy = 0; yy < height / scl; yy++) {
    for (var xx = 0; xx < width / scl; xx++) {
      let x = xx * scl;
      let y = yy * scl;

      if (cells[yy][xx][0]) {
        stroke(0, 255);
        line(x, y, x + scl, y);
      }
      if (cells[yy][xx][1]) {
        stroke(0, 255);
        line(x + scl, y, x + scl, y + scl);
      }
      if (cells[yy][xx][2]) {
        stroke(0, 255);
        line(x, y + scl, x + scl, y + scl);
      }
      if (cells[yy][xx][3]) {
        stroke(0, 255);
        line(x, y, x, y + scl);
      }
    }
  }
}

function removeRandomWall(x, y) {
  let wall = Math.floor(Math.random() * 4);

  let xlimit = width / scl - 1;
  let ylimit = height / scl - 1;

  if (y == 0 && wall == 0) {
    if (x == 0) {
      wall = newRandom(0, 3);
    } else if (x >= xlimit && wall == 1) {
      wall = newRandom(0, 1);
    } else {
      wall = newRandom(0);
    }
  }

  if (x == 0 && wall == 3) {
    if (y >= ylimit) {
      wall = newRandom(3, 2);
    } else if (y == 0) {
      wall = newRandom(0, 3);
    } else {
      wall = newRandom(3);
    }
  }

  if (y >= ylimit && wall == 2) {
    if (x >= xlimit) {
      wall = newRandom(1, 2);
    } else if (x == 0) {
      wall = newRandom(2, 3);
    } else {
      wall = newRandom(2);
    }
  }

  if (x >= xlimit && wall == 1) {
    if (y == 0) {
      wall = newRandom(0, 1);
    } else if (y >= ylimit) {
      wall = newRandom(1, 2);
    } else {
      wall = newRandom(1);
    }
  }

  //console.log(wall);

  switch (wall) {
    case 0:
      cells[y - 1][x][2] = false;
      break;
    case 1:
      cells[y][x + 1][3] = false;
      break;
    case 2:
      cells[y + 1][x][0] = false;
      break;
    case 3:
      cells[y][x - 1][1] = false;
  }
  cells[y][x][wall] = false;
  return wall;
}

//returns random value that is not equal to any parameter
function newRandom(in1, in2, in3) {
  n = Math.floor(Math.random() * 4);
  if (n == in1 || n == in2 || n == in3) {
    newRandom(in1, in2, in3);
  }
  return n;
}

function randomMaze(q = 1) {
  for (var i = 0; i < q; i++) {
    for (var y = 0; y < height / scl; y++) {
      for (var x = 0; x < width / scl; x++) {
        removeRandomWall(x, y);
      }
    }
  }
}

let drawActive = r => {
  fill(0, 0, 150);
  noStroke();
  ellipseMode(CENTER);
  circle(active[0] * scl + scl / 2, active[1] * scl + scl / 2, scl - r)
  return true;
}

function drawEnds() {
  // ellipseMode(CENTER);
  fill(0, 200, 0);
  rect(start[0] * scl, start[1] * scl, scl, scl);
  fill(200, 0, 0);
  rect(goal[0] * scl, goal[1] * scl, scl, scl);
}

// function precent() {
//   let P = width * height / scl / scl;
//   P = visited.length / P * 100;
//   return P;
// }

function randomColor() {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  return [r, g, b];
}

function touchStarted() {
  showEnds = !showEnds;
}
