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


// inicializarCeldas(3, 3);

const Gameboard = () => {
	let tableroArray = [];
	let squar = document.querySelectorAll("div.square");
	squar.forEach(square => tableroArray.push(square));
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
	let player1 = Player("Player 1", "X");
	let player2 = Player("Player 2", "O");
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


function beginGame(){

	inicializarCeldas(3, 3);
	return addInteractionWithInterface()
	

}

let interaction = beginGame();


function addInteractionWithInterface(){

	const game = Game();
	function interaction(e){
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
	}
	const squares=document.querySelectorAll("div.square");
	squares.forEach(square =>
		square.addEventListener("click", interaction)
	)
	this.removeListeners =()=>{
		squares.forEach(square =>{
			square.removeEventListener("click",interaction)
		})
	}
	return {squares,removeListeners}
}

const endGame = (winnerName) => {
	let message = document.querySelector("#winnerMessage");
	let buttonContainer = document.querySelector("#newGameContainer");
	message.innerText = `The winner is ${winnerName}`;
	buttonContainer.innerHTML=`<button id="newGameButton">New Game</div>`

	interaction.removeListeners();

	document.querySelector("#newGameButton").addEventListener("click",()=>{
		
		document.querySelector(".boardContainer").innerHTML="";
		beginGame();
		addInteractionWithInterface()
		buttonContainer.innerHTML=""
		message.innerHTML=""
	})
}

