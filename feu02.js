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
	
	let pieceWidth = piece[0].length
	let pieceHeight = piece.length
	let boardWidth = board[0].length
	let boardHeight = board.length
	
	let kLocation;
	let iLocation;
	
	let kTestLimit;
	let iTestLimit = boardHeight
	
	for (let i = 0 ; i < iTestLimit ; i++){
		const boardLine = board[i]
		kTestLimit = boardWidth
		
		for (let j = 0 ; j < pieceHeight ; ){
			const pieceLine = piece[j]
			
			for (let k = 0 ; k < kTestLimit ; ){
				for (let l = 0 ; l < pieceWidth ; ){
		
					if (!kLocation && !iLocation){
						if (boardLine[k] === pieceLine[l]){
							kLocation = k
							iLocation = i
							kTestLimit = kLocation + pieceWidth
							iTestLimit = iLocation + pieceHeight
							k = kLocation
							
							l++
							
						} else if(pieceLine[l] === ' '){
							kLocation = k
							iLocation = i
							k++
						} else {
							k++
						}
					} 
					else if(kLocation && iLocation){
						if (boardLine[k] === pieceLine[l]){
							l++
							k++
							
						} else if (boardLine[k] !== pieceLine[l]){
							k = kLocation + 1
							i = iLocation
							l = 0;
							j = 0;
							kLocation = undefined
							iLocation = undefined
							
						} else if(pieceLine[l] === ' '){
							continue
						}
					} 
					
					if (l === pieceWidth.length-1){
						j++
					}
					
				}
			}
			
		} 
	}
	
	return [l, k, j, i]
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