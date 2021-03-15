export function endsWithAddMinusDec(input){
    const endsWithAddMinusDec = /[\+ | \- | \.]$/  
    return endsWithAddMinusDec.test(input)
}

export function ReplaceEndsWithAddMinusDec(input){
    const endsWithAddMinusDec = /[\+ | \- | \.]$/
    const endingOp = input.match(endsWithAddMinusDec)
    const endingOpRep = endingOp[0]+"0"
    input = input.replace(endsWithAddMinusDec, endingOpRep) 
    return input
}

export function endsWithMultDiv(input){
    const endsWithMultDiv = /[\* | \/]$/
    return endsWithMultDiv.test(input)
}

export function startsWithOp(input){
    const startsWithOper = input.startsWith("+") || input.startsWith("-") ||input.startsWith("*") ||input.startsWith("/") ||input.startsWith(".") ||input.startsWith("%")
    // const startsWithOper = /^[+-/*.%]/g
    return startsWithOper
}

export function hasManyOperators(input){
    const manyOps = /\+{2,}|\-{2,}|\/{2,}|\*{2,}|\%{2,}|\.{2,}/g
    return manyOps.test(input)  
}

export function hasDiffOpsFollow(input){
    const diffOpsFollow = /[\+\-][\*\/\+\-\%]|[\*\/][\*\/\%]/g
    return diffOpsFollow.test(input)  
}

export function replaceManyOperators(input){
    const manyAdds = /\+{2,}/g
    const manyMinus = /\-{2,}/g
    const manyMultiply = /\*{2,}/g
    const manyDivison = /\/{2,}/g
    const manyDecs = /\.{2,}/g

    if (manyAdds.test(input)) {
        input = input.replaceAll(manyAdds, "+")
    } 
    if (manyMinus.test(input)) {
        const match = input.match(manyMinus).toString()
        const matchNo = match.length%2
        input = (matchNo === 0) ? input.replaceAll(manyMinus, "+") : input.replaceAll(manyMinus, "-")
    }
    if (manyMultiply.test(input)) {
        input = input.replaceAll(manyMultiply, "*")
    }
    if (manyDivison.test(input)) {
        input = input.replaceAll(manyDivison, "/")
    }
    if (manyDecs.test(input)) {
        input = input.replaceAll(manyDecs, ".")
    }
    return input
}

export function replaceDiffOpsFollow(input){
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
