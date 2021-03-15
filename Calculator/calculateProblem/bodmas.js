import {simplifyProblem} from "./simplify.js"

export function followBodmas(array){
    let arrAfterSimplifying = array

    if (array.includes("%")) {
        const arrAfterPer = simplifyProblem("%", array)
        arrAfterSimplifying = arrAfterPer
    }
    if (array.includes("/")) {
        const arrAfterDivision = simplifyProblem("/", arrAfterSimplifying)
        arrAfterSimplifying = arrAfterDivision  
    }
    if (array.includes("*")) {
        const arrAfterMultiply = simplifyProblem("*", arrAfterSimplifying)
        arrAfterSimplifying = arrAfterMultiply   
    }

    if (array.includes("+")) {
        const arrAfterAdd = simplifyProblem("+", arrAfterSimplifying)
        arrAfterSimplifying = arrAfterAdd      
    }

    if (array.includes("-")) {
        const arrAfterMinus = simplifyProblem("-", arrAfterSimplifying)
        arrAfterSimplifying = arrAfterMinus     
    }
    return arrAfterSimplifying
}