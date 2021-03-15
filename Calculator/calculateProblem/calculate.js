import createProblem from "./create.js"
import {followBodmas} from "./bodmas.js"

export function performCalculation(rearrangedInput){
    const valuesArray = rearrangedInput.split("")
    const mathProblemArray = createProblem(valuesArray)  
    const result = followBodmas(mathProblemArray)
    return result
}
