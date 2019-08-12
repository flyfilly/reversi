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
    let path = [];

    path = [...path, ...check("left", square)];
    path = [...path, ...check("right", square)];
    path = [...path, ...check("up", square)];
    console.log("LOOK AT ME HERE:", path);
    return path;
}

function check(direction, square) {
    let [row, cell] = square.id.split(',');
    const opponent = turn === 'W' ? 'B' : 'W';
    const path = [square];

    cell = parseInt(cell);
    
    if(direction === 'left') {
      for (let i = cell - 1; i >= 0; i--) {
          if (!gameBoard[row][i] || (i === 0 && turn !== gameBoard[row][i])) {
              console.log("returned on 102");
              return [];
          }

          if (i === cell - 1) {
              if (!gameBoard[row][i] || gameBoard[row][i] !== opponent) {
                console.log("returned on 108");
                return [];
              }
          } else {
              if (gameBoard[row][i] === turn) {
                path.push(document.getElementById(`${row},${i}`));
                console.log("returned on 114");
                return path;
              }
          }

          path.push(document.getElementById(`${row},${i}`));
      }
    }

    if(direction === 'right') {
      for (let i = cell + 1; i <= 8; i++) {
        console.log("THIS Piece", gameBoard[row][i], document.getElementById(`${row},${i}`));
        if (!gameBoard[row][i] || (i === 8 && turn !== gameBoard[row][i])) {
            console.log("returned on 128");
            return [];
        }

        //is this the first cell we check?
        if (i === cell + 1) {
            if (!gameBoard[row][i] || gameBoard[row][i] !== opponent) {
              console.log("returned on 134");
              return [];
            }
        } else {
            if (gameBoard[row][i] === turn) {
              path.push(document.getElementById(`${row},${i}`));
              console.log("returned on 140");
              return path;
            }
        }

        path.push(document.getElementById(`${row},${i}`));
      }
    }

    if(direction === 'up') {
      for (let i = row - 1; i >= 0; i--) {
          if (!gameBoard[i][cell] || (i === 0 && turn !== gameBoard[i][cell])) {
              console.log("returned on 152");
              return [];
          }

          if (i === row - 1) {
              if (!gameBoard[i][cell] || gameBoard[i][cell] !== opponent) {
                console.log("returned on 158");
                return [];
              }
          } else {
              if (gameBoard[i][cell] === turn) {
                path.push(document.getElementById(`${i},${cell}`));
                console.log("returned on 164");
                return path;
              }
          }

          path.push(document.getElementById(`${i},${cell}`));
      }
    }

    

    return path;
}

initialize();
