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
}

const inputNames = () => {
	const inputDiv = document.querySelector("div.inputDiv")
	const namesContainer = document.createElement("div.namesContainer");
	const name1Container = document.createElement("div.n1Container")
	const name2Container = document.createElement("div.n2Container")
	namesContainer.appendChild(name1Container);
	namesContainer.appendChild(name2Container);

	const message1 = document.createElement("h1.nameMesage");
	const message2 = document.createElement("h1.nameMesage");

	message1.textContent="Input player1's name";
	message2.textContent="Input player2's name";


	const name1 = document.createElement("input")
	const name2 = document.createElement("input")
	name1.setAttribute('type', 'text');
	name2.setAttribute('type', 'text');

	name1Container.appendChild(message1);
	name1Container.appendChild(name1);
	
	name2Container.appendChild(message2);
	name2Container.appendChild(name2);

	const btnSetName =document.createElement("button.saveNames")
	btnSetName.textContent="Guardar";
	namesContainer.appendChild(btnSetName);

	inputDiv.appendChild(namesContainer);
	inputDiv.appendChild(btnSetName);

	this.showNameInput = () => {
		inputDiv.style= "display:flex;";
	}
	return {showNameInput}
}

let input = inputNames();
input.showNameInput();

const Player = (name, piece) => {
	this.getName = () => name;
	this.getPiece = () => piece;
	this.equals = (player) => {
		console.log(`Este es el nombre del ganador `)
		return name == player.getName() && piece == player.getPiece();
	}
	this.toString = () => name;
	return { getName, getPiece, equals, toString };
}

const Score = () => {
	let pointsP1 = 0;
	let pointsP2 = 0;
	this.resetScore = () => {
		pointsP1 = 0;
		pointsP2 = 0;
	}
	this.countScoreP1 = () => { pointsP1++ }
	this.countScoreP2 = () => { pointsP2++ }
	this.getP1 = () => pointsP1;
	this.getP2 = () => pointsP2;
	return { resetScore, countScoreP1, countScoreP2, getP1, getP2 }
}

const WinCounter = (player1, player2) => {
	this.countWin = (player) => {
		console.log(`El resultado de player1.equals(player) es: ${player1.equals(player)}` );
		console.log(`El resultado de player2.equals(player) es: ${player2.equals(player)}` );
		if (player1.equals(player)) score.countScoreP1();
		if (player2.equals(player)) score.countScoreP2();
	}
	this.resetCounter = () => { score.resetScore }
	this.toString = () => {
		return `${player1.toString()} has ${score.getP1()} points and 
				${player2.toString()} has ${score.getP2()} points`
	}
	return { countWin, resetCounter, toString }
}


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

		}
		result = result || ganoEnLaDiagonalDerecha(pieza, 0);
		result = result || ganoEnLaDiagonalIzquierda(pieza, 0);
		return result
	}

	const isATie = () => {
		let isATie = true;
		for (let i = 0; i < 9; i++) {
			isATie = isATie && contenido(Math.trunc(i / 3), i % 3) != "";
		}
		return isATie;
	}

	return { ganador, isATie }
}


const Game = () => {
	let player1 = Player("A", "X");
	let player2 = Player("B", "O");
	let turn = true;
	let board = Gameboard();
	let counter = WinCounter(player1, player2);

	this.changeTurn = () => { turn = !turn };
	this.actualPlayer = () => { return turn ? player1 : player2 };
	this.actualName = () => actualPlayer().getName();
	this.actualPiece = () => actualPlayer().getPiece();
	this.isWinner = () => board.ganador(actualPiece());
	this.isATie = () => board.isATie();

	this.play = (element) => {
		element.innerHTML = actualPiece();
		if (isWinner()) {
			counter.countWin(actualPlayer());
			interface.endGame(actualName());
		}
		else if (isATie()) {
			interface.draw()
		}
		changeTurn();
	}
	return { play, counter };
}


function beginGame() {
	let message = document.querySelector("#winnerMessage");
	let interaction;
	const beginInterface = () => {
		inicializarCeldas(3, 3);

	}

	const setInteraction = () => {
		beginInterface();
		interaction = addInteractionWithInterface();
	}

	setInteraction();

	const endGame = (winnerName) => {
		message.innerText = `The winner is ${winnerName}`;
		interaction.removeListeners();
	}

	const draw = () => {
		message.innerText = `Its a draw`;
		interaction.removeListeners();
	}

	return { interaction, setInteraction, endGame, draw }
}

const addEventsToButtons = (interface) => {
	let message = document.querySelector("#winnerMessage");

	document.querySelector("#restartButton").addEventListener("click", () => {
		document.querySelector(".boardContainer").innerHTML = "";
		interface.setInteraction();
		message.innerHTML = "";
	})


	document.querySelector("#newGameButton").addEventListener("click", () => {
		document.querySelector(".boardContainer").innerHTML = "";
		interface.setInteraction();
		interface.interaction.counter.resetCounter();
		message.innerHTML = "";
	})

	document.querySelector("#showCounter").addEventListener("click", () => {
		message.innerHTML = interface.interaction.counter.toString();
	})
}



function addInteractionWithInterface() {
	let game = Game();
	let counter = game.counter;

	function interaction(e) {
		let element = e.target;
		if (element.innerHTML == "") {
			element.classList.add("completed");
			game.play(element);

		}
	}

	const squares = document.querySelectorAll("div.square");

	squares.forEach(square =>
		square.addEventListener("click", interaction)
	)

	this.removeListeners = () => {
		squares.forEach(square => {
			square.removeEventListener("click", interaction)
		})
	}
	return { removeListeners, counter }
}

let score = Score();
let interface = beginGame();
addEventsToButtons(interface);

