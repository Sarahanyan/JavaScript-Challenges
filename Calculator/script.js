import {formatInput} from "./formatProblem/index.js"
import {performCalculation, handleBracketedProblem} from "./calculateProblem/index.js"

const calcInput = document.querySelector("#calc-input")
const resultPtag = document.querySelector("#result")
const errorPtag = document.querySelector(".input-error-alert")
const calcBtns = document.querySelector("table")

let calcInputValue = ""
let clickInput = ""
let finalInput = calcInput.value
let inputValue = ""
let formattedInput = ""
let result = 0
resultPtag.textContent = result
// 87+6*2+10*5-10/2

calcBtns.addEventListener("click", (event) => {
    event.preventDefault()
    const txtCont = event.target.textContent
    if (txtCont === "=") {
        finalInput = formatLogic(finalInput)
        result = calculatorLogic(finalInput)
    }else if (txtCont === "C") {
        finalInput = deleteChar(finalInput)
        finalInput = formatLogic(finalInput)
        calcInput.value = finalInput
        result = calculatorLogic(finalInput)
    }else{
        clickInput = event.target.textContent
        finalInput += clickInput
        finalInput = formatLogic(finalInput)
        calcInput.value = finalInput
        result = calculatorLogic(finalInput)

    }
    resultPtag.textContent = isNaN(result)? 0 : Number.isInteger(result) ? result : result.toFixed(2)
})

calcInput.addEventListener("input", (event) => {
    event.preventDefault()
    calcInput.value = finalInput

    let keyboardInput = event.data ? event.data : ""
    if (event.inputType === "insertText") {
        finalInput += keyboardInput
        console.log("keyInputFinalInput", finalInput);
        finalInput = formatLogic(finalInput)
        console.log("keyInputFinalInputFormatted", finalInput);
        calcInput.value = finalInput
        result = calculatorLogic(finalInput)

    }else if (event.inputType === "deleteContentBackward") {
        finalInput = deleteChar(finalInput)
        finalInput = formatLogic(finalInput)
        calcInput.value = finalInput
        result = calculatorLogic(finalInput)
    }else if (event.inputType === "insertFromPaste") {
        finalInput += keyboardInput
        finalInput = formatLogic(finalInput)
        calcInput.value = finalInput

        result = calculatorLogic(finalInput)
    }else{
        finalInput += ""
    }

    result = calculatorLogic(finalInput)
    resultPtag.textContent = isNaN(result)? 0 : Number.isInteger(result) ? result : result.toFixed(2)
})

function formatLogic(input){
    let formattedInputValue = input
    input = hasLetters(input) ? "" : input        
    formattedInputValue = input

    if (formattedInputValue) {
        formattedInputValue = formatInput(formattedInputValue)
    }
    return formattedInputValue
}

function calculatorLogic(formattedInput){
    let soln = 0     
    if (formattedInput) {
        if (bracketsExist(formattedInput)){
            soln = handleBracketedProblem(formattedInput)
            if(hasOperators(soln)) {
                soln = performCalculation(soln)
            }
        }else{
            soln = performCalculation(formattedInput)[0]
        }    
        soln = parseFloat(soln)
    }
    // console.log("solution", soln, typeof(soln));
    return soln
}

function deleteChar(input){
    const finalInputArrr = input.split("")
    // console.log("before", finalInputArrr);
    finalInputArrr.pop()
    // console.log("afterpop", finalInputArrr);
    input = finalInputArrr.join("")
    return input
}

function hasLetters(input){
    const includesLetters = /[$&_=!@#~`,>?:;"'|\\{}\[\]a-zA-Z]/g
    return includesLetters.test(input)
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

function hasOperators(input){
    const opers = /[-+*/%]/g
    return opers.test(input)  
}

function erronousInput(){
    calcInput.classList.add("input-error")
    // errorPtag.classList.add("show-element")
    setTimeout(() => {
        errorPtag.classList.remove("show-element")
        calcInput.classList.remove("input-error")
    }, 3000); 
}


