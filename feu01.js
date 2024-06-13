// Évaluer une expression

// Useful functions

function fromBracketToArray(array){
	let openBracket = 0
	let closeBracket = 0;
	let counter = 0;
	let newArray = [];
	
for (let i = 0 ; i < array.length ; i++){

	if (array[i].includes('(') && openBracket === closeBracket){ //(+nombre
		openBracket++
		newArray.push(array[i].replace(/[(]/g, ""))
		counter = i
	}
	else if (closeBracket === openBracket - 1 && !array[i].includes(')')){
		newArray.push(array[i])
	}
	else if (array[i].includes(')') && closeBracket === openBracket - 1){ //(+nombre
		closeBracket++
		newArray.push(array[i].replace(/[)]/, ""))
		array.splice(counter, newArray.length, newArray)
		newArray = [];
		i = counter
	}
	else {
		counter++
	}
	
	if(Array.isArray(array[i])){
		array.splice(i, counter - i + 1, fromBracketToArray(array[i]))
	}

}	
	return array
}

function calculator(arguments){
	let tempResult
	
	for (let i = 0 ; i < arguments.length ; i++){
		
	}
	
}

// Error management

function isValidArguments(arguments){
      if (arguments.length === 1){
            return arguments
      }
	else {
		return console.log("erreur : insérez une expression")
	}
}


// Parsing

function getArguments(){
      let arguments = process.argv.slice(2);
      return arguments
}


// Solving

function displayRectangle(){
      const string = isValidArguments(getArguments())[0];
      const numbers = string.split(' ');
	
      return console.log(fromBracketToArray(numbers))
      
}


// Print

displayRectangle()