const calcInput = document.querySelector("#calc-input")
const resultPtag = document.querySelector("#result")
const errorPtag = document.querySelector(".input-error-alert")
console.log(calcInput);
let inputValue = ""
let formattedInput = ""
let valuesArray = []
let mathProblemArray = []
let soln = 0
resultPtag.textContent = soln
// 87+6*2+10*5-10/2

calcInput.addEventListener("input", (event) => {
    event.preventDefault()
    let calcInputValue = calcInput.value
    if (calcInputValue.includes("(") || calcInputValue.includes(")")) {
        inputValue = hasLetters(calcInputValue) || !(evenNoBrackets(calcInputValue)) ? "" : calcInputValue
    }else{
        inputValue = hasLetters(calcInputValue) ? "" : calcInputValue
    }
    // inputValue === "" && erronousInput()
    if (inputValue) {
        formattedInput = formatInput(inputValue)      
    }
    console.log();
    console.log(formattedInput);
        
    if (formattedInput) {
        if (bracketsExist(formattedInput)){
            soln = handleBracketedProblem(formattedInput)
            if(hasOperators(soln)) {
                soln = performCalculation(soln)
            }
            soln = parseFloat(soln)
        }else{
            soln = performCalculation(formattedInput)[0]
        }    
    }
    console.log("solution", soln, typeof(soln));
    resultPtag.textContent = isNaN(soln)? 0 : Number.isInteger(soln) ? soln : soln.toFixed(2)

})

function handleBracketedProblem(rearrangedInput){
        console.log("has brksts");
        let formattedInputWBrkts = rearrangedInput
        let cnt = 0
        let hasBrackets = bracketsExist(formattedInputWBrkts)
        
        while(hasBrackets){
            const foundBrackets = extractBracketPair(formattedInputWBrkts)
            console.log("beforehasBrackets:", hasBrackets);
            console.log(foundBrackets);
            const brktCalculation = foundBrackets[1]
            const brktToReplace = foundBrackets[0]
            const brktReplacement = performCalculation(brktCalculation)
            console.log("Before", cnt, formattedInputWBrkts);
            formattedInputWBrkts = formattedInputWBrkts.replace(brktToReplace, brktReplacement)
            hasBrackets = bracketsExist(formattedInputWBrkts)
            console.log("afterhasBrackets:", hasBrackets);
            console.log("After", cnt, formattedInputWBrkts);
            cnt++
        }
        return formattedInputWBrkts
    }

function performCalculation(rearrangedInput){
    valuesArray = rearrangedInput.split("")
    mathProblemArray = createProblem(valuesArray)  
    // console.log("valuesArray", valuesArray);
    // console.log("problemArray", mathProblemArray);
    const result = followBodmas(mathProblemArray)
    return result
}

function formatInput(inputValue){
        if(startsWithOp(inputValue)) {
            inputValue = inputValue.padStart(calcInputValue.length + 1,"0")
        }
        if (hasSpaces(inputValue)) {
            inputValue = replaceSpaces(inputValue)
        }
        if (hasEmptyBrackets(inputValue)) {
            inputValue = replaceEmptyBrackets(inputValue)
        }
        if (hasOfTypeBrkt(inputValue)) {
            inputValue = addOpBtwBrktnNo(inputValue)
        }
        if (hasOpThenBrkt(inputValue)) {
            inputValue = addNoBtwOpnBrkt(inputValue)
        }
        if (hasOpThenBrkt(inputValue)) {
            inputValue = addOpBtwBrktnNo(inputValue)
        }
        if(endsWithAddMinusDec(inputValue)){
            inputValue +=0
        }
        if(endsWithMultDiv(inputValue)){
            inputValue +=1
        }
       
        let manyops = hasManyOperators(inputValue)
        if(manyops){
            let count = 0
            while(manyops){
                console.log("before: ", count, manyops, inputValue);
                inputValue = replaceManyOperators(inputValue)
                manyops = hasManyOperators(inputValue)
                console.log("after: ", count, manyops, inputValue);
                count++
                //dont append many ops to input value.Solved.Allis left is brackts and spaces
            }
        }
    
        let manyDiffOps = hasDiffOpsFollow(inputValue)
        if (manyDiffOps) {
            let countD = 0
            while(manyDiffOps){
                console.log("before: ", countD, manyDiffOps, inputValue);
                inputValue = replaceDiffOpsFollow(inputValue)
                manyops = hasDiffOpsFollow(inputValue)
                console.log("after: ", countD, manyDiffOps, inputValue);
                countD++
                //dont append many ops to input value.Solved.Allis left is brackts and spaces
            }
        }
        return inputValue
    }

// function createProblem(array){
//         let digit = ""
//         let operation = ""
//         let problemArray = []
//         array.forEach((value, index, array)=> {
//             if (isNaN(value) && value !==".") {
//                 operation = value
//                 console.log("prevValue", array[index-1]);
//                 problemArray.push(operation)
//             }
//             else{
//                 digit += value // if next value is not an operator keep concatenating the number
                
//                 if ( (index === array.length - 1) || (isNaN(array[index + 1]) && array[index + 1] !== undefined && array[index + 1] !== ".") ) {
//                     problemArray.push(digit)
//                     digit = ""       
//                 }                
//             }
            
//         }); 
//         return problemArray;

//     }


// function followBodmas(array){
//     let arrAfterSimplifying = array

//     if (array.includes("%")) {
//         const arrAfterPer = simplifyProblem("%", array)
//         arrAfterSimplifying = arrAfterPer
//     }
//     if (array.includes("/")) {
//         const arrAfterDivision = simplifyProblem("/", arrAfterSimplifying)
//         arrAfterSimplifying = arrAfterDivision  
//     }
//     if (array.includes("*")) {
//         const arrAfterMultiply = simplifyProblem("*", arrAfterSimplifying)
//         arrAfterSimplifying = arrAfterMultiply   
//     }

//     if (array.includes("+")) {
//         const arrAfterAdd = simplifyProblem("+", arrAfterSimplifying)
//         arrAfterSimplifying = arrAfterAdd      
//     }

//     if (array.includes("-")) {
//         const arrAfterMinus = simplifyProblem("-", arrAfterSimplifying)
//         arrAfterSimplifying = arrAfterMinus     
//     }
//     return arrAfterSimplifying
// }

function simplifyProblem (operation, problemArr){
        let simplifiedArray = problemArr
        console.log("before", simplifiedArray);
        console.log(operation);
        while(simplifiedArray.includes(operation)){
            simplifiedArray.forEach((value, index, array) => {
                let result = 0
                if (value === operation) {
                    if (operation === "%") {
                        result = parseFloat(array[index-1]) / 100
                        array.splice(index-1, 3, result)
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
        console.log("after", simplifiedArray); 
        return simplifiedArray 
}


function erronousInput(){
    calcInput.classList.add("input-error")
    errorPtag.classList.add("show-element")
    setTimeout(() => {
        errorPtag.classList.remove("show-element")
        calcInput.classList.remove("input-error")
    }, 3000); 
}

function hasLetters(input){
    const includesLetters = /[$&_=!@#~`,>?:;"'|\\{}\[\]a-zA-Z]/g
    if(includesLetters.test(calcInput.value)){
        console.log("this has lettwrs");
    }
    return includesLetters.test(input)
}

function hasSpaces(input){
    const hasSpaces = /\s/g
    return hasSpaces.test(input)
}

function replaceSpaces(input){
    const hasSpaces = /\s/g
    input = input.replaceAll(hasSpaces, "")
    return input
}
 
function hasEmptyBrackets(input){
    const hasEmptyBrackets = /\(+\s*\)+/g
    return hasEmptyBrackets.test(input)
}

function replaceEmptyBrackets(input){
    const hasEmptyBrackets = /\(+\s*\)+/g
    input = input.replaceAll(hasEmptyBrackets, "")
    return input
}

function endsWithAddMinusDec(input){
    const endsWithAddMinusDec = /[\+ | \- | \.]$/  
    return endsWithAddMinusDec.test(input)
}

function endsWithMultDiv(input){
    const endsWithMultDiv = /[\* | \/]$/
    return endsWithMultDiv.test(input)
}

function startsWithOp(input){
    const startsWithOper = input.startsWith("+") || input.startsWith("-") ||input.startsWith("*") ||input.startsWith("/") ||input.startsWith(".") ||input.startsWith("%")
    return startsWithOper
}

function hasOperators(input){
    const opers = /[-+*/%]/g
    return opers.test(input)  
}

function hasManyOperators(input){
    const manyOps = /\+{2,}|\-{2,}|\/{2,}|\*{2,}|\%{2,}|\.{2,}/g
    return manyOps.test(input)  
}

function hasDiffOpsFollow(input){
    const diffOpsFollow = /[\+\-\*\/][\+\-\*\/]/g
    return diffOpsFollow.test(input)  
}

function replaceManyOperators(input){
    const manyAdds = /\+{2,}/g
    const manyMinus = /\-{2,}/g
    const manyMultiply = /\*{2,}/g
    const manyDivison = /\/{2,}/g

    if (manyAdds.test(input)) {
        input = input.replaceAll(manyAdds, "+")
        console.log("has many +s");
    } 
    if (manyMinus.test(input)) {
        const match = input.match(manyMinus).toString()
        const matchNo = match.length%2
        input = (matchNo === 0) ? input.replaceAll(manyMinus, "+") : input.replaceAll(manyMinus, "-")
        console.log("has many -");
    }
    if (manyMultiply.test(input)) {
        input = input.replaceAll(manyMultiply, "*")
        console.log("has many *");
    }
    if (manyDivison.test(input)) {
        input = input.replaceAll(manyDivison, "/")
        console.log("has many /");
    }
    return input
}

function replaceDiffOpsFollow(input){
    const divOtherOps = /\/[\* \+ \%]/g
    const multOtherOps =  /\*[\/ \+ \%]/g
    const addOtherOps =  /\+[\* \/ \% ]/g
    const addMinus =  /\+\-/g
    const minusminus = /\-\-/g
    const minusOtherOps =  /\-[\+ \/ \* \%]/g

    if (divOtherOps.test(input)) {
        input = input.replaceAll(divOtherOps, "/")
    } 
    if (multOtherOps.test(input)) {
        input = input.replaceAll(multOtherOps, "*")
    }
    if (addOtherOps.test(input)) {
        input = input.replaceAll(addOtherOps, "+")
    }
    if (addMinus.test(input)) {
        input = input.replaceAll(addMinus, "-")
    }
    if (minusminus.test(input)) {
        input = input.replaceAll(minusminus, "+")
    }
    if (minusOtherOps.test(input)) {
        input = input.replaceAll(minusOtherOps, "-")
    }
    return input
}

function evenNoBrackets(input){
    const openingBrackets = input.match(/\(/g)
    const closingBrackets = input.match(/\)/g)

    console.log(openingBrackets, closingBrackets);
    let bracketsMatch = false
    if (closingBrackets && closingBrackets) {
        bracketsMatch = openingBrackets.length === closingBrackets.length
    }
    console.log("evenNoBrackets", bracketsMatch);
    return bracketsMatch
}

function bracketsExist(input){
    return /\(([\d+-+*/%.+]+[\d-+*/%.+])+\)/g.test(input)
}

function extractBracketPair(input){
    return /\(([\d+-+*/%.+]+[\d-+*/%.+])+\)/g.exec(input)
}

function hasOfTypeBrkt(input){
    const ofBracket = /\d\(|\)\d/g
    return ofBracket.test(input)
}

function replaceRegex(input, matchArray, toReplace){
    for (const val of matchArray) {
        let valArr = val.split("")
        valArr.splice(1,0, toReplace)
        valArr = valArr.join("")
        console.log("valArr", valArr)
        input = input.replace(val, valArr)
        console.log(input);
    }
    return input
}

function addOpBtwBrktnNo(input){
    const ofBracket = /\d\(|\)\d/g
    const ofBracketMatch = input.match(ofBracket)

    console.log(ofBracketMatch);
    console.log(input)

    input = replaceRegex(input, ofBracketMatch, "*")
    return input
}

function hasOpThenBrkt(input){
    const opThenBrkt = /[-+.%*/][)]/g
    return opThenBrkt.test(input)
}

function addNoBtwOpnBrkt(input){
    const addMinusThenBrkt = /[-+.][)]/g
    const multDivThenBrkt = /[/*][)]/g
    const addMinusThenBrktMatch = input.match(addMinusThenBrkt)
    const multDivThenBrktMatch = input.match(multDivThenBrkt)

    if (addMinusThenBrkt.test(input)) {
        input = replaceRegex(input, addMinusThenBrktMatch, "0")
        console.log(addMinusThenBrktMatch);
    }else{
        input = replaceRegex(input, multDivThenBrktMatch, "1")
        console.log(multDivThenBrktMatch);
    }
    console.log(input)
    return input
}

