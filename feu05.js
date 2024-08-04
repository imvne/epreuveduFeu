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

function getPossibleWays(maze, currentSquare, visitedWays, queue, exit){
	let currentRow = parseInt(currentSquare[0]);
	let currentCol = parseInt(currentSquare[1])
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
		
	
	if (visitedWays){
		possibleWays = possibleWays.filter(subArray => 
			!visitedWays.has(subArray.join(','))
		);
		
	}
	
	if (queue){
		possibleWays = possibleWays.filter(subArray => 
			!queue.has(subArray.join(','))
		);
	}
	

	return possibleWays
}

let mazeData = [
	["8,3",  "7,3", "6,3", "impasse"],
	["8,3",  "8,4", "8,5", "impasse"],
	["8,3",  "8,4", "7,4", "6,4", "6,5", "5,5", "4,5", "4,4", "impasse"],
	["8,3",  "8,4", "7,4", "6,4", "6,5", "5,5", "4,5", "4,6", "3,6", "impasse"],
	
	["8,3",  "8,4", "7,4", "6,4", "6,5", "5,5", "4,5", "4,6", "4,7", "4,8", "4,9", "sortie"],
	["8,3",  "8,4", "7,4", "6,4", "6,5", "5,5", "4,5", "4,6", "4,7", "4,8", "3,8", "impasse"],
	["8,3",  "8,4", "7,4", "6,4", "6,5", "5,5", "4,5", "4,6", "4,7", "4,8", "5,8", "impasse"],
	
	["8,3",  "8,4", "7,4", "6,4", "6,5", "5,5", "4,5", "4,6", "4,7", "3,7", "3,8", "impasse"],
	
	["8,3",  "8,4", "7,4", "6,4", "6,5", "5,5", "4,5", "4,6", "4,7", "5,7", "6,7", "7,7", "7,8", "impasse"],
]

let visited = new Set()
let queue = new Set()

function findMazeShortestWayOut(maze, currentPiece, mazeExit){ // 
	//console.log("nouvelle récursion", currentPiece)
	
	queue.add(`${currentPiece[0]},${currentPiece[1]}`);
	visited.add(`${currentPiece[0]},${currentPiece[1]}`)
	
	
	let possibleWays = getPossibleWays(maze, currentPiece, visited, queue, mazeExit)
	for (let possibleWay of possibleWays){
		queue.add(`${possibleWay[0]},${possibleWay[1]}`)
		
	}
	
	// console.log("queue : ", queue)
	// console.log("visited : ", visited)
	
	let firstIn = queue.values().next().value;
			  queue.delete(firstIn)
	
	let arrayQueue = [...queue]
	//console.log(arrayQueue)
	for (let i = 0 ; i < arrayQueue.length ; i++){
		//console.log(`${arrayQueue[0]}, itération n ${i+1}/${arrayQueue.length}\n`)
		
		if (maze[currentPiece[0]][currentPiece[1]] === mazeExit){
			break
		}
		
		findMazeShortestWayOut(maze, [arrayQueue[i].split(',')[0], arrayQueue[i].split(',')[1]], mazeExit)
		
		
		break
	}
	
	let arrayVisited = [...visited]
	let nearestWayOut = [parseInt(arrayVisited[arrayVisited.length-1].split(",")[0]),parseInt(arrayVisited[arrayVisited.length-1].split(",")[1])]
	
	let shortestPath = [nearestWayOut];
	
	for (let i = arrayVisited.length-1; i >= 0; i--) {
		let possibleWays = getPossibleWays(maze, shortestPath[shortestPath.length-1])
		for (let possibleWay of possibleWays){
			
			if (possibleWay[0] === parseInt(arrayVisited[i].split(",")[0]) && possibleWay[1] === parseInt(arrayVisited[i].split(",")[1])){
				shortestPath.push(possibleWay)
			}
		}
		
	}
	
	return shortestPath
	
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