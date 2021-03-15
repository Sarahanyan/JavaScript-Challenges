export default createProblem

function createProblem(array){
        let digit = ""
        let operation = ""
        let problemArray = []
        array.forEach((value, index, array)=> {
            if (isNaN(value) && value !==".") {
                operation = value
                problemArray.push(operation)
            }
            else{
                digit += value // if next value is not an operator keep concatenating the number
                
                if ( (index === array.length - 1) || (isNaN(array[index + 1]) && array[index + 1] !== undefined && array[index + 1] !== ".") ) {
                    problemArray.push(digit)
                    digit = ""       
                }                
            }
            
        }); 
        return problemArray;

    }