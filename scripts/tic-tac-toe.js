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


// const Solucion = () => {
// 	// let primeraFila = 0;
// 	// let segundaFila = 0
// 	// let tercerFila = 0;
// 	let soluciones=new Array(12).fill(0);
// 	this.sumarSolucion = (i,j) => {
// 		let index=i+3*j;
// 		switch(index){
// 			case 0:
// 				soluciones[0]++;
// 				soluciones[3]++;
// 				soluciones[6]++;
// 				soluciones[9]++;
// 				soluciones[11]++;
// 				return;
// 			case 1:
// 				soluciones[0]++;
// 				soluciones[4]++;
// 				soluciones[10]++;
// 				return;
// 			case 2:
// 				soluciones[0]++;
// 				soluciones[5]++;
// 				soluciones[7]++;
// 				soluciones[8]++;
// 				return;
// 			case 3:
// 				soluciones[1]++;
// 				soluciones[3]++;
// 				soluciones[8]++;
// 				return;
// 			case 4:
// 				soluciones[1]++;
// 				soluciones[4]++;
// 				soluciones[6]++;
// 				soluciones[7]++;
// 				return;
// 			case 5:
// 				soluciones[1]++;
// 				soluciones[5]++;
// 				soluciones[9]++;
// 				soluciones[10]++;
// 				soluciones[11]++;
// 				return;
// 			case 6:
// 				soluciones[2]++;
// 				soluciones[3]++;
// 				soluciones[7]++;
// 				soluciones[10]++;
// 				return;
// 			case 7:
// 				soluciones[2]++;
// 				soluciones[4]++;
// 				soluciones[8]++;
// 				soluciones[9]++;
// 				soluciones[11]++;
// 				return;
// 			case 8:
// 				soluciones[2]++;
// 				soluciones[5]++;
// 				soluciones[6]++;
// 		}
// 	}
// 	return {soluciones,sumarSolucion}
// }



const Gameboard = () => {
	let tableroArray = [];
	squares.forEach(square => tableroArray.push(square));
	let board = [tableroArray.slice(0, 3), tableroArray.slice(3, 6), tableroArray.slice(6, 9)];
	this.contenido = (i,j) => {
		return board[i][j].textContent;
	}
	this.estaOcupado = (i, j) => {
		return contenido(i,j) != "" ? true : false;
	}

	
	return { board, contenido, estaOcupado }
}


squares.forEach(square =>
	square.addEventListener("click", (e) => {
		let element = e.target;
		if (element.innerHTML == "") {
			element.classList.add("completed");
			element.innerHTML = game.actualPiece();
			game.changeTurn();
		}
	})
)


