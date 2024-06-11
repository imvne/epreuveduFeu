// Échauffement

// Useful functions

function buildRectangle(columns, lines){
      
}

// Error management

function isValidArguments(arguments){
      if (arguments.length > 1){
            return true
      }
      return false
}


// Parsing

function getArguments(){
      let arguments = process.argv.slice(2);
      return arguments
}


// Solving

function displayRectangle(){
      const arguments = getArguments();
      
      if (!isValidArguments(arguments)){
            return "erreur : insérez au moins deux arguments"
      }
      else {
            return arguments
      }
}


// Print

console.log(displayRectangle())
