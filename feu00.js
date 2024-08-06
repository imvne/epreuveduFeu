// Échauffement

// Useful functions

function buildRectangle(columns, lines){
	const rectangle = [];
	
	for (let i = 0 ; i < lines ; i++){
		const lineBrick = "-";
		const columnBrik = "|"
		const corner = "o"
		const whiteSpace = " ";

		if (i === 0 || i === lines-1){
			columns === 1 ? rectangle.push(corner) : 
			rectangle.push(corner + lineBrick.repeat(columns - 2) + corner)
		} else {
			columns === 1 ? rectangle.push(columnBrik) : 
			rectangle.push(columnBrik + whiteSpace.repeat(columns - 2) + columnBrik)
		}
		
	}
	return rectangle.join('\n')
}

// Error management

function isValidArguments(arguments){
      if (arguments.length === 2){
            return arguments
      }
	else {
		return console.log("erreur : insérez deux arguments")
	}
}

function isPositiveInteger(number){
	if (number > 0 && Number.isInteger(Number(number))){ // n'inclus pas le zéro
		return parseInt(number);
	} else {
		return console.log("erreur : n'insérez que des entiers positifs supérieurs à zéro")
	}
}

// Parsing

function getArguments(){
      let arguments = process.argv.slice(2);
      return arguments
}


// Solving

function displayRectangle(){
      const numbers = isValidArguments(getArguments());
      
	if (!numbers){
		return
	}
	
	for (let i = 0 ; i < numbers.length ; i++){
		if (!isPositiveInteger(numbers[i])){
			return
		} else {
			numbers[i] = isPositiveInteger(numbers[i])
		}
	}
	
      return console.log(buildRectangle(numbers[0], numbers[1]))
      
}


// Print

displayRectangle()
