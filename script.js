let size = 90;
let htmlElements = [];
let grid = [];
const EMPTY = 0;
const ALIVE = 1;
const INTERVAL = 200;

init();

function init() {
  createField();
  for (let i = 0; i < Math.floor(size * size * 0.3); i++) {
    do {
      let col = Math.floor(Math.random() * size);
      let row = Math.floor(Math.random() * size);
      if (grid[col][row] == EMPTY) {
        grid[col][row] = ALIVE;
        break;
      }
    } while (true);
  }
  draw();
  setInterval(newGeneration, INTERVAL);
}

function createField() {
  let table = document.getElementById('field');
  for (let col = 0; col < size; col++) {
    let tr = document.createElement('tr');
    let tdElements = [];
    grid.push(new Array(size).fill(EMPTY));
    htmlElements.push(tdElements);
    table.appendChild(tr);
    for (let row = 0; row < size; row++) {
      let td = document.createElement('td');
      tdElements.push(td);
      tr.appendChild(td);
    }
  }
}

function draw() {
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      htmlElements[col][row].setAttribute('class', 'cell ' + (grid[col][row] == 1 ? 'filled' : 'empty'));
    }
  }
}

function newGeneration() {
  let newCells = [];
  for (let i = 0; i < size; i++) {
    newCells.push(new Array(size).fill(EMPTY));
  }
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      let neibhours = countNeibhours(col, row);
      if (grid[col][row] == EMPTY && neibhours == 3) { //Newborn
        newCells[col][row] = ALIVE;
      } else if (grid[col][row] == ALIVE && (neibhours == 2 || neibhours == 3)) { 
        newCells[col][row] = ALIVE;
      } else {  // (neighbors < 2 || neighbors > 3) 
        newCells[col][row] = EMPTY;
      }
    }
  }
  grid = newCells;
  draw();
}

function countNeibhours(mainCol, mainRow) {
    let count = 0;
    for (let neighborCol = -1; neighborCol <= 1; neighborCol++) {
        for (let neighborRow = -1; neighborRow <= 1; neighborRow++) {
        let calcCol = (mainCol + neighborCol + size) % size;
        let calcRow = (mainRow + neighborRow + size) % size;
        count = count + grid[calcCol][calcRow];
        }
    }
    return count - grid[mainCol][mainRow];
}
  