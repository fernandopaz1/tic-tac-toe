const inicializarCeldas = (files, rows) => {
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


const Player = (name, piece) => {
	this.getName = () => name;
	this.getPiece = () => piece;
	return { name, piece, getName, getPiece };
}
inicializarCeldas(3, 3);

const Gameboard = () => {
	let tableroArray = [];
	let squares = document.querySelectorAll("div.square");
	squares.forEach(square => tableroArray.push(square));
	let board = [tableroArray.slice(0, 3), tableroArray.slice(3, 6), tableroArray.slice(6, 9)];
	this.contenido = (i, j) => {
		return board[i][j].textContent;
	}


	function ganoEnLaFila(i, pieza) {
		let result = true;
		for (let j = 0; j < 3; j++) {
			result = result && contenido(i, j) == pieza;
		}
		return result;
	}
	function ganoEnLaColumna(i, pieza) {
		let result = true;
		for (let j = 0; j < 3; j++) {
			result = result && contenido(j, i) == pieza;
		}
		return result;
	}
	function ganoEnLaDiagonalDerecha(pieza, despl) {
		let result = true;
		for (let j = 0; j < 3; j++) {
			result = result && contenido((j + despl) % 3, j) == pieza;

		}
		return result;
	}

	function ganoEnLaDiagonalIzquierda(pieza, despl) {
		let result = true;
		for (let j = 0; j < 3; j++) {
			result = result && contenido((j + despl) % 3, 2 - j) == pieza;

		}
		return result;
	}

	const ganador = (pieza) => {
		let result = false;
		for (let i = 0; i < 3; i++) {
			result = result || ganoEnLaColumna(i, pieza);
			result = result || ganoEnLaFila(i, pieza);
			result = result || ganoEnLaDiagonalDerecha(pieza, i);
			result = result || ganoEnLaDiagonalIzquierda(pieza, i);
		}
		return result
	}


	return { board, ganador }
}


const Game = () => {
	let player1 = Player("hola", "X");
	let player2 = Player("chau", "O");
	let turn = true;
	let board = Gameboard();
	this.changeTurn = () => { turn = !turn };
	this.actualPlayer = () => { return turn ? player1 : player2 };
	this.actualName = () => actualPlayer().getName();
	this.actualPiece = () => actualPlayer().getPiece();
	this.isWinner = () => board.ganador(actualPiece());
	this.play = (element) => {

	}
	return { player1, player2, turn, changeTurn, actualPlayer, actualPiece, actualName, isWinner }
}

const game = Game();

const squares = document.querySelectorAll("div.square");





squares.forEach(square =>
	square.addEventListener("click", (e) => {
		let element = e.target;
		if (element.innerHTML == "") {
			element.classList.add("completed");
			element.innerHTML = game.actualPiece();
			if (game.isWinner()) {
				endGame(game.actualName())
				return;
			}
			game.changeTurn();
		}
	})
)

const endGame = (winnerName) => {
	let message = document.querySelector("#winnerMessage");
	message.innerText = `The winner is ${winnerName}`
}

