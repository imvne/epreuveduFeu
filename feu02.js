// Trouver une forme

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

function fromTxtToMatrix(fileName){
	const txtToArray = readFileSync(fileName).split('\n')
	
	let subArray = [];
	const txtToSubArrays = [];
	
	for (string of txtToArray){
		for (let i = 0 ; i < string.length ; i++){
			subArray.push(string[i])
			
		}
		txtToSubArrays.push(subArray)
		subArray = [];
	}
	
	return txtToSubArrays
}

function findPieceInBoard(board, piece){
	let location;
			
	for (let i = 0 ; i < board.length ; i++) {
		
		for (let k = 0 ; k < board[0].length ; k++) {
			if (!location) {
				
				if (board[i][k] === piece[0][0] || piece[0][0] === " ") {
					location = [k, i]
					
					for (let j = 0; j < piece.length; j++) {
						for (let l = 0; l < piece[j].length; l++) {
							if (board[i + j][k + l] !== piece[j][l] && piece[j][l] !== " "){
								location = []
								break
							}
							
						}
						if (!location){
							break
						}
					}
				} 
			}
		}
	}
	if (location.length === 0) {
		return null
	} else {
		return location
	}  
} 

function displayFoundPiece(board, piece, location){
	let resultLine = "";
	let resultMatrix = "";
	
	if (location){
		let pieceLimit = [location[0] + piece[0].length, location[1] + piece.length]
		
		for (let i = 0; i < board.length; i++) {
			for (let k = 0; k < board[0].length; k++) {
				if (k >= location[0] && i >= location[1] && k < pieceLimit[0] && i < pieceLimit[1]){
					
					while (piece[0] !== null) {
						while (piece[0][0] !== null) {
							piece[0][0] === " " ? resultLine += ' - ' : resultLine += ` \x1b[38;5;172m${piece[0][0]}\x1b[0m `
							piece[0].splice(0,1)
							break
						}
						if (piece[0].length === 0) piece.splice(0, 1)
						 
						break
					}
					
					
					
				} else {
					resultLine += ' - '
				}
			}
			resultMatrix += `${resultLine}\n`;
			resultLine = "";
		}
		
		return `\x1b[38;5;49mTrouvé !\x1b[0m\nCoordonnées : ${location[0]}, ${location[1]}\n\n${resultMatrix}`
		
	} 
	
	return `\x1b[38;5;196mIntrouvable :(\x1b[0m`
	
}


// Error management

function isValidArguments(arguments){
      if (arguments.length === 2){
            return arguments
      }
	else {
		return console.log("erreur : insérez deux argument")
	}
}


// Parsing

function getArguments(){
      let arguments = process.argv.slice(2);
      return arguments
}


// Solving

function findThePiece(){
      const arguments = isValidArguments(getArguments());
	
	if(!arguments){
		return
	}
	
	const board = fromTxtToMatrix(arguments[0])
	const piece = fromTxtToMatrix(arguments[1])
	const pieceLocation = findPieceInBoard(board, piece)
	
      return console.log(displayFoundPiece(board, piece, pieceLocation))
      
}


// Print

findThePiece()