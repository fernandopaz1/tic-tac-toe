const initializeGrids = (files, rows) => {
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

const InputNames = (game) => {
    player1 = game.getP1;
    player2 = game.getP2;
    let isShown = true;
    const btnSetName = document.querySelector("button.saveNames");
    const inputDiv = document.querySelector("div.inputDiv");
    const inputPlayer1 = document.querySelector("#player1Input");
    const inputPlayer2 = document.querySelector("#player2Input");

    this.getPlayer1Name = () => inputPlayer1.value;
    this.getPlayer2Name = () => inputPlayer2.value;

    this.changeMenuVisibility = () => {
        console.log("La visivilidad es " + isShown);

        let visibility = isShown ? "hidden" : "initial";
        inputDiv.style.visibility = visibility;
        isShown = !isShown;
    };
    this.savePlayerNames = () => {
        player1.setName(getPlayer1Name());
        player2.setName(getPlayer2Name());
    };
    this.deleteInputsValues = () => {
        inputPlayer1.value = null;
        inputPlayer2.value = null;
    };
    btnSetName.addEventListener("click", () => {
        savePlayerNames();
        changeMenuVisibility();
        deleteInputsValues();
    });
    return { changeMenuVisibility };
};

const Player = (name, piece) => {
    let playerName = name;
    let playerPiece = piece;

    this.getName = () => playerName;
    this.getPiece = () => playerPiece;
    this.equals = (player) => {
        return name == player.getName() && piece == player.getPiece();
    };
    this.toString = () => name;
    this.setName = (newName) => {
        playerName = newName;
    };
    return { getName, getPiece, equals, toString, setName };
};

const Score = () => {
    let pointsP1 = 0;
    let pointsP2 = 0;
    this.resetScore = () => {
        pointsP1 = 0;
        pointsP2 = 0;
    };
    this.countScoreP1 = () => {
        pointsP1++;
    };
    this.countScoreP2 = () => {
        pointsP2++;
    };
    this.getP1 = () => pointsP1;
    this.getP2 = () => pointsP2;
    return { resetScore, countScoreP1, countScoreP2, getP1, getP2 };
};

const WinCounter = (player1, player2) => {
    this.countWin = (player) => {
        console.log(
            `El resultado de player1.equals(player) es: ${player1.equals(
                player
            )}`
        );
        console.log(
            `El resultado de player2.equals(player) es: ${player2.equals(
                player
            )}`
        );
        if (player1.equals(player)) score.countScoreP1();
        if (player2.equals(player)) score.countScoreP2();
    };
    this.resetCounter = () => {
        score.resetScore;
    };
    this.toString = () => {
        return `${player1.toString()} has ${score.getP1()} points and 
				${player2.toString()} has ${score.getP2()} points`;
    };
    return { countWin, resetCounter, toString };
};

const Gameboard = () => {
    let boardArray = [];
    let squar = document.querySelectorAll("div.square");
    squar.forEach((square) => boardArray.push(square));
    let board = [
        boardArray.slice(0, 3),
        boardArray.slice(3, 6),
        boardArray.slice(6, 9),
    ];
    this.content = (i, j) => {
        return board[i][j].textContent;
    };

    function winInTheFile(i, piece) {
        let result = true;
        for (let j = 0; j < 3; j++) {
            result = result && content(i, j) == piece;
        }
        return result;
    }
    function winInTheRow(i, piece) {
        let result = true;
        for (let j = 0; j < 3; j++) {
            result = result && content(j, i) == piece;
        }
        return result;
    }
    function winInTheRightDiagonal(piece, despl) {
        let result = true;
        for (let j = 0; j < 3; j++) {
            result = result && content((j + despl) % 3, j) == piece;
        }
        return result;
    }

    function winInTheLeftDiagonal(piece, despl) {
        let result = true;
        for (let j = 0; j < 3; j++) {
            result = result && content((j + despl) % 3, 2 - j) == piece;
        }
        return result;
    }

    const ganador = (piece) => {
        let result = false;
        for (let i = 0; i < 3; i++) {
            result = result || winInTheRow(i, piece);
            result = result || winInTheFile(i, piece);
        }
        result = result || winInTheRightDiagonal(piece, 0);
        result = result || winInTheLeftDiagonal(piece, 0);
        return result;
    };

    const isATie = () => {
        let isATie = true;
        for (let i = 0; i < 9; i++) {
            isATie = isATie && content(Math.trunc(i / 3), i % 3) != "";
        }
        return isATie;
    };

    return { winner: ganador, isATie };
};

const Game = () => {
    let player1 = Player("A", "X");
    let player2 = Player("B", "O");
    let turn = true;
    let inputNames = InputNames(player1, player2);
    let board = Gameboard();
    let counter = WinCounter(player1, player2);

    this.changeTurn = () => {
        turn = !turn;
    };

    this.getP1 = () => new Player(player1.getName, player1.getPiece);
    this.getP2 = () => new Player(player2.getName, player2.getPiece);

    this.newGame = () => {
        inputNames.changeMenuVisibility();
        counter.resetCounter();
        player1.setName(null);
        player2.setName(null);
    };

    this.actualPlayer = () => {
        return turn ? player1 : player2;
    };
    this.actualName = () => actualPlayer().getName();
    this.isWinner = () => board.winner(actualPiece());
    this.actualPiece = () => actualPlayer().getPiece();
    this.isATie = () => board.isATie();

    this.actualizeInputNames = () => {
        inputNames = InputNames(player1, player2);
    };
    this.play = (element) => {
        element.innerHTML = actualPiece();
        if (isWinner()) {
            actualizeInputNames();
            counter.countWin(actualPlayer());
            interface.endGame(actualName());
        } else if (isATie()) {
            interface.draw();
        }
        changeTurn();
    };
    return { play, counter, newGame, getP1, getP2 };
};

function beginGame() {
    let message = document.querySelector("#winnerMessage");
    let interaction;
    const beginInterface = () => {
        initializeGrids(3, 3);
    };

    const setInteraction = () => {
        beginInterface();
        interaction = addInteractionWithInterface();
    };

    setInteraction();

    const endGame = (winnerName) => {
        message.innerText = `The winner is ${winnerName}`;
        interaction.removeListeners();
    };

    const draw = () => {
        message.innerText = `Its a draw`;
        interaction.removeListeners();
    };

    return { interaction, setInteraction, endGame, draw };
}

const addEventsToButtons = (interface) => {
    let message = document.querySelector("#winnerMessage");

    document.querySelector("#restartButton").addEventListener("click", () => {
        document.querySelector(".boardContainer").innerHTML = "";
        interface.setInteraction();
        message.innerHTML = "";
    });

    document.querySelector("#newGameButton").addEventListener("click", () => {
        document.querySelector(".boardContainer").innerHTML = "";
        interface.setInteraction();
        // console.log("Esta es lainterface: " + interface.interaction);
        // console.log("Esta es game: " + interface.interaction.game);
        // console.log(
        //     "Esta es la interface: " + interface.interaction.game.toString()
        // );
        interface.interaction.game.newGame();
        // interface.interaction.counter.resetCounter();
        message.innerHTML = "";
    });

    document.querySelector("#showCounter").addEventListener("click", () => {
        message.innerHTML = interface.interaction.counter.toString();
    });
};

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

    squares.forEach((square) => square.addEventListener("click", interaction));

    this.removeListeners = () => {
        squares.forEach((square) => {
            square.removeEventListener("click", interaction);
        });
    };
    return { removeListeners, counter, game };
}

let score = Score();
let interface = beginGame();
let inputNamesTable = inputNames(iterface.game);
addEventsToButtons(interface);
