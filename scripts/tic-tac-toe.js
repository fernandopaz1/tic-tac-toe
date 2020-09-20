function addSquare(){
    document.querySelector(".boardContainer").innerHTML +=  
    '<div class="square">&nbsp</div>';
}

function addSquareFile(cantColumnas){
    
    for(let i=0;i<cantColumnas;i++){
        addSquare();
    }
    document.querySelector(".boardContainer").innerHTML +=  
    '<br class="break">';   
}

function addBoard(files,rows){
    
    for(let i=0;i<files;i++){
        addSquareFile(rows);
    }
}


addBoard(3,3);

