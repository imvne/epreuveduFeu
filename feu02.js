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
	let pieceFound = [];
	let pieceFoundLine = [];
	let kLocation;
	let iLocation;
	
	for (let i = 0 ; i < board.length ; i++){
		const boardLine = board[i]
		
		for (let j = 0 ; j < piece.length ; ){
			const pieceLine = piece[j]
			
			for (let k = 0 ; k < boardLine.length ; ){
				for (let l = 0 ; l < pieceLine.length ; ){
					
					if (pieceLine[l] === ' '){
						pieceFoundLine.push('-')
						l++
					}
					
					if (boardLine[k] === pieceLine[l] && !kLocation && !iLocation){
						kLocation = k
						iLocation = i
						
						pieceFoundLine.push(pieceLine[l])
						l++
					} 
					else if(kLocation && iLocation && boardLine[k] === pieceLine[l]){
						pieceFoundLine.push(pieceLine[l])
						l++
					} 
					else if(kLocation && iLocation && boardLine[k] !== pieceLine[l]){
						pieceFoundLine.push('-')
						kLocation = undefined
						iLocation = undefined
					} 
					else {
						pieceFoundLine.push('-')
					}
					k++
					
				}
			}
			pieceFound.push(pieceFoundLine)
			pieceFoundLine = [];
			
		} 
	}
	return pieceFound
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