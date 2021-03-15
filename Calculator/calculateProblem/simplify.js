export function simplifyProblem (operation, problemArr){
        let simplifiedArray = problemArr
        // console.log("before", simplifiedArray);
        // console.log(operation);
        while(simplifiedArray.includes(operation)){
            simplifiedArray.forEach((value, index, array) => {
                let result = 0
                if (value === operation) {
                    if (operation === "%") {
                        result = parseFloat(array[index-1]) / 100
                        array.splice(index-1, 2, result)
                    }
                    if (operation === "/") {
                        if (array[index+1] === "-") {
                            console.log(parseFloat(array[index-1]) + "/" + parseFloat(array[index+1].concat(array[index+2])));
                            result = parseFloat(array[index-1]) / parseFloat(array[index+1].concat(array[index+2]))
                            array.splice(index-1, 4, result)
                        }else{
                            result = parseFloat(array[index-1]) / parseFloat(array[index+1])
                            array.splice(index-1, 3, result)
                        }                        
                    }
                    else if (operation === "*") {
                        if (array[index+1] === "-") {
                            result = parseFloat(array[index-1]) * parseFloat(array[index+1].concat(array[index+2]))
                            array.splice(index-1, 4, result)
                        }else{
                            result = parseFloat(array[index-1]) * parseFloat(array[index+1])
                            array.splice(index-1, 3, result)
                        }               
                    }else if (operation === "+") {
                        result = parseFloat(array[index-1]) + parseFloat(array[index+1])
                        array.splice(index-1, 3, result)               
                    }else if (operation === "-") {
                        result = parseFloat(array[index-1]) - parseFloat(array[index+1])         
                        array.splice(index-1, 3, result)               
                    }
                }
                simplifiedArray = array
            })
        } 
        // console.log("after", simplifiedArray); 
        return simplifiedArray 
}

