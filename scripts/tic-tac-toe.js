function addSquare() {
  return '<div class="square">&nbsp</div>';
}

function addSquareFile(cantColumnas) {
  let file = "";
  for (let i = 0; i < cantColumnas; i++) {
    file += addSquare();
  }
  document.querySelector(
    ".boardContainer"
  ).innerHTML += `<div class="file">${file}</div>`;
}

function addBoard(files, rows) {
  for (let i = 0; i < files; i++) {
    addSquareFile(rows);
  }
}

addBoard(3, 3);
