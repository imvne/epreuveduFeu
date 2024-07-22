// Sudoku

// Useful functions

function testAllColors() {
	for (let i = 0; i < 256; i++) {
		const colorCode = `\x1b[38;5;${i}m`; // Code d'échappement pour la couleur
		const colorCodeExample = `'\\x1b[38;5;${i}m'`;
		console.log(`${colorCode}☗☗☗☗☗☗☗☗☗☗☗☗☗☗\x1b[0m`, colorCodeExample);
	}
}

const util = require('util');
	util.inspect.defaultOptions.depth = null; // pour afficher tout les sous tableaux dans le terminal

function readFileSync(fileName){
	const fs = require('fs')
	let readOptions = {
		encoding : 'utf-8',
		flag : 'r'
	}
	
	return fs.readFileSync(fileName, readOptions)
}

function fromTxtToMatrix(string){
	const txtToArray = string.split('\n')
	
	let subArray = [];
	const txtToSubArrays = [];
	
	for (string of txtToArray){
		for (let i = 0 ; i < string.length ; i++){
			subArray.push(parseInt(string[i]))
			
		}
		txtToSubArrays.push(subArray)
		subArray = [];
	}
	
	return txtToSubArrays
}

function whichBox(row, col) { // pour avoir les coordonnées des intervalles du carré des 9 de la grille dans lequel se trouve la case [row, col]
	let rowInterval = [];
	let colInterval = [];
	
	if (row >= 0 && row <= 2){
		rowInterval.push(0, 2)
	} else if (row >= 3 && row <= 5){
		rowInterval.push(3, 5)
	} else if (row >= 6 && row <= 8){
		rowInterval.push(6, 8)
	}
	
	if (col >= 0 && col <= 2){
		colInterval.push(0, 2)
	} else if (col >= 3 && col <= 5){
		colInterval.push(3, 5)
	} else if (col >= 6 && col <= 8){
		colInterval.push(6, 8)
	}
	
	return [rowInterval, colInterval]
}

function numberIsNotTaken(grid, r, c, num){ // pour savoir si un nombre donné est déjà pris dans la ligne, colonne ou carré de la case [r, c]
	
	// est ce que num est déjà dans la ligne ? si oui notInRow = false
	
	for (column of grid[r]) {
		if (column === num){
			return false
		}
	}
	
	// est ce que num est déjà dans la colonne ? si oui notInColumn = false
	
	for (row of grid) {
		if (row[c] === num){
			return false
		}
	}
	
	// est ce que num est déjà dans le carré ? si oui notInSquare = false
	
	let squareRows = whichBox(r, c)[0]
	let squareColumns = whichBox(r, c)[1]
	
	for (let i = squareRows[0]; i <= squareRows[1]; i++) {
		for (let j = squareColumns[0]; j <= squareColumns[1]; j++) {
			if (grid[i][j] === num){
				return false
			}
		}
	}
	
	// si num n'est pas déjà dans la ligne, la colonne ou le carré alors numberIsNotTaken = true, je peux mettre num dans la case [row, col]
	
	return true
	
	
}

function solveSudoku (grid){
	
	for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (numberIsNotTaken(grid, i, j, num)) {
                            grid[i][j] = num;
                            if (solveSudoku(grid)) {
                                return grid;
                            }
                            grid[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return grid
}

// Error management

function isValidArguments(arguments){
      if (arguments.length === 1){
            return arguments
      }
	else {
		return console.log("erreur : insérez un argument")
	}
}

function checkSudokuGrid(grid){ // vérifie si la grille totalement remplie est valide, en additionnant chaque ligne, colonne, case
	
	 // vérification que chaque ligne, colonne, et carré 3x3 vaut 45
	 for (let i = 0; i < 9; i++) {
		let rowSum = 0, colSum = 0;
		let boxSum = 0;
    
		for (let j = 0; j < 9; j++) {
		    rowSum += grid[i][j];
		    colSum += grid[j][i];
    
		    let rowStart = 3 * Math.floor(i / 3);
		    let colStart = 3 * (i % 3);
		    boxSum += grid[rowStart + Math.floor(j / 3)][colStart + (j % 3)];
		}
    
		if (rowSum !== 45 || colSum !== 45 || boxSum !== 45) {
		    return `\x1b[38;5;196mIl y a une erreur dans la grille\x1b[0m`;
		}
	  }
	  return `\x1b[38;5;113mLa grille est validée\x1b[0m`;
}

// Parsing

function getArguments(){
      let arguments = process.argv.slice(2);
      return arguments
}


// Solving

function displayTheSudokuSolved(){
      const arguments = isValidArguments(getArguments());
	
	if(!arguments){
		return
	}
	
	const sudokuGrid = readFileSync(arguments[0]).replace(/\./g, '0')
	const matrixSudoku = fromTxtToMatrix(sudokuGrid)
	const toSolveSudoku = JSON.parse(JSON.stringify(matrixSudoku))
	
	let sudoku = ""
	let matrixSudokuSolved = ""
	
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrixSudoku[i][j] === 0) {
				sudoku += `\x1b[38;5;236m${matrixSudoku[i][j]}\x1b[0m `
				matrixSudokuSolved += `\x1b[38;5;32m${solveSudoku(toSolveSudoku)[i][j]}\x1b[0m `
			} else {
				sudoku += `${toSolveSudoku[i][j]} `
				matrixSudokuSolved += `${solveSudoku(toSolveSudoku)[i][j]} `
			}
			if (j === 2 || j === 5 || j === 8){
				sudoku += "  "
				matrixSudokuSolved += "  "
			}
		}
		if (i === 2 || i === 5 || i === 8){
			sudoku += `\n`
			matrixSudokuSolved += `\n`
		}
		sudoku += `\n`
		matrixSudokuSolved += `\n`
	}
	
	const result = `${sudoku}\n${matrixSudokuSolved}${checkSudokuGrid(solveSudoku(toSolveSudoku))}`
	
      return console.log(result)
      
}


// Print

displayTheSudokuSolved()