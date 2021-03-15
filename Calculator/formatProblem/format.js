import {endsWithAddMinusDec, startsWithOp, ReplaceEndsWithAddMinusDec, hasManyOperators, endsWithMultDiv, 
            hasDiffOpsFollow, replaceManyOperators, replaceDiffOpsFollow} from "./operators.js"

import {hasEmptyBrackets, replaceEmptyBrackets,hasOfTypeBrkt, 
            addOpBtwBrktnNo, hasOpThenBrkt, addNoBtwOpAndBrkt} from "./brackets.js"
            
import {hasSpaces, replaceSpaces} from "./spaces.js"
        
export function formatInput(inputValue){
        if(startsWithOp(inputValue)) {
            inputValue = inputValue.padStart(inputValue.length + 1,"0")
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
            inputValue = addNoBtwOpAndBrkt(inputValue)
        }
       
        let manyops = hasManyOperators(inputValue)
        if(manyops){
            let count = 0
            while(manyops && count<9){
                inputValue = replaceManyOperators(inputValue)
                manyops = hasManyOperators(inputValue)
                count++
            }
        }
    
        let manyDiffOps = hasDiffOpsFollow(inputValue)
        if (manyDiffOps) {
            let countD = 0
            while(manyDiffOps && countD<15){
                console.log("before: ", countD, manyDiffOps, inputValue);
                inputValue = replaceDiffOpsFollow(inputValue)
                manyDiffOps = hasDiffOpsFollow(inputValue)
                console.log("after: ", countD, manyDiffOps, inputValue);
                countD++
                //dont append many ops to input value.Solved.Allis left is brackts and spaces
            }
        }

        // if(endsWithAddMinusDec(inputValue)){
        //     inputValue += "0"
        //     // inputValue = ReplaceEndsWithAddMinusDec(inputValue)
        // }
        // if(endsWithMultDiv(inputValue)){
        //     inputValue += 1 
        // }
        return inputValue
}
