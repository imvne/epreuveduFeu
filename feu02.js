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
	let location
			
	for (let i = 0 ; i < board.length ; i++) {
		
		for (let k = 0 ; k < board[i].length ; k++) {
			
			if ((board[i][k] === piece[0][0] || piece[0][0] === " ") && !location) { // si on rencontre un match et qu'on a pas encore de coordonnées de position
				location = [k, i]
				
				for (let j = 0; j + i < piece.length; j++) {
					for (let l = 0; l + k  < piece[j].length; l++) {
						if (board[i + j][k + l] !== piece[j][l] && piece[j][l] !== " " && location){ // si on rencontre une différence et qu'on a des coordonnées de position
							location = undefined
							break
						}
					}
					
				}
				
			} 
			
		}
	}
	
	return location
} 

function displayFoundPiece(board, piece, location){
	let resultBoardLine = "";
	let resultBoardMatrix = "";
	
	if (location && piece[0]){
		let pieceLimit = [location[0] + piece[0].length, location[1] + piece.length]
			for (let i = 0; i < board.length; i++) {
				for (let k = 0; k < board[0].length; k++) {
					if (k >= location[0] && i >= location[1] && k < pieceLimit[0] && i < pieceLimit[1]){
						console.log(piece)
						while (piece[0]) {
							while (piece[0][0]) {
								piece[0][0] === " " ? resultBoardLine += `\x1b[38;5;214m - \x1b[0m` : resultBoardLine += ` \x1b[38;5;172m${piece[0][0]}\x1b[0m `
								piece[0].splice(0,1)
								break
							}
							if (piece[0].length === 0) piece.splice(0, 1)
							
							break
						}
						
						
						
					} else {
						resultBoardLine += ' - '
					}
				}
				resultBoardMatrix += `${resultBoardLine}\n`;
				resultBoardLine = "";
			}
			
		return `\x1b[38;5;49mTrouvé !\x1b[0m\nCoordonnées : ${location[0]}, ${location[1]}\n\n${resultBoardMatrix}\n`
		
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