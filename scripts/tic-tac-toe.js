const addBoard = (files, rows) => {
	const addSquare = () => '<div class="square">&nbsp</div>';

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

addBoard(3, 3);

document.querySelectorAll("div.square").forEach(square =>{
	square.addEventListener("click",(e)=>{
		let element= e.target;
		element.classList.add("completed");
		element.innerHTML="X";
	})
})

