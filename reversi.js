const board = document.getElementById('board');
let gameBoard = [];
let turn = 'W';
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
      const path = isValidMove(square);

      if (row && cell && !gameBoard[row][cell] && path.length > 0) {
        placePiece(square, path);
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

function placePiece(square, path) {
  console.log(square, path);
  let piece = document.createElement('div');
  let hw = square.clientHeight - square.clientHeight / 4;
  
  const [row, cell] = square.id.split(',');
  gameBoard[row][cell] = turn;

  square.innerHTML = '';
  piece.className = 'piece';
  piece.style.height = `${hw}px`;
  piece.style.width = `${hw}px`;

  square.append(piece);

  if ('W' === turn) {
    piece.style.backgroundColor = 'white';
    flipPieces('white', path);
    turn = 'B';
  } else {
    piece.style.backgroundColor = 'black';
    flipPieces('black', path);
    turn = 'W';
  }
}

function flipPieces(color, path = []) {
  path.forEach((element) => {
    const [row, cell] = element.id.split(',');
    gameBoard[row][cell] = turn;
    let piece = [...element.childNodes].pop();
    piece.style.backgroundColor = color;
  });
}

function isValidMove(square) {
    //check every direction, and if true, flip pieces then check next direction.
    return check("left", square) || check("right", square);
}

function check(direction, square) {
    const [row, cell] = square.id.split(',');
    const opponent = turn === 'W' ? 'B' : 'W';
    const path = [square];

    for (let i = cell - 1; i >= 0; i--) {
        if (!gameBoard[row][i] || (i === 0 && turn !== gameBoard[row][i])) {
            console.log("returned on 89");
            return [];
        }

        if (i === cell - 1) {
            if (!gameBoard[row][i] || gameBoard[row][i] !== opponent) {
              console.log("returned on 95");
              return [];
            }
        } else {
            if (gameBoard[row][i] === turn) {
              path.push(document.getElementById(`${row},${i}`));
              console.log("returned on 101");
              return path;
            }
        }

        path.push(document.getElementById(`${row},${i}`));
    }

    return path;
}

initialize();
