// Générateur de plateau "trouver le plus grand carré"

// Useful functions

function gridGenerator(){
	const numOfLines = Math.floor(Math.random() * (12 - 6) + 6)
	const numOfColumns = Math.floor(Math.random() * (27 - 6) + 6)
	const emptyPiece = "."
	const obstaclePiece = "x"
	const piece = "o"
	
	
	let emptyPiecesProportion = [numOfColumns- 1, numOfLines*2-2]
	const pieces = new Array(Math.floor(Math.random() * (emptyPiecesProportion[0] - emptyPiecesProportion[1]) + emptyPiecesProportion[1])).fill(emptyPiece) // ça choisit un nombre aléatoire N pour la proportion de pièces vide pour UN obstacle
			   pieces.push(obstaclePiece)
	
	let grid = [[numOfLines, emptyPiece, obstaclePiece, piece]] //[numOfLines, emptyPiece, obstaclePiece, piece] la première ligne du plateau '10.xo'
	
	for (let i = 0; i < numOfLines; i++) {
		let gridLine = []
		for (let j = 0; j < numOfColumns; j++) {
			gridLine.push(pieces[Math.floor(Math.random() * pieces.length)]) // et ici ça choisit un aléatoirement un pièce vide ou un obstacle avec 1 chance sur N de tomber sur un obstacle
			
		}
		grid.push(gridLine)
		
	}
	
	return grid
}


function displayGrid(gridArray){
	let textGrid = ""
	
	for (subArray of gridArray){
		textGrid += subArray.join("") + '\n'
	}
	
	return textGrid
	
}


// Error management

function isValidGridSize(grid){
     for (let i = 0; i < grid.length; i++) {
	const element = array[i];
	for (line of grid){
		
	     }
     }
}


// Solving

function getARandomGrid(){
	
	const randomGrid = gridGenerator(); 
	const randomGridTxt = displayGrid(randomGrid)
	
      return console.log(randomGridTxt)
      
}


// Print

getARandomGrid()
