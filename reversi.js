const board = document.getElementById('board');
let gameBoard = [];
let turn = 'W';
let path = [];
const size = 8;

board.innerHTML = '';
board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

for (let row = 0; row < size; row++) {
  gameBoard[row] = [];
  for (let cell = 0; cell < size; cell++) {
    gameBoard[row][cell] = null;
    let div = document.createElement('div');
    let screen =
      document.documentElement.clientHeight -
      document.documentElement.clientHeight / 4;
    let hw = screen / size;
    div.style.height = `${hw}px`;
    div.style.width = `${hw}px`;
    div.id = `${row},${cell}`;
    div.className = 'cell';
    div.innerText = `${row},${cell}`;
    board.append(div);

    div.addEventListener('click', (event) => {
      const square = event.target;

      if (row && cell && !gameBoard[row][cell] && isValidMove(square)) {
        placePiece(square);
      }
    });
  }
}

function initialize() {
  gameBoard[3][3] = 'W';
  placePiece(document.getElementById('3,3'));
  gameBoard[3][4] = 'B';
  placePiece(document.getElementById('3,4'));
  gameBoard[4][4] = 'W';
  placePiece(document.getElementById('4,4'));
  gameBoard[4][3] = 'B';
  placePiece(document.getElementById('4,3'));
}

function placePiece(square) {
  let piece = document.createElement('div');
  let hw = square.clientHeight - square.clientHeight / 4;

  const [row, cell] = square.id.split(',');
  gameBoard[row][cell] = turn;

  square.innerHTML = '';
  piece.className = 'piece';
  piece.style.height = `${hw}px`;
  piece.style.width = `${hw}px`;

  if ('W' === turn) {
    piece.style.backgroundColor = 'white';
    flipPieces('white');
    turn = 'B';
  } else {
    piece.style.backgroundColor = 'black';
    flipPieces('black');
    turn = 'W';
  }

  square.append(piece);
}

function flipPieces(color) {
  path.forEach((element) => {
    const [row, cell] = element.id.split(',');
    gameBoard[row][cell] = turn;
    let piece = [...element.childNodes].pop();
    piece.style.backgroundColor = color;
  });

  path = [];
}

function isValidMove(square) {
  path = [];
  const [row, cell] = square.id.split(',');
  const opponent = turn === 'W' ? 'B' : 'W';

  //go left
  for (let i = cell - 1; i >= 0; i--) {
    if (!gameBoard[row][i] || (i === 0 && turn === opponent)) {
      return false;
    }

    if (i === cell - 1) {
      if (!gameBoard[row][i] || gameBoard[row][i] !== opponent) {
        return false;
      }
    } else {
      if (gameBoard[row][i] === turn) {
        path.push(document.getElementById(`${row},${i}`));
        return true;
      }
    }

    path.push(document.getElementById(`${row},${i}`));
  }

  return true;
}

initialize();
