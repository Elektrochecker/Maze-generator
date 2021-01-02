const scl = 20;
var cells = [];
// var height = 400;
// var width = 600;

function setup() {
  frameRate(30);
  // preVisit();

  createCanvas(600, 400);
  for (var y = 0; y < height / scl; y++) {
    cells[y] = [];

    for (var x = 0; x < width / scl; x++) {
      cells[y][x] = [true, true, true, true];
    }
  }

  preVisit();
}


function draw() {
  background(100);
  generate();
  drawVisited();
  drawWalls();
  drawActive(4);
}

function drawWalls() {
  for (var yy = 0; yy < height / scl; yy++) {
    for (var xx = 0; xx < width / scl; xx++) {
      let x = xx * scl;
      let y = yy * scl;

      if (cells[yy][xx][0]) {
        stroke(0);
        line(x, y, x + scl, y);
      }
      if (cells[yy][xx][1]) {
        stroke(0);
        line(x + scl, y, x + scl, y + scl);
      }
      if (cells[yy][xx][2]) {
        stroke(0);
        line(x, y + scl, x + scl, y + scl);
      }
      if (cells[yy][xx][3]) {
        stroke(0);
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