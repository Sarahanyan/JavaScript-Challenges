const playerDiv = document.querySelector("#player")
const resetGameBtn = document.querySelector("#reset-game")
const cellDivs = document.querySelectorAll(".game-cell")
const playAgainstCompFormContainer = document.querySelector(".vscomp-form-container")
const playAgainstCompForm = document.querySelector("#vs-computer")
const radioBtnX = document.getElementById("playerx")
const radioBtnO = document.getElementById("playero")
const vsCompMsg = document.querySelector("#vsCompMsg")
let vsComputer = false
let playerXTurn = true
let compIsPlaying = false
let gameStarted = false
let gameOver = false
let winner = ""

const handleResetGame = (event) => {
    if (!compIsPlaying) {
        cellDivs.forEach((cellDiv) => {
            cellDiv.textContent = ""
        })
        gameOver = false
        gameStarted = false
        compIsPlaying = false
        playerXTurn = true
        vsComputer = false
        playerDiv.textContent = "X's Turn"
        playerDiv.classList.remove("winner")
        playAgainstCompForm.style.display = "block"
        playAgainstCompForm.style.opacity = "1"
        vsCompMsg.style.opacity = "0"
        radioBtnX.removeAttribute("disabled")
        radioBtnO.removeAttribute("disabled")
        cellDivs.forEach(cellDiv => cellDiv.classList.remove("winner"))
    }
}

const handlePlayVsComp = (event) => {
    event.preventDefault()
    if (!gameStarted) {
        const formInputs = Array.from(document.querySelectorAll("#vs-computer input"))
        const formInputsValues = formInputs.reduce((totalValues, currentValue) => {
            totalValues = {...totalValues, [currentValue.id] : currentValue.checked}
            return totalValues
        }, {})
    
        playAgainstCompForm.style.display = "none"
        playAgainstCompForm.style.opacity = "0"
        radioBtnX.setAttribute("disabled", "true")
        radioBtnO.setAttribute("disabled", "true")
        vsCompMsg.style.opacity = "1"
        vsComputer = true
        compPlayer = formInputsValues.playerx ? "O" : "X"
        if (compPlayer === "X") {
            const compCellNo = compMove("X")
            displayCompMove(compCellNo, "X")
            gameStarted = true
            playerXTurn = false
        }
    }else{
        console.log("game already started");
    }
}

const addWinnerClass = (startIndex, endIndex, step) => {
    for (let index=startIndex; index < endIndex; index=index+step) {
    cellDivs[index].classList.add("winner")     
}
}

const checkForWin = () => {
    const row1Win = cellDivs[0].textContent && cellDivs[0].textContent === cellDivs[1].textContent && cellDivs[1].textContent === cellDivs[2].textContent
    if (row1Win) {
        addWinnerClass(0, 3, 1)
        gameOver = true
        return cellDivs[0].textContent}

    const row2Win = cellDivs[3].textContent && cellDivs[3].textContent === cellDivs[4].textContent && cellDivs[4].textContent === cellDivs[5].textContent
    if (row2Win) {
        addWinnerClass(3, 6, 1)
        gameOver = true
        return cellDivs[3].textContent}

    const row3Win = cellDivs[6].textContent && cellDivs[6].textContent === cellDivs[7].textContent && cellDivs[7].textContent === cellDivs[8].textContent
    if (row3Win) {
        addWinnerClass(6, 9, 1)
        gameOver = true
        return cellDivs[6].textContent}

    const col1Win = cellDivs[0].textContent && cellDivs[0].textContent === cellDivs[3].textContent && cellDivs[3].textContent === cellDivs[6].textContent
    if (col1Win) {
        addWinnerClass(0, 7, 3)
        gameOver = true
        return cellDivs[0].textContent}

    const col2Win = cellDivs[1].textContent && cellDivs[1].textContent === cellDivs[4].textContent && cellDivs[4].textContent === cellDivs[7].textContent
    if (col2Win) {
        addWinnerClass(1, 8, 3)
        gameOver = true
        return cellDivs[1].textContent}
    
    const col3Win = cellDivs[2].textContent && cellDivs[2].textContent === cellDivs[5].textContent && cellDivs[5].textContent === cellDivs[8].textContent
    if (col3Win) {
        addWinnerClass(2, 9, 3)
        gameOver = true
        return cellDivs[2].textContent}
    
    const diagonal1Win = cellDivs[0].textContent && cellDivs[0].textContent === cellDivs[4].textContent && cellDivs[4].textContent === cellDivs[8].textContent
    if (diagonal1Win) {
        addWinnerClass(0, 9, 4)
        gameOver = true
        return cellDivs[0].textContent}
    
    const diagonal2Win = cellDivs[2].textContent && cellDivs[2].textContent === cellDivs[4].textContent && cellDivs[4].textContent === cellDivs[6].textContent
    if (diagonal2Win) {
        addWinnerClass(2, 7, 2)
        gameOver = true
        return cellDivs[2].textContent}
     
    const tiedGame = cellDivs[0].textContent && cellDivs[1].textContent && cellDivs[2].textContent && cellDivs[3].textContent && cellDivs[4].textContent && cellDivs[5].textContent && cellDivs[6].textContent && cellDivs[7].textContent && cellDivs[8].textContent 
    if (tiedGame) {
        gameOver = true
        return "T"
    }
    return ""
}

function displayGameResults(winner){
    let message = ""
    if (winner === "X") {
        if (vsComputer){
            if(compPlayer === "X") {
                message = "You Lose !!!"
            }else{
                message = "You Win !!!"
            }
        }else{
            message = "X Wins !!!"
        }
    }else if (winner === "O") {
        if (vsComputer){
            if(compPlayer === "O") {
                message = "You Lose !!!"
            }else{
                message = "You Win !!!"
            }
        }else{
            message = "O Wins !!!"
        }
    }else if (winner === "T") {
        message = "Its A Tie !!!"
    }
    return message
}

function compMove(letter) {
    let cellCompChose = Math.floor(Math.random()*9)

    cellDivs.forEach((cellDiv, index, arr) => {
        const col1 = [0, 3, 6]
        const col2 = [1, 4, 7]
        const row1 = [0, 1, 2]
        const row2 = [3, 4, 5]
        const diagonal1 = [0, 4]
        const diagonal2 = [2, 4]
        if (col1.includes(index)) {            
            if(arr[index].textContent){
                if(arr[index].textContent === arr[index+1].textContent && arr[index+2].textContent === ""){
                    cellCompChose = index + 2
                    console.log("cellCompChose036Col1", cellCompChose);
                    return cellCompChose
                }else if (arr[index].textContent === arr[index+2].textContent && arr[index+1].textContent === "") {
                    cellCompChose = index + 1
                    console.log("cellCompChose036Col1spacebet", cellCompChose);
                    return cellCompChose
                }
            }
        }    
        else if (col2.includes(index)) {            
            if(arr[index].textContent){
                if(arr[index].textContent === arr[index+1].textContent && arr[index-1].textContent === ""){
                    cellCompChose = index - 1
                    console.log("cellCompChose147col2", cellCompChose);
                        return cellCompChose
                }
            }
        }
        else if (row1.includes(index)){            
            if(arr[index].textContent){
                if(arr[index].textContent === arr[index+3].textContent && arr[index+6].textContent === ""){
                    cellCompChose = index + 6
                    console.log("cellCompChose012row1", cellCompChose);
                    return cellCompChose
                }else if (arr[index].textContent === arr[index+6].textContent && arr[index+3].textContent === "") {
                    cellCompChose = index + 3
                    console.log("cellCompChose012row1spaceBet", cellCompChose);
                    return cellCompChose
                }
            }
        }   
        else if (row2.includes(index)){
            if(arr[index].textContent){
                if(arr[index].textContent === arr[index+3].textContent && arr[index-3].textContent === ""){
                    cellCompChose = index - 3
                    console.log("cellCompChose345row2", cellCompChose);
                    return cellCompChose
                }
            }
        } 
        else if (diagonal1.includes(index)){
            if(arr[index].textContent){
                if(arr[index].textContent === arr[index+4].textContent){
                        if (index === 0 && arr[index+8].textContent === "") {
                            cellCompChose =  index + 8   
                            console.log("cellCompChose048Diag1 0n4", cellCompChose);
                            return cellCompChose
                        }else if (index === 4 && arr[index-4].textContent === "") {
                            cellCompChose = index - 4
                            console.log("cellCompChose048Diag1 4n8", cellCompChose);
                            return cellCompChose
                        }
                }else if (index === 0) {
                    if(cellDiv.textContent === arr[8].textContent && arr[4].textContent === ""){
                        cellCompChose = 4
                        console.log("cellCompChose048Diag1SpaceBet", cellCompChose);
                        return cellCompChose
                    }
                }
            }
        }
        else if (diagonal2.includes(index)){
            if(arr[index].textContent){
                if(arr[index].textContent === arr[index+2].textContent){
                    if (index === 2 && arr[index+4].textContent === "") {
                        cellCompChose =  index + 4 
                        console.log("cellCompChose246Diag2 2n4", cellCompChose);
                        return cellCompChose
                    }else if (index === 4 && arr[index-2].textContent === "") {
                        cellCompChose = index - 2
                        console.log("cellCompChose246Diag2 4n6", cellCompChose);
                        return cellCompChose
                    }
                }else if (index === 2) {
                    if(cellDiv.textContent === arr[6].textContent && arr[4].textContent === ""){
                        cellCompChose = 4
                        console.log("cellCompChose246Diag2SpaceBet", cellCompChose);
                        return cellCompChose
                    }
                }
            }
        }
        else{
            while (cellDivs[cellCompChose].textContent !== "") {
                cellCompChose = Math.floor(Math.random()*9)
                console.log("cellCompChose Random", cellCompChose);
            }
            return cellCompChose
        }
    })
    return cellCompChose
}

const displayCompMove = (cellNo, letter) => {
    cellDivs[cellNo].textContent = letter
}

const handleCellClick = (event) => {
    gameStarted = true
    playAgainstCompForm.style.display = "none"
    playAgainstCompForm.style.opacity = 0
    let gameResultMsg = ""
    const singleCell = event.target
    if(!gameOver && singleCell.textContent === "" && !compIsPlaying){
        if(playerXTurn) {
            playerDiv.textContent = "O's Turn"
            singleCell.textContent="X"
            playerXTurn = false
            winner = checkForWin()
            if (winner) {
                gameResultMsg = displayGameResults(winner)
                playerDiv.textContent = gameResultMsg
                playerDiv.classList.add("winner")

            }
            if (vsComputer && compPlayer === "O" && !gameOver) {
                compIsPlaying = true
                setTimeout(() => {
                    const compCellNo = compMove("O")
                    displayCompMove(compCellNo, "O")
                    playerXTurn = true
                    winner = checkForWin()
                    if (winner) {
                        gameResultMsg = displayGameResults(winner)
                        playerDiv.textContent = gameResultMsg
                        playerDiv.classList.add("winner")
                    }
                }, 1300)
                compIsPlaying = false
                playerDiv.textContent = "X's Turn"

            }
        }else{
            playerDiv.textContent = "X's Turn"
            singleCell.textContent="O"
            playerXTurn = true
            winner = checkForWin()
            if (winner) {
                gameResultMsg = displayGameResults(winner)
                playerDiv.textContent = gameResultMsg
                playerDiv.classList.add("winner")
            }
            if (vsComputer && compPlayer === "X" && !gameOver) {
                compIsPlaying = true
                setTimeout(() => {
                    const compCellNo = compMove("X")
                    displayCompMove(compCellNo, "X")
                    playerXTurn = false
                    winner = checkForWin()
                    if (winner) {
                        gameResultMsg = displayGameResults(winner)
                        playerDiv.textContent = gameResultMsg
                        playerDiv.classList.add("winner") 
                    }
                }, 1300)
                playerDiv.textContent = "O's Turn"
                compIsPlaying = false
            }
        }
        
    } else {
        // console.log("compIsPlaying", compIsPlaying);
    }
}

cellDivs.forEach((cellDiv, cellDivIndex) => {
    cellDiv.addEventListener("click", handleCellClick, )
})

playAgainstCompForm.addEventListener("submit", handlePlayVsComp)

resetGameBtn.addEventListener("click", handleResetGame)
