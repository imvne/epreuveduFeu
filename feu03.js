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
			subArray.push(string[i])
			
		}
		txtToSubArrays.push(subArray)
		subArray = [];
	}
	
	return txtToArray
}

function containsThisNumber(binaryNumber, binaryNumberToFind){
	const decimalNumber = parseInt(binaryNumber, 2)
	const mask = parseInt(binaryNumberToFind, 2)
	return (decimalNumber & mask) !== 0 // [binaryNumber, binaryNumberToFind, (decimalNumber & mask) !== 0]
}

function findQueen(){
	
	const echiquier =[[1,0,0,0,0,0],
				[0,0,0,0,1,0],
				[0,0,0,0,0,0],
				[0,0,0,0,0,0],
				[0,0,0,0,0,0],
				[0,0,0,0,0,0]
			     ]
	//vérifier la colonne
	let bitmaskColumn = ""
	for (let row = echiquier.length-1; row >= 0; row--) {
		for (let col = 0; col < 1; col++) {
				console.log(row, col)
				bitmaskColumn += echiquier[row][col]
		}
	}
	
	//vérifier la ligne
	let bitmaskRow = ""
	for (let row = 0; row < 1; row++) {
		for (let col = echiquier[row].length-1; col >= 0; col--) {
				console.log(row, col)
				bitmaskRow += echiquier[row][col]
		}
	}
	
	//vérifier la diagonale
	let bitmaskDiag = ""
	for (let row = echiquier.length-1; row >= 0; row--) {
		for (let col = row; col === row; col--) {
				console.log(row, col)
				bitmaskDiag += echiquier[row][col]
		}
	}
	
	//vérifier l'anti-diagonale
	let bitmaskAntiDiag = ""
	for (let row = echiquier.length-1; row >= 0; row--) {
		let column = echiquier.length-1 - row; 
		console.log(row, column)
		bitmaskAntiDiag += echiquier[row][column]
	}
	
	return [bitmaskColumn, bitmaskRow, bitmaskDiag, bitmaskAntiDiag];
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
	
      return console.log(fromTxtToMatrix(sudoku))
      
}


// Print

displayTheSudokuSolved()