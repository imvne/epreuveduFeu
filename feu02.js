// Trouver une forme

// Useful functions

function readFileSync(fileName){
	const fs = require('fs')
	let readOptions = {
		encoding : 'utf-8',
		flag : 'r'
	}
	
	return fs.readFileSync(fileName, readOptions)
}

function fromTxtToSubArrays(fileName){
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
	
	let pieceWidth = piece[0].length
	let pieceHeight = piece.length
	let boardWidth = board[0].length
	
	let boardFlat = board.flat()
	let whichLine = [0]
	
	let location;
	
	for (let i = 0 ; i < boardFlat.length ; ){
		
		for (let k = 0 ; k < pieceHeight ; ){
			const pieceLine = piece[k]
			
			for (let j = 0 ; j < pieceWidth ; ){
				
				if (i % 4 === 0){
					whichLine.push(i)
				}
				
				if (j === pieceWidth - 1 && location){
					whichLine.push(whichLine[whichLine.length-1] + boardWidth)
					
					i = whichLine[whichLine.length-1] + location[0]
				}
				
		
				if (!location){
					if (boardFlat[i] === pieceLine[j] || pieceLine[j] === ' '){
						location = [i - whichLine[whichLine.length-1], whichLine.length-1]
						
						i++
						j++
						
					}
				} 
				else if(location){
					if (boardFlat[i] === pieceLine[j] || pieceLine[j] === ' '){
						i++
						j++
						
					} else if (boardFlat[i] !== pieceLine[j]){
						i++
						j = 0
						k = 0
						location = undefined
						
					} 
				} 	
				
			}
			
			
		} 
	}
	
	return location
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
	const board = arguments[0]
	const piece = arguments[1]
	
	if(!arguments){
		return
	}
	
      return console.log(findPieceInBoard(fromTxtToSubArrays(board), fromTxtToSubArrays(piece)))
      
}


// Print

findThePiece()