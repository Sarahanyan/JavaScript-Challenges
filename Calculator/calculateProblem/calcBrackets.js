import {performCalculation} from "./calculate.js"

export function handleBracketedProblem(rearrangedInput){
        console.log("has brksts");
        let formattedInputWBrkts = rearrangedInput
        let cnt = 0
        let hasBrackets = bracketsExist(formattedInputWBrkts)
        
        while(hasBrackets && cnt<6){
            const foundBrackets = extractBracketPair(formattedInputWBrkts)
            // console.log("beforehasBrackets:", hasBrackets);
            // console.log(foundBrackets);
            const brktCalculation = foundBrackets[1]
            const brktToReplace = foundBrackets[0]
            const brktReplacement = performCalculation(brktCalculation)
            // console.log("Before", cnt, formattedInputWBrkts);
            formattedInputWBrkts = formattedInputWBrkts.replace(brktToReplace, brktReplacement)
            hasBrackets = bracketsExist(formattedInputWBrkts)
            // console.log("afterhasBrackets:", hasBrackets);
            // console.log("After", cnt, formattedInputWBrkts);
            cnt++
        }
        return formattedInputWBrkts
    }


function extractBracketPair(input){
    return /\(([\d\-+*/%.+]+[\d\-+*/%.])+\)/g.exec(input)
}

function bracketsExist(input){
    return /\(([\d\-+*/%.+]+[\d\-+*/%.])+\)/g.test(input)
}