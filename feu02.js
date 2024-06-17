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

function fromTxtToSubArrays(fileContent){
	const txtToArray = fileContent.split('\n')
	
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

// Error management

function isValidArguments(arguments){
      if (arguments.length === 1){
            return arguments[0]
      }
	else {
		return console.log("erreur : insérez un argument")
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
	
	if(!arguments){
		return
	}
	
	const fileContent = readFileSync(arguments)
      return console.log(fromTxtToSubArrays(fileContent))
      
}


// Print

findThePiece()