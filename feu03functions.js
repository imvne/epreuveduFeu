function testAllColors() {
	for (let i = 0; i < 256; i++) {
		const colorCode = `\x1b[38;5;${i}m`; // Code d'échappement pour la couleur
		const colorCodeExample = `'\\x1b[38;5;${i}m'`;
		console.log(`${colorCode}☗☗☗☗☗☗☗☗☗☗☗☗☗☗\x1b[0m`, colorCodeExample);
	}
}


function containsThisNumber(binaryNumber, binaryNumberToFind){
	const decimalNumber = parseInt(binaryNumber, 2)
	const mask = parseInt(binaryNumberToFind, 2)
	return (decimalNumber & mask) !== 0 // [binaryNumber, binaryNumberToFind, (decimalNumber & mask) !== 0]
}


function numberIsNotTaken(grid, r, c, num){ // pour savoir si un nombre donné est déjà pris dans la ligne, colonne ou carré de la case [r, c]
	
	// est ce que num est déjà dans la ligne ? si oui notInRow = false
	
	let notInRow = true;
	
	for (column of grid[r]) {
		if (column === num){
			notInRow = false;
		}
	}
	
	// est ce que num est déjà dans la colonne ? si oui notInColumn = false
	
	let notInColumn = true;
	
	for (row of grid) {
		if (row[c] === num){
			notInColumn = false;
		}
	}
	
	// est ce que num est déjà dans le carré ? si oui notInSquare = false
	
	let squareRows = whichBox(r, c)[0]
	let squareColumns = whichBox(r, c)[1]
	
	let notInSquare = true;
	
	for (let i = squareRows[0]; i <= squareRows[1]; i++) {
		for (let j = squareColumns[0]; j <= squareColumns[1]; j++) {
			if (grid[i][j] === num){
				notInSquare = false
			}
		}
	}
	
	// si num n'est pas déjà dans la ligne, la colonne ou le carré alors numberIsNotTaken = true, je peux mettre num dans la case [row, col]
	
	if (notInRow, notInColumn, notInSquare){
		return true
	} else {
		return false
	}
	
	
}


function getTakenNumbers(grid, r, c){ // pour savoir les nombres qu'on ne peut pas mettre dans une case vide (déjà présents soit dans la colonne, la ligne, ou le carré)

	let banNumbers = []
	
	// nombres déjà pris dans la ligne
	
	for (let column of grid[r]) {
		if (column !== 0 && !banNumbers.includes(column)){
			banNumbers.push(column)
			
		}
	}
	
	// nombres déjà pris dans la colonne
	
	for (let row of grid){
		if (row[c] !== 0 && !banNumbers.includes(row[c])){
			banNumbers.push(row[c])
		}
	}
	
	// nombres déjà pris dans la case
	
	let squareRows = whichBox(r, c)[0]
	let squareColumns = whichBox(r, c)[1]
	
	for (let i = squareRows[0]; i <= squareRows[1]; i++) {
		for (let j = squareColumns[0]; j <= squareColumns[1]; j++) {
			if (grid[i][j] !== 0 && !banNumbers.includes(grid[i][j])){
				banNumbers.push(grid[i][j])
			}
		}
	}
	
	return banNumbers.sort()
}


function getNumbersToTry(grid, r, c) { // pour savoir les nombres qu'on peut mettre dans une case vide (pas encore présents soit dans la colonne, la ligne, ou le carré)
	
	let banNumbers = []
	
	// nombres déjà pris dans la ligne
	
	for (let column of grid[r]) {
		if (column !== 0 && !banNumbers.includes(column)){
			banNumbers.push(column)
			
		}
	}
	
	// nombres déjà pris dans la colonne
	
	for (let row of grid){
		if (row[c] !== 0 && !banNumbers.includes(row[c])){
			banNumbers.push(row[c])
		}
	}
	
	// nombres déjà pris dans la case
	
	let squareRows = whichBox(r, c)[0]
	let squareColumns = whichBox(r, c)[1]
	
	for (let i = squareRows[0]; i <= squareRows[1]; i++) {
		for (let j = squareColumns[0]; j <= squareColumns[1]; j++) {
			if (grid[i][j] !== 0 && !banNumbers.includes(grid[i][j])){
				banNumbers.push(grid[i][j])
			}
		}
	}
	
	let bannedNumbersSorted = banNumbers.sort()
	const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const numbersToTry = allNumbers.filter(num => !bannedNumbersSorted.includes(num))
	
	return numbersToTry;
}


function makeSudokuData(grid){
	let sudokuData = {};
	
	for (let i = 0; i < grid.length; i++) {
		sudokuData[`row${i}`] = {}
		for (let j = 0; j < grid[i].length; j++) {
			
			if (grid[i][j] === 0) {
				sudokuData[`row${i}`][`col${j}`] = {
					location : [i, j],
					emptyBox : true,
					bannedNumbers : getTakenNumbers(grid, i, j),
					numbersToTry : getNumbersToTry(grid, i, j),
				}
				
			} else { 
				sudokuData[`row${i}`][`col${j}`] = {
					location : [i, j],
					emptyBox : false,
				}
				
			}
		}
	}
	
	return sudokuData
}