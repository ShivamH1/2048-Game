let board;
let score = 0;
let rows = 4;
let cols = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    // board = [
    //     [2 ,2 ,2 ,2],
    //     [2 ,2 ,2 ,2],
    //     [4 ,4 ,8 ,8],
    //     [4 ,4 ,8 ,8]
    // ]

    for (let r = 0; r < rows; r++){
        for (let c = 0; c < cols; c++){
            // <div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.querySelector("#board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptytile(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < cols; c++){
            if (board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if (!hasEmptytile()){
        return;
    }

    let found = false;
    while (!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);

        if (board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile,num){
    tile.innerText = ""; //clears innertext so that we can update
    tile.classList = ""; //clears classlist during slide
    tile.classList.add("tile");
    if (num > 0){
        tile.innerText = num;
        if (num <= 4096){
            tile.classList.add("x"+num.toString());
        }else{
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
});

function filterZero(row){
    return row.filter(num => num!=0); //create new array of number without 0
}

function slide(row){
    //[0,2,2,2]
    row = filterZero(row); // [2,2,2]
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } // [4,0,2]
    row = filterZero(row); //[4,2]
    //adding zero again
    while (row.length < cols){
        row.push(0);
    } // [4,2,0,0]
    return row
}

function slideLeft(){
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < cols; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideRight(){ //need to reverse the left function
    for (let r = 0; r < rows; r++){
        let row = board[r]; //[0,2,2,2]
        row.reverse(); // [2,2,2,0]
        row = slide(row) //[4,2,0,0]
        board[r] = row.reverse(); //[0,0,2,4]
        for (let c = 0; c < cols; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideUp(){ //first convert it to row and apply left function
    for (let c = 0; c < cols; c++){
        let row = [board[0][c],board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){ //first convert it to row and apply right function
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1]; same as board[r][c] = row[r];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
