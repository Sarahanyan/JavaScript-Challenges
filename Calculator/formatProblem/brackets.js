export function hasEmptyBrackets(input){
    const hasEmptyBrackets = /\(+\s*\)+/g
    return hasEmptyBrackets.test(input)
}

export function replaceEmptyBrackets(input){
    const hasEmptyBrackets = /\(+\s*\)+/g
    input = input.replaceAll(hasEmptyBrackets, "")
    return input
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

export function hasOfTypeBrkt(input){
    const ofBracket = /\d\(|\)\d/g
    return ofBracket.test(input)
}

export function addOpBtwBrktnNo(input){
    const ofBracket = /\d\(|\)\d/g
    const ofBracketMatch = input.match(ofBracket)

    console.log(ofBracketMatch);
    console.log(input)

    input = replaceRegex(input, ofBracketMatch, "*")
    return input
}

export function hasOpThenBrkt(input){
    const opThenBrkt = /[-+.%*/][)]/g
    return opThenBrkt.test(input)
}

export function addNoBtwOpAndBrkt(input){
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
