const calcInput = document.querySelector("#calc-input")
const calcTestInput = document.querySelector("#calc-test-input")
const displayPtag = document.querySelector("#calc-display")
const resultPtag = document.querySelector("#result")
const errorPtag = document.querySelector(".input-error-alert")
const calcBtns = document.querySelector("table")
let clickInput = ""
let finalInput = ""//calcInput.value

console.log(calcBtns);
calcBtns.addEventListener("click", (event) => {
    event.preventDefault()
    const txtCont = event.data

    if (txtCont !== "=" && txtCont !== "C") {
        console.log(txtCont)
        console.log(event.target.textContent, typeof(event.target.textContent));
        clickInput = event.target.textContent
        finalInput += clickInput
        displayPtag.textContent = finalInput
        console.log("clickinputFinalInput", finalInput);
    }else if (txtCont === "=") {
        
    }else if (txtCont === "C") {
        const finalInputArrr = finalInput.split("")
        console.log("before", finalInputArrr);
        finalInputArrr.pop()
        console.log("afterpop", finalInputArrr);
        finalInput = finalInputArrr.join("")
        console.log(finalInput);
        displayPtag.textContent = finalInput

    }
    calcInput.value = finalInput

})


calcInput.addEventListener("input", (event) => {
    console.log(event);
    // event.preventDefault()
    let calcInputInitial = calcInput.value
    let keyboardInput = event.data ? event.data : ""
    if (event.inputType === "deleteContentBackward") {
    }
    finalInput += keyboardInput
    calcInput.value = finalInput
    displayPtag.textContent = finalInput

    console.log("keyInputFinalInput", finalInput);

// 
    // check if input is a number or the operators +-*/()% here. If not the input should not be assigned to
    // the const inputValue
    // check if last number is an operator, if it is append 0 //do this elsewhere without egex
    // check proper bracketing here check that no of (-openinng brackets = 
    // to number of )-closing brackets. Check that index of closing brckets ia always greater than index of
    // opening bracket
    // )45*8) (1+89*/7(  )4+69*/8(  dont assign to problem array
    // 7-8(7(4(6+5(75-8)-(4*8+9))))         59*74+1+4---++-/--*/-+5****8/9 
    
    //-----------------------------------------------------------------------------------------------
    // 59*754+1+4-5*8/9                    

    // manyOps = /\+{2,}|\-{2,}|\/{2,}|\*{2,}|\%{2,}|\.{2,}/g
    // console.log("mayops", calcInputInitial.match(manyOps))
    //-----------------------------------------------------------------------------------------------
    // const openingBrackets = calcInputInitial.match(/\(/g)
    // const closingBrackets = calcInputInitial.match(/\)/g)

    // console.log(openingBrackets, closingBrackets);
    // let bracketsMatch = false
    // if (closingBrackets && closingBrackets) {
    //     bracketsMatch = openingBrackets.length === closingBrackets.length
    // }
    // console.log(bracketsMatch);
    //(59*(7(54+1(4-5*8/9)76)))       \(([\d+-+*/%.+]+[\d-+*/%.+])+\)
    // const ofBracket = /\d\(|\)\d/g
    // const ofBracketMatch = calcInputInitial.match(ofBracket)

    // console.log(ofBracketMatch);
    // console.log(calcInputInitial)
    // for (let val of ofBracketMatch) {
    //     let valArr = val.split("")
    //     valArr.splice(1,0,"*")
    //     valArr = valArr.join("")
    //     console.log("valArr", valArr)
    //     calcInputInitial = calcInputInitial.replace(val, valArr)
    //     console.log(calcInputInitial);
    // }

    // const emptyBrackets = /\(\)/
//--------------------------------------------------------------------------------------------------
    // const properBrackets = /\([\d\*\/\-\+\%\b\(\)]+\)/g
    // const properBrackets = /\((\d[\*\/\-\+\%\b\(\)])+\)/g  // tis works
    // const properBrackets = /\(([\*\/\-\+\%]\d|\d[\*\/\-\+\%\d])+\)/g //tis tis works best
    // const properBrackets = /\(([\d+-+*/%.+]+[\d-+*/%.+])+\)/g  //final, tis best
    
    // console.log(calcInputInitial);
    // console.log(properBrackets.test(calcInputInitial));
    // console.log(calcInputInitial.match(properBrackets));
    // console.log(properBrackets.exec(calcInputInitial));
    // const foundBrackets= properBrackets.exec(calcInputInitial)
    // const brktCalculation = foundBrackets[1]
    // const brktToReplace = foundBrackets[0]
    // const brktReplacement = 14
    // const input = calcInputInitial.replace()


//-----------------------------------------------------------------------------------------------------------

//     let searchIndexClose = 0
//     let searchIndexOpen = 0
//     let openBrktIndex = 0
//     let closeBrktIndex = 0
//     if(calcInputInitial.includes("(") && calcInputInitial.includes(")")){
//         console.log(searchIndexClose, searchIndexOpen);
//         // while(searchIndexOpen<2) {  //|| searchIndexClose<2
//             openBrktIndex = calcInputInitial.indexOf("(", searchIndexOpen+1)
//             console.log("openBrkt", openBrktIndex, "searchIndexOpen", searchIndexOpen);
//             closeBrktIndex = calcInputInitial.indexOf(")", searchIndexClose)
//             console.log("closinBrkt", closeBrktIndex, "searchIndexClose", searchIndexClose);

//             if (closeBrktIndex<openBrktIndex) {
//                 console.log("problem");
//             }
//             searchIndexOpen = openBrktIndex
//             searchIndexClose = closeBrktIndex
//             console.log("openBrktAfter", openBrktIndex, "searchIndexOpen", searchIndexOpen);
//             console.log("closinBrktAfter", closeBrktIndex, "searchIndexClose", searchIndexClose);
//         //  }
// }

//------------------------------------------------------------------------------------------
    // const hasSpaces = /\s/g
    // calcInputInitial = calcInputInitial.replaceAll(hasSpaces, "")
    // console.log(calcInputInitial);

//----------------------------------------------------------------------------------------
// x(?=y)
    // const diffOpsFollow = /[\+ \- \* \/ ][\+ \- \* \/]/g
    // // const diffOpsArr = diffOpsFollow.exec(calcInputInitial)
    // // console.log(diffOpsArr);

    // const divOtherOps = /\/[\+ \- \*]/g
    // // const divOtherOpsArr = divOtherOps.exec(calcInputInitial)
    // calcInputInitial = calcInputInitial.replaceAll(divOtherOps, "/")
    // console.log(calcInputInitial);

    // const multOtherOps =  /\*[\+ \- \/]/g
    // const addOtherOps =  /\+[\* \/]/g
    // const minusOtherOps =  /\-[\+ \/ \*]/g

    // var myArray = /d(b+)d/g.exec('cdbbdbsbz')

    // // var myRe = /d(b+)d/g;
    // // var myArray = myRe.exec('cdbbdbsbz');
    // console.log(myArray);


    //------------------------------------------------------------------------------------
    // const includesLetters = /[a-zA-Z]/
    
    // console.log(calcInputInitial);
    // // console.log(includesLetters.test(calcInputInitial))
    // const startsWithOp = /^[\+ | \- | \. | \* | \/ ]/
    // if (startsWithOp.test(calcInputInitial)) {
    //     console.log("starts with operator");
    //     console.log("before pad", calcInputInitial);
    //     // calcInputInitial = calcInputInitial.padStart(calcInputInitial.length + 1, "0")
    //     console.log("after", calcInputInitial);
    // }

})



// const stopInput = (event) => {
//     event.preventDefault()
//     console.log(event);
//             const isDigit = /[0-9]/
//         console.log("key", event.key);
//         if (isDigit.test(event.key)) {
//             console.log("remove event");
//             calcInput.removeEventListener("keypress", stopInput)
//         }
// }
