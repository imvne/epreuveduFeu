// Trouver le plus grand carré

// Useful functions


function readFileSync(fileName) {
	const fs = require('fs');
	let readOptions = {
	    encoding: 'utf-8',
	    flag: 'r'
	};
  
	try {
	    return fs.readFileSync(fileName, readOptions);
	} catch (error) {
	    if (error.code === 'ENOENT') {
		console.error(`\x1b[38;5;124merreur : le fichier est introuvable\x1b[0m`);
	    } else {
		console.error(`\x1b[38;5;124merreur : une erreur s'est produite lors de la lecture du fichier\x1b[0m`, error);
	    }
	    return null;
	}
}

function executeFileAndGetOutput(fileName) { //output du fichier testé
	const { execSync } = require('child_process');
	try {
		// Exécute le fichier synchroniquement et récupère l'output
		const output = execSync(`node ${fileName}`, { encoding: 'utf-8' });

		return output.trim()
	} 
	
	catch (error) {
		console.error(`\x1b[38;5;124merreur : erreur lors de l'exécution du fichier\x1b[0m`);
		return null;
	}
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
	
	return txtToSubArrays
}


function isASquare(grid, firstPieceLocation, squareWidth){// vérifie si ce carré contient une x dans quel cas il ne serait pas un carré
	for (let i = firstPieceLocation[0]; i < firstPieceLocation[0] + squareWidth; i++) {
		for (let j = firstPieceLocation[1]; j < firstPieceLocation[1] + squareWidth; j++) {
			if (grid[i][j] === "x"){
				return false
			}
		}
	}
	
	return true
} 


function findBiggestSquare(grid){
	let biggestSquareStored = [0, 0, 0]; // [r, c, largeur du coté]
	
	// boucle qui itère sur toute la grille
	
	for (let r = 1; r < grid.length; r++) { // commence à 1 pour ne pas compter la première ligne du plateau "5.xo"
		for (let c = 0; c < grid[r].length; c++) {
			// pour définir la zone de recherche je dois trouver sa largeur/hauteur
			
			let rZoneSquareWidth = Math.min(grid.length - r, grid[1].length - c)

			while (rZoneSquareWidth >= 2 && rZoneSquareWidth > biggestSquareStored[2]){ // tant que la zone de recherche à pour largeur/hauteur au moins 2, et qu'elle est plus grande que le dernier carré trouvé
				
				if (isASquare(grid, [r, c], rZoneSquareWidth) === true){
					biggestSquareStored = [r, c, rZoneSquareWidth]
					break
				}
				
				// boucle qui itère sur la zone de recherche
				
				researchZoneLoop : for (let i = r; i < r + rZoneSquareWidth; i++) {
					for (let j = c; j < c + rZoneSquareWidth; j++) {
						
						if (grid[i][j] === "x"){
							rZoneSquareWidth = Math.max(i - r, j - c)
							break researchZoneLoop
						}
					}
				}
				
				
				
			}
			
		}
	}
	return biggestSquareStored // contient les coordonnées du carré et la largeur du carré
	
}


function displaySolvedGrid(gridArray, biggestSquareInfos){
	const rowLocation = biggestSquareInfos[0]
	const colLocation = biggestSquareInfos[1]
	const squareWidth = biggestSquareInfos[2]
	
	let textGrid = ""
	
	for (subArray of gridArray){
		if (subArray === gridArray[0]){
			textGrid += `${gridArray[0].slice(0, -3).join("")} ${gridArray[0].slice(-3).join("")}\n`
		} else {
			
			textGrid += subArray.join(" ") + '\n'
		}
	}
	
	let textSolvedGrid = ""
	
	for (let i = 1; i < gridArray.length; i++) {
		for (let j = 0; j < gridArray[i].length; j++) {
			if (i >= rowLocation && j >= colLocation && i < rowLocation + squareWidth && j < colLocation + squareWidth){
				textSolvedGrid += `\x1b[38;5;32mo\x1b[0m `
			} else {
				textSolvedGrid += `${gridArray[i][j]} `
				
			}
			
		}
		textSolvedGrid += "\n"
	}
	
	return `${textGrid}\n${textSolvedGrid}`
	
}


// Error management

function isValidArguments(arguments){
      if (arguments.length === 1){
            return arguments[0]
      }
	else {
		return console.log(`\x1b[38;5;124merreur : insérez un plateau\x1b[0m`)
	}
}

function isValidFileFormat(fileName){
	if (fileName.slice(-3) === ".js"){
		return fileName
	} 
	
	else if (fileName.slice(-4) === ".txt"){
		return fileName
	} 
	
	else {
		return console.log(`\x1b[38;5;124merreur : insérez un plateau au format .js ou .txt\x1b[0m`)
	}
}

function isValidGrid(gridArray){
	const numberOfLines = gridArray[0].slice(0,-3).join("")
	const gridPieces = gridArray[0].slice(-3)
	
	if (gridArray.length-1 !== parseInt(numberOfLines)){
		return console.log(`\x1b[38;5;124merreur : le nombre de lignes est incorrect\x1b[0m\n`)
	}
	
	const excludeFirstElement = gridArray.length-1
	
	for (let subArray of gridArray.slice(- excludeFirstElement)) {
		if (subArray.length !== gridArray[1].length){
			return console.log(`\x1b[38;5;124merreur : toutes les lignes du plateau n'ont pas la même longueur\x1b[0m`)
		}
		
		for (let element of subArray.join("")) {
		    if (!gridPieces.includes(element)) {
			  return console.log(`\x1b[38;5;124merreur : les pièces du plateau ne correspondent pas aux pièces données\x1b[0m`)
		    }
		}
	}
	
	if (gridArray.length < 2){
		return console.log(`\x1b[38;5;124merreur : le plateau doit au moins avoir une ligne\x1b[0m`)
	}
	
	return gridArray
}


// Parsing

function getArguments(){
      let arguments = process.argv.slice(2);
      return arguments
}


// Solving

function displayTheGridSolved(){
      const argument = isValidArguments(getArguments());
	
	if(!argument){
		return
	}
	
	if (!isValidFileFormat(argument) || !readFileSync(argument)){
		return
	}
	
	if (argument.slice(-3) === ".js"){
		
		const randomGrid = fromTxtToMatrix(executeFileAndGetOutput(argument))
		const biggestSquareFound = findBiggestSquare(randomGrid)
		
		return console.log(displaySolvedGrid(randomGrid, biggestSquareFound))
		
	} else if (argument.slice(-4) === ".txt"){
		
		const grid = fromTxtToMatrix(readFileSync(argument))
		const biggestSquareFound = findBiggestSquare(grid)
		
		if (!isValidGrid(grid)){
			return
		}
		
		
		return console.log(displaySolvedGrid(grid, biggestSquareFound))
		
	}
      
}


// Print

displayTheGridSolved()