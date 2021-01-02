let active = [0, 0];
let visited = [
  [...active]
];
let activeVisited = [];
let previous = [
  [...active]
];

function generate() {
  visited.push([...active]);
  // console.log(visited);
  checkVisited();

  if (activeVisited.length >= 4) {
    console.log("all visited " + activeVisited);
    active = previous.pop();
    return false;
  }
  let n = newRandom(checkVisited()[0], checkVisited()[1], checkVisited()[2]);
  // console.log(checkVisited());
  // console.log(n);

  if (removeWall(active[0], active[1], n)) {
    // console.log("remove " + n);
    previous.push([...active]);
    newActive(n);
    return true;
  } else {
    // console.log("back " + activeVisited);
    active = previous.pop();
    return false;
  }
}

function checkVisited() {
  activeVisited = [];
  let check = [];

  for (let j = 0; j < 4; j++) {
    check = [...active];
    switch (j) {
      case 0:
        check[1]--;
        break;
      case 1:
        check[0]++;
        break;
      case 2:
        check[1]++;
        break;
      case 3:
        check[0]--;
        break;
    }
    for (let i = 0; i < visited.length; i++) {
      if (visited[i][0] == check[0] && visited[i][1] == check[1]) {
        if (!activeVisited.includes(j)) {
          activeVisited.push(j);
        }
      }
    }
  }

  return activeVisited;
}

function newActive(a) {
  // console.log("newActive");
  switch (a) {
    case 0:
      active[1]--;
      break;
    case 1:
      active[0]++;
      break;
    case 2:
      active[1]++;
      break;
    case 3:
      active[0]--;
      break;
  }
  return active;
}

function removeWall(x, y, wall) {
  //console.log("removeWall");
  let xlimit = width / scl - 1;
  let ylimit = height / scl - 1;

  if (y == 0 && wall == 0) {
    // if (x == 0) {
    //   return false;
    // } else if (x >= xlimit && wall == 1) {
    //   return false;
    // } else {
    return false;
  }
  // }

  if (x == 0 && wall == 3) {
    // if (y >= ylimit) {
    //   return false;
    // } else if (y == 0) {
    //   return false;
    // } else {
    return false;
  }
  // }

  if (y >= ylimit && wall == 2) {
    // if (x >= xlimit) {
    //   return false;
    // } else if (x == 0) {
    //   return false;
    // } else {
    return false;
  }
  // }

  if (x >= xlimit && wall == 1) {
    // if (y == 0) {
    //   return false;
    // } else if (y >= ylimit) {
    //   return false;
    // } else {
    return false;
  }
  // }

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
  return true;
}

function preVisit() {
  for (var x = 0; x < width / scl; x++) {
    visited.push([-1, 0]);
    visited.push([x, height / scl]);
  }
  for (var y = 0; y < width / scl; y++) {
    visited.push([-1, y]);
    visited.push([width / scl, y]);
  }
  return visited;
}

function drawVisited() {
  for (let i = 0; i < visited.length; i++) {
    fill(200);
    rect(visited[i][0] * scl, visited[i][1] * scl, scl, scl);
  }
}