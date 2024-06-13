// Évaluer une expression

// Useful functions

function fromBracketToArray(array){ // transforme toutes les paires de parenthèses en sous tableau
	let openBracket = 0
	let closeBracket = 0;
	let counter = 0;
	let subArray = [];
	
	for (let i = 0 ; i < array.length ; i++){

		if (array[i].includes('(') && openBracket === closeBracket){
			openBracket++
			subArray.push(array[i].replace(/[(]/, ""))
			counter = i
		}
		else if (closeBracket === openBracket - 1 && !array[i].includes(')')){
			subArray.push(array[i])
		}
		else if (array[i].includes(')') && closeBracket === openBracket - 1){
			closeBracket++
			
			subArray.push(array[i].replace(/[)]/, ""))
			array.splice(counter, subArray.length, subArray)
			
			subArray = [];
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

function putMultDivInArrays(array){ // met toutes les divisons et multiplications dans des sous tableaux
	let counter = 0;
	
	for (let i = 0 ; i < array.length ; i++){
		const previousIndex = i-1
		const nextIndex = i+1
		if (Array.isArray(array[previousIndex])){
			array.splice(previousIndex, 1, putMultDivInArrays(array[previousIndex]))
		} else if (Array.isArray(array[nextIndex])){
			array.splice(nextIndex, 1, putMultDivInArrays(array[nextIndex]))
		}
		
		if (array[i] === "*" || array[i] === "/" && !Array.isArray(array[previousIndex]) && !Array.isArray(array[nextIndex])){
			let newArray = [array[previousIndex], array[i], array[nextIndex]]
			array.splice(counter-1, newArray.length, newArray)
			newArray = [];
		} else {
			counter++
		}
	}
	
	if (array.length === 1){
		return array[0]
	} else {
		return array
	}

}

function calculator(array){ // calcule les éléments les uns à la suite des autres

	for (let i = 0 ; i < array.length ; i++){
		
		if (Array.isArray(array[i])){
			array.splice(i, 1, calculator(array[i])[0])
			i = i - 1
		}
	}
	
	for (let i = 0 ; i < array.length ; i++){
		let tempResult;
		
		if (array[i] === "+"){
			tempResult = parseFloat(array[i-1]) + parseFloat(array[i+1])
			
		} else if (array[i] === "-"){
			tempResult = parseFloat(array[i-1]) - parseFloat(array[i+1])
			
		} else if (array[i] === "*"){
			tempResult = parseFloat(array[i-1]) * parseFloat(array[i+1])
			
		} else if (array[i] === "/"){
			tempResult = parseFloat(array[i-1]) / parseFloat(array[i+1])
			
		} else if (array[i] === "%"){
			tempResult = parseFloat(array[i-1]) % parseFloat(array[i+1])
		} 
		if (tempResult !== undefined) {
			array.splice(i-1, 3, tempResult);
			i = i - 1;
		}
	}
	
	return array
	
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

function displayResultOfCalc(){
      const argument = isValidArguments(getArguments());
	const string = argument[0]
      const numbers = string.split(' ');
	
      return console.log(calculator(putMultDivInArrays(fromBracketToArray(numbers)))[0])
      
}


// Print

displayResultOfCalc()