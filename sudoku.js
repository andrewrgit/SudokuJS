const gridSize = 8; //0-based size representing length and height of square sudoku grid

var grid = document.getElementById("grid");

var gridArray = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];

var uRow = 0;
var uCol = 0;

function populateGridFromArray(){
    for(let i = 0; i <= gridSize; i++){
        for(let j = 0; j <= gridSize; j++){
            grid.rows[i].cells[j].children[0].value = gridArray[i][j];
        }
    }
}

function populateArrayFromGrid(){
    for(let i = 0; i <= gridSize; i++){
        for(let j = 0; j <= gridSize; j++){
            gridArray[i][j] = parseInt(grid.rows[i].cells[j].children[0].value);
        }
    }
}

function isNumLegal(number, row, index){
    if(!isNumInRow(number, row) 
        && !isNumInColumn(number, index) 
        && !isNumInBox(number, row, index)){
        return true;
    }
    else{
        return false;
    }
}

function isNumInColumn(number, column){
    for(let i = 0; i <= gridSize; i++){
        if(gridArray[i][column] == number){
            return true;
        }
    }
    return false;
}

function isNumInRow(number, row){
    for(let i = 0; i <= gridSize; i++){
        if(gridArray[row][i] == number){
            return true;
        }
    }
    return false;
}

function isNumInBox(number, row, index){
    let boxRowStart, boxColumnStart;

    //Find box position row wise
    if(index <= 2){
        boxColumnStart = 0;
    }
    else if(index > 2 && index <= 5){
        boxColumnStart = 3;
    }
    else{
        boxColumnStart = 6;
    }

    //Find box position column wise
    if(row <= 2){
        boxRowStart = 0;
    }
    else if(row > 2 && row <= 5){
        boxRowStart = 3;
    }
    else{
        boxRowStart = 6;
    }


    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(gridArray[boxRowStart + i][boxColumnStart + j] == number){
                return true;
            }
        }
    }
    return false;
}

function isAnyCellEmpty(){
    for(let i = 0; i <= gridSize; i++){
        for(let j = 0; j <= gridSize; j++){
            if(gridArray[i][j] == 0){
                uRow = i;
                uCol = j;
                return true;
            }
        }
    }
    return false;
}

function solveSudoku(){

    if(!isAnyCellEmpty()){
        return true;
    }

    for(let num = 1; num <= 9; num++){
        if(isNumLegal(num, uRow, uCol)){

            gridArray[uRow][uCol] = num;

            if(solveSudoku()){
                return true;
            }


            gridArray[uRow][uCol] = 0;

        }
    }

    uCol--;
    return false;
}

function generateSudoku(){
    let btn = document.getElementById("generateBtn");
    btn.disabled = true;
    grid.style.opacity = "0.3";

    generateSudokuHelper();
    
    while(!solveSudoku()){
        generateSudokuHelper();
    }

    populateGridFromArray();
    removeRandomSquares();



    btn.disabled = false;
    grid.style.opacity = "1.0";
}

function resetGridArray(){
    for(let i = 0; i <= gridSize; i++){
        for(let j = 0; j <= gridSize; j++){
            gridArray[i][j] = 0;
        }
    }

    for(let i = 0; i <= gridSize; i++){
        for(let j = 0; j <= gridSize; j++){
            let input = grid.rows[i].cells[j].children[0];
            input.readOnly = false;
            input.style.backgroundColor = "rgb(255, 255, 255)";
        }
    }
    
}

function generateSudokuHelper(){
    resetGridArray();
    for(let i = 0; i < gridSize; i++){
        let num = Math.floor(Math.random() * 9) + 1; 
        while(!isNumLegal(num, 0, i)){
            num = Math.floor(Math.random() * 9) + 1;  
        }
        gridArray[0][i] = num;
    }
    for(let i = 0; i < 25; i++){
        let num = Math.floor(Math.random() * 9) + 1;  
        let row = Math.floor(Math.random() * 9);  
        let col = Math.floor(Math.random() * 9);
        while(!isNumLegal(num, row, col)){
            num = Math.floor(Math.random() * 9) + 1;  
            row = Math.floor(Math.random() * 9);  
            col = Math.floor(Math.random() * 9);
        }
        gridArray[row][col] = num;
    }
}

function removeRandomSquares(){
    
    for(let i = 0; i < 20; i++){
        let row = Math.floor(Math.random() * 9);  
        let col = Math.floor(Math.random() * 9);
        while(grid.rows[row].cells[col].children[0].value == ""){
            row = Math.floor(Math.random() * 9);  
            col = Math.floor(Math.random() * 9);
        }
        grid.rows[row].cells[col].children[0].value = ""
    }

    for(let i = 0; i <= gridSize; i++){
        for(let j = 0; j <= gridSize; j++){
            let input = grid.rows[i].cells[j].children[0];
            if(input.value == ""){
                input.readOnly = false;
                input.style.backgroundColor = "rgb(200, 200, 200)";
            }
            else{
                input.readOnly = true;
            }
        }
    }
}

function checkSudoku(){
    populateArrayFromGrid();
    let isCorrect = true;
    for(let i = 0; i <= gridSize; i++){
        for(let j = 0; j <= gridSize; j++){
            let tempNum = gridArray[i][j];
            gridArray[i][j] = 0;
            if(!isNumLegal(tempNum, i, j) || isNaN(tempNum)){
                isCorrect = false; 
            }
            gridArray[i][j] = tempNum;
        }
    }
    if(isCorrect){
        alert("Solved!");
    }
    else{
        alert("Solution not correct, try again!");
    }
}
