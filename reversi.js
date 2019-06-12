const board = document.getElementById("board");
let arr = [];
let size = 8;
let turn = "W";

board.innerHTML = "";
board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
for (let row = 0; row < size; row++) {
  arr[row] = [];
  for (let cell = 0; cell < size; cell++) {
    let div = document.createElement("div");
    arr[row].push(null);
    let screen =
      document.documentElement.clientHeight -
      document.documentElement.clientHeight / 4;
    let hw = screen / size;
    div.style.height = `${hw}px`;
    div.style.width = `${hw}px`;
    div.id = `${row},${cell}`;
    div.className = "cell";
    div.innerText = `${row},${cell}`;

    div.addEventListener("click", e => {
      const elem = e.target;
      const [x, y] = elem.id.split(",");
      if (x && y && !arr[x][y]) {
        arr[x][y] = turn;
        const hw = e.target.clientHeight - 20;
        let piece = document.createElement("div");
        piece.className = "piece";
        piece.style.height = `${hw}px`;
        piece.style.width = `${hw}px`;
        piece.style.backgroundColor = turn === "W" ? "white" : "black";
        elem.innerHTML = "";
        elem.appendChild(piece);
        turn = turn === "W" ? "B" : "W";
      }
    });

    board.append(div);
  }
}
