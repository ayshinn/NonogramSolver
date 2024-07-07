let puzzle, rowHints, colHints;

function createGrid() {
  const gridSize = document.getElementById('gridSize').value;
  const inputArea = document.getElementById('inputArea');
  inputArea.style.display = 'block';

  // Create empty hints
  rowHints = Array.from({ length: gridSize }, () => []);
  colHints = Array.from({ length: gridSize }, () => []);
}

function initializeGame() {
  const gridSize = document.getElementById('gridSize').value;
  const rowsInput = document.getElementById('rowHints').value.trim();
  const colsInput = document.getElementById('colHints').value.trim();
  const nonogramTable = document.getElementById('nonogramTable');
  const solveButton = document.getElementById('solveButton');

  // Parse row and column hints
  rowHints = rowsInput.split('\n').map(hint => hint.split(',').map(Number));
  colHints = colsInput.split('\n').map(hint => hint.split(',').map(Number));

  // Create empty puzzle
  puzzle = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => 0));

  // Clear the table
  nonogramTable.innerHTML = '';

  for (let i = 0; i <= gridSize; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j <= gridSize; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j === 0) {
        cell.classList.add('number-cell');
      } else if (i === 0) {
        cell.textContent = colHints[j - 1].join(' ');
        cell.classList.add('number-cell');
      } else if (j === 0) {
        cell.textContent = rowHints[i - 1].join(' ');
        cell.classList.add('number-cell');
      } else {
        cell.addEventListener('click', () => toggleCell(i - 1, j - 1));
      }
      row.appendChild(cell);
    }
    nonogramTable.appendChild(row);
  }

  updateGrid();
  solveButton.style.display = 'block';
}

function toggleCell(row, col) {
  console.log(puzzle[row][col])
  console.log("Toggle square " + row + ", " + col)
  puzzle[row][col] = 1 - puzzle[row][col];
  updateGrid();
  console.log(puzzle[row][col])
}

function updateGrid() {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      const cell = nonogramTable.rows[i + 1].cells[j + 1];
      cell.style.backgroundColor = puzzle[i][j] ? 'black' : 'white';
    }
  }
}

function solveNonogram() {
  // TODO: implement actual solution algorithm here
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      puzzle[i][j] = Math.random() < 0.5 ? 1 : 0;
    }
  }
  updateGrid();
}