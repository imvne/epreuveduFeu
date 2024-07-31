// Labyrinthe

const { get } = require('http');

// Useful functions

function testAllColors() {
	for (let i = 0; i < 256; i++) {
		const colorCode = `\x1b[38;5;${i}m`; // Code d'échappement pour la couleur
		const colorCodeExample = `'\\x1b[38;5;${i}m'`;
		console.log(`${colorCode}☗☗☗☗☗☗☗☗☗☗☗☗☗☗\x1b[0m`, colorCodeExample);
	}
}

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

function findCoordinates(grid, target){ // pour trouver les coordonnées de l'entrée 1
	const result = grid.reduce((acc, row, rowIndex) => {
	    const colIndex = row.indexOf(target);
	    return colIndex !== -1 ? [rowIndex, colIndex] : acc;
	}, null);
	return result;
};

function getPossibleWays(maze, currentSquare, visitedWays, exit){
	let currentRow = currentSquare[0];
	let currentCol = currentSquare[1]
	let possibleWays = [];
	
	if (maze[currentRow][currentCol] === exit){
		return possibleWays
	}
	
	if (currentRow !== 0 && (maze[currentRow - 1][currentCol] === " " || maze[currentRow - 1][currentCol] === exit)){  // la case en haut
		possibleWays.push([currentRow - 1, currentCol])
	}
	
	if (currentCol !== maze[currentRow].length - 1 && (maze[currentRow][currentCol + 1] === " " || maze[currentRow][currentCol + 1] === exit)){  // la case à droite
		possibleWays.push([currentRow, currentCol + 1])
	}
		
	if (currentRow !== maze.length - 1 && (maze[currentRow + 1][currentCol] === " " || maze[currentRow + 1][currentCol] === exit)){  // la case en bas
		possibleWays.push([currentRow + 1, currentCol])
	}
		
	if (currentCol !== 0 && (maze[currentRow][currentCol - 1] === " " || maze[currentRow][currentCol  - 1] === exit)){  // la case à gauche
		possibleWays.push([currentRow, currentCol - 1])
	}
		
	
	
	let testLimit = possibleWays.length
	
	for (let i = 0; i < testLimit; i++) {
		for (let j = 0; j < visitedWays.length; j++){
			if (possibleWays[i][0] === visitedWays[j][0] && possibleWays[i][1] === visitedWays[j][1]){
			possibleWays.splice(i, 1)
			testLimit -= 1
			i--
			break
			}
		}
		
	}

	return possibleWays
}

let visited = []
let tempPath = []
let path = [];
let counter = 0;

function findMazeShortestWayOut(maze, currentPiece, mazeExit){ // [8,0]
	counter++
	console.log("nouvelle récursion", counter)
	visited.push(currentPiece)
	console.log(`current piece : ${currentPiece} \npath : ${tempPath.join("; ")} \nvisited : ${visited.join("; ")}\n`)
	
	if (maze[currentPiece[0]][currentPiece[1]] === mazeExit){
		console.log(tempPath.length, path.length)
		if (tempPath.length < path.length || path.length === 0){
			path = tempPath
			
		}
	}
	
	let possibleWays = getPossibleWays(maze, currentPiece, visited, "2")
	
	console.log(`possible ways : ${possibleWays}`)
		for (let i = 0; i < possibleWays.length; i++) {
			tempPath = tempPath.slice(0, tempPath.indexOf(currentPiece) + 1)
			tempPath.push(possibleWays[i])
			console.log(`option possible de ${currentPiece} numéro ${i+1}/${possibleWays.length}:  ${possibleWays[i]}\n`)
			
			findMazeShortestWayOut(maze, possibleWays[i], mazeExit)
			
			visited = visited.slice(0, visited.indexOf(possibleWays[i]) + 1)
			
		}
	
	return path
	
}

function displayMaze(mazeArray, path){
	
	for (coordinates of path){
		mazeArray[coordinates[0]].splice(coordinates[1], 1, `\x1b[38;5;123mo\x1b[0m`)
	}
	
	let mazeTxt = ""
	
	for (subArray of mazeArray){
		mazeTxt += subArray.join(" ") + '\n'
	}
	
	return mazeTxt
	
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


// Parsing

function getArguments(){
      let arguments = process.argv.slice(2);
      return arguments
}


// Solving

function displayMazeEscaped(){
      const argument = isValidArguments(getArguments());
	
	if(!argument){
		return
	}
	
	const mazeTxt = readFileSync(argument)
	const maze = fromTxtToMatrix(mazeTxt)
	
	const mazeBeginning = findCoordinates(maze, '1')
	const mazeEnd = "2"
	
	const shortestWayOut = findMazeShortestWayOut(maze, mazeBeginning, mazeEnd)
	
	return console.log(displayMaze(maze, shortestWayOut))
      
}


// Print

displayMazeEscaped()