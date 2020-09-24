const Board = (files, rows) => {
	const addSquare = () => '<div class="square"></div>';

	function addSquareFile(cantColumnas) {
		let file = "";
		for (let i = 0; i < cantColumnas; i++) {
			file += addSquare();
		}
		document.querySelector(
			".boardContainer"
		).innerHTML += `<div class="file">${file}</div>`;
	}

	for (let i = 0; i < files; i++) {
		addSquareFile(rows);
	}
};

Board(3, 3);

const Player = (name, piece) => {
	this.getName = () => name;
	this.getPiece = () => piece;
	return { name, piece, getName, getPiece };
}

const Game = () => {
	let player1 = Player("hola", "X");
	let player2 = Player("chau", "O");
	let turn = true;
	this.changeTurn = () => { turn = !turn };
	this.actualPlayer = () => { return turn ? player1 : player2 };
	this.actualPiece = () => actualPlayer().getPiece();
	return { player1, player2, turn, changeTurn, actualPlayer, actualPiece }
}

const game = Game();

const squares = document.querySelectorAll("div.square");

let tableroArray = [];


squares.forEach(square => {
	
	tableroArray.push(square);

	square.addEventListener("click", (e) => {
		let element = e.target;
		if (element.innerHTML == "") {
			element.classList.add("completed");
			element.innerHTML = game.actualPiece();
			game.changeTurn();
		}
	})
})


