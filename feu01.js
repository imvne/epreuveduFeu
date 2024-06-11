// Évaluer une expression

// Useful functions

function expressionToArray(string){
	const numbersArray = [];
	const expression = ""; 
	for (let i = 0 ; i < string ; i++){
		if (!isNaN(string[i])){
			numbersArray.push(string[i])
		}
		if (string[i] === '('){
			
			expression += string[i]
		}
	}
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

function isPositiveInteger(number){
	if (number > 0 && Number.isInteger(Number(number))){ // n'inclus pas le zéro
		return parseInt(number);
	} else {
		return console.log("erreur : n'insérez que des entiers positifs")
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
      const numbers = [];
	
	
      return console.log(string)
      
}


// Print

displayRectangle()