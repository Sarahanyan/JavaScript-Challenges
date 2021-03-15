export function hasSpaces(input){
    const hasSpaces = /\s/g
    return hasSpaces.test(input)
}

export function replaceSpaces(input){
    const hasSpaces = /\s/g
    input = input.replaceAll(hasSpaces, "")
    return input
} 