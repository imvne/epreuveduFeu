// Sudoku

// Useful functions

function testAllColors() {
	for (let i = 0; i < 256; i++) {
		const colorCode = `\x1b[38;5;${i}m`; // Code d'échappement pour la couleur
		const colorCodeExample = `'\\x1b[38;5;${i}m'`;
		console.log(`${colorCode}☗☗☗☗☗☗☗☗☗☗☗☗☗☗\x1b[0m`, colorCodeExample);
	}
}

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

function containsThisNumber(binaryNumber, binaryNumberToFind){
	const decimalNumber = parseInt(binaryNumber, 2)
	const mask = parseInt(binaryNumberToFind, 2)
	return (decimalNumber & mask) !== 0 // [binaryNumber, binaryNumberToFind, (decimalNumber & mask) !== 0]
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
	
	let notInRow = true;
	
	for (column of grid[r]) {
		if (column === num){
			notInRow = false;
		}
	}
	
	// est ce que num est déjà dans la colonne ? si oui notInColumn = false
	
	let notInColumn = true;
	
	for (row of grid) {
		if (row[c] === num){
			notInColumn = false;
		}
	}
	
	// est ce que num est déjà dans le carré ? si oui notInSquare = false
	
	let squareRows = whichBox(r, c)[0]
	let squareColumns = whichBox(r, c)[1]
	
	let notInSquare = true;
	
	for (let i = squareRows[0]; i <= squareRows[1]; i++) {
		for (let j = squareColumns[0]; j <= squareColumns[1]; j++) {
			if (grid[i][j] === num){
				notInSquare = false
			}
		}
	}
	
	// si num n'est pas déjà dans la ligne, la colonne ou le carré alors numberIsNotTaken = true, je peux mettre num dans la case [row, col]
	
	if (notInRow, notInColumn, notInSquare){
		return true
	} else {
		return false
	}
	
	
}

function takenNumbers(grid, r, c){ // pour savoir les nombres qu'on ne peut pas mettre dans une case vide (déjà présents soit dans la colonne, la ligne, ou le carré)

	let banNumbers = []
	
	// nombres déjà pris dans la ligne
	
	for (let column of grid[r]) {
		if (column !== 0 && !banNumbers.includes(column)){
			banNumbers.push(column)
			
		}
	}
	
	// nombres déjà pris dans la colonne
	
	for (let row of grid){
		if (row[c] !== 0 && !banNumbers.includes(row[c])){
			banNumbers.push(row[c])
		}
	}
	
	// nombres déjà pris dans la case
	
	let squareRows = whichBox(r, c)[0]
	let squareColumns = whichBox(r, c)[1]
	
	for (let i = squareRows[0]; i <= squareRows[1]; i++) {
		for (let j = squareColumns[0]; j <= squareColumns[1]; j++) {
			if (grid[i][j] !== 0 && !banNumbers.includes(grid[i][j])){
				banNumbers.push(grid[i][j])
			}
		}
	}
	
	return banNumbers.sort()
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
	
	const sudoku = readFileSync(arguments[0]).replace(/\./g, '0')
	const matrixSudoku = fromTxtToMatrix(sudoku)
	
      return console.log(matrixSudoku)
      
}


// Print

displayTheSudokuSolved()