{

//CHALLENGE 1: AGE IN DAYS

	function captureDate(){
		let currentDate = new Date()
		let currentYear = currentDate.getFullYear();

		for (let i=1900; i<=currentYear; i++) {
			let textNode = document.createTextNode(i);
			let option = document.createElement("option");
			option.setAttribute("value", i);
			document.getElementById("year-input").appendChild(option).appendChild(textNode);
		}

		for(let i=1; i<=12; i++){
			let textNode = document.createTextNode(i);
			let option = document.createElement("option");
			option.setAttribute("value", i);
			document.getElementById("month-input").appendChild(option).appendChild(textNode);
		}

		for(let i=1; i<=31; i++){
			let textNode = document.createTextNode(i);
			let option = document.createElement("option");
			option.setAttribute("value", i);
			document.getElementById("date-input").appendChild(option).appendChild(textNode);		
		}
	}

	function reset(){
		if(document.getElementById("ageInDays")){
				document.getElementById("ageInDays").remove();}
		else{
			//do nothing
		}
	}

	function calcAgeInDays(){
			let birthYear = document.getElementById("year-input").value;
			let birthMonth = document.getElementById("month-input").value;
			let birthDate = document.getElementById("date-input").value;

			let birthday = new Date(birthYear, birthMonth, birthDate);
			//console.log(birthday);

			let today = new Date();
			let timeDifference = today - birthday;
			//console.log(timeDifference);
			const msInADay = 24 * 60 * 60 * 1000;
			let timeDifferenceinDays = Math.ceil(timeDifference/msInADay);
			//console.log(timeDifferenceinDays);
			let ageInText = `You are ${timeDifferenceinDays} days old`;

			let textNode = document.createTextNode(ageInText);
			let h2;
			//if the h2 tag does not exist create it
			if (!(document.getElementById("ageInDays"))) {
				h2 = document.createElement("h2");
				h2.setAttribute("id", "ageInDays");
				h2.appendChild(textNode);	
				document.getElementById("flex-box-result").appendChild(h2);
			}
			else{
			//if h2 exists, we fetch it
				h2 = document.getElementById("ageInDays");
			//we then modify the text inside h2 using the textContent property. To h2.textContent
			// we assign the text node object we created earlier and fetch the text-node's value 
			// by using textNode.value
				h2.textContent = textNode.nodeValue;
			}
			
	}

	captureDate();

// CHALLENGE 2: CAT GENERATOR

	function generateCat(){
		let image = document.createElement("img");
		image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
		let div = document.getElementById("flex-cat-generator");
		div.appendChild(image);

	}


//CHALLENGE 3: ROCK PAPER SCISSORS

	function rpsGame(yourChoice){
		let humanChoice = yourChoice.id;
		let computerChoice = numberToRps(randomNumberGeneratorRps());
		console.log("h: " + humanChoice + " c: " + computerChoice);
		let score = decideWinner(humanChoice, computerChoice);
		console.log(score);
		let message = messageOnScore(score);
		console.log(message);
		displayResults(humanChoice, computerChoice, message);
	}

	function randomNumberGeneratorRps(){
		return Math.floor(Math.random() * 3);
	}

	function numberToRps(number){
		let rps_array = ["rock", "paper", "scissors"];
		return rps_array[number];
	}

	function decideWinner(yourChoice, computerChoice){
		let rpsScenario = {
			"rock"		: {"scissors": 1, "rock": 0.5, "paper": 0},
			"paper"		: {"rock": 1, "paper": 0.5, "scissors": 0},
			"scissors"	: {"paper": 1, "scissors": 0.5, "rock": 0},
		}
		let humanScore = rpsScenario[yourChoice][computerChoice];
		let compScore = rpsScenario[computerChoice][yourChoice];
		let finalScore = [humanScore, compScore];
		return finalScore;
	}


	function messageOnScore([humanScore, computerScore]){
		if (humanScore === 0){
			return {"message": "You lost", "color": "red"};
		}
		else if(humanScore === 0.5){
			return {"message": "Its a tie", "color": "yellow"};
		}
		else{
			return {"message": "You Win", "color": "green"};
		}
	}

	function displayResults(humanImgChoice, compImgChoice, finalMessage){
		let imageDatabase = {
			"rock": "static/images/Rock Clipart 23431.png",
		   "paper": "static/images/Paper Clip Art 14245.jpg",
		"scissors": "static/images/Scissors Clip Art 16134.png",

		}
		document.getElementById("rock-div").remove();
		document.getElementById("paper-div").remove();
		document.getElementById("scissors-div").remove();

		let humanChoiceDiv = document.createElement("div");
		let humanImgTag = document.createElement("img");
		humanImgTag.src = imageDatabase[humanImgChoice];
		humanImgTag.classList.add("flex-box-container-rps-img");
		let rpsDiv = document.getElementById("rps-flex-div");
		rpsDiv.appendChild(humanChoiceDiv).appendChild(humanImgTag);

		let messageDiv = document.createElement("div");
		// messageDiv.classList.add("flex-box-container-rps-img");
		let headingTwo = document.createElement("h2")
		headingTwo.textContent = finalMessage["message"];
		headingTwo.style.color = finalMessage["color"];
		headingTwo.style.align = "center";
		rpsDiv.appendChild(messageDiv).appendChild(headingTwo);

		let compChoiceDiv = document.createElement("div");
		let compImgTag = document.createElement("img");
		compImgTag.src = imageDatabase[compImgChoice];
		compImgTag.classList.add("flex-box-container-rps-img");
		rpsDiv.appendChild(compChoiceDiv).appendChild(compImgTag);
	}

// CHALLENGE 4: CHANGE BUTTON COLORS

	let allButtons = document.getElementsByTagName("button");
	let allButtonsCopy = [];
	let origiClasses = [];

	for(let i=0; i<allButtons.length; i++){
		allButtonsCopy.push(allButtons[i]);
		origiClasses.push(allButtonsCopy[i].classList[1]);
		//console.log(allButtonsCopy[i].classList[1], typeof(allButtonsCopy[i].classList[1]))
	}
	//console.log(origiClasses)
	

	function buttonColorChange(chosenColor){
		//console.log(chosenColor.value);
		if (chosenColor.value === "random"){
			setRandomButtonColors();
		}
		else if(chosenColor.value === "reset"){
			resetButtonColors();
		}
		else{
			setButtonColor(chosenColor.value);
		}
	}

	const buttonClasses = ["btn-primary", "btn-success", "btn-warning", "btn-danger"];
	const buttonColorMap = {"blue":"btn-primary", "green": "btn-success", 
				 "red": "btn-danger", "yellow": "btn-warning"};

	function setButtonColor(color){
		for(let i=0; i<allButtons.length; i++){
			for(let buttonClass of buttonClasses){
				if(allButtons[i].classList.contains(buttonClass)){
					allButtons[i].classList.remove(buttonClass);
					allButtons[i].classList.add(buttonColorMap[color]);
				}
			}								
		}
	}


	function setRandomButtonColors(){
		let colors = ["blue", "green", "red", "yellow"];
		for(let i=0; i<allButtons.length; i++){
			let randomNumber = Math.floor(Math.random() * 4);
			let randomColor = colors[randomNumber];
			for(let buttonClass of buttonClasses){
				if(allButtons[i].classList.contains(buttonClass)){
					allButtons[i].classList.remove(buttonClass);
					allButtons[i].classList.add(buttonColorMap[randomColor]);
				}
			}
		}
	}

	function resetButtonColors(){
		for(let i=0; i<allButtons.length; i++){
			for(let buttonClass of buttonClasses){
				if(allButtons[i].classList.contains(buttonClass)){
					allButtons[i].classList.remove(buttonClass);
					allButtons[i].classList.add(origiClasses[i]);
					//console.log(allButtons[i].classList[1])
				}
			}
		}
	}

//CHALLENGE 5: BLACKJACK
let blackjackGame = {
	you: {"scoreSpanTag": "#your-blackjack-result", "div": "#you-box", "score": 0},
	dealer: {"scoreSpanTag": "#dealer-blackjack-result", "div": "#dealer-box", "score": 0},
	cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
	cardsMap: {"2": 2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10, "J":10, "Q":10, "K":10, "A":[1, 11]},
	wins: 0,
	losses: 0,
	draws: 0,
	standBtnPressed: false,
	turnsOver: false,
};

const YOU = blackjackGame.you;
const DEALER = blackjackGame.dealer;

const dealCardSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3")

document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackHit);
document.querySelector("#blackjack-deal-button").addEventListener("click", blackjackDeal);
document.querySelector("#blackjack-stand-button").addEventListener("click", dealerPlay);

function blackjackHit(){
	//if the stand button has not been presses then allow hit button to be pressed
	if (!(blackjackGame.standBtnPressed)) {
		let card = randomCard();
		showCard(YOU, card);
		updateScore(YOU, card);
		displayScore(YOU);
	}
}

function randomCard(){
	let randomIndex = Math.floor(Math.random() * 13);
	return blackjackGame.cards[randomIndex];
}
	
function showCard(activePlayer, card){
	if(activePlayer.score <= 21){
		let cardImage = document.createElement("img");
		cardImage.src = `static/images/${card}.png`;
		document.querySelector(activePlayer.div).appendChild(cardImage);
		dealCardSound.play();
	}
}

function blackjackDeal(){
	if (blackjackGame.turnsOver){
		blackjackGame.standBtnPressed = false;
		blackjackGame.turnsOver = false;

		let images = document.querySelector(".flex-blackjack-row-1").querySelectorAll("img");
		for(img of images){
			img.remove();	
		}
		YOU.score = 0;
		DEALER.score = 0;
	
		document.querySelector(YOU.scoreSpanTag).textContent = 0;
		document.querySelector(YOU.scoreSpanTag).style.color = "#ffffff";
		document.querySelector(DEALER.scoreSpanTag).textContent = 0;
		document.querySelector(DEALER.scoreSpanTag).style.color = "#ffffff";
	
		document.querySelector("#blackjack-result").textContent = "Lets Play";
		document.querySelector("#blackjack-result").style.color = "black";
	}
}

function dealerPlay(){
	console.log(blackjackGame.turnsOver);
	// if the turn is not over, stand button can still be pressed
	if (!(blackjackGame.turnsOver)){
		while(DEALER.score < 16){
			blackjackGame.standBtnPressed = true;
			let card = randomCard();
			showCard(DEALER, card);
			updateScore(DEALER, card);
			displayScore(DEALER);
	}

	let winner = decideWinner();
	displayWinner(winner);
	blackjackGame.turnsOver = true;
	}
}

function updateScore(activePlayer, card){
	if(card === "A"){
		//add 11 to the score if the score comes to 21 or less
		if(activePlayer.score + blackjackGame.cardsMap[card][1] <= 21){
			activePlayer.score += blackjackGame.cardsMap[card][1];
			console.log(activePlayer.score);
		}
		else{
		// if adding 11 to the score gives more than 21, then add 1
			activePlayer.score += blackjackGame.cardsMap[card][0];
			console.log(activePlayer.score);
		}
	}
	else{
	activePlayer.score += blackjackGame.cardsMap[card];
	//console.log(activePlayer.score);
	}
}

function displayScore(activePlayer){
	if(activePlayer.score <= 21){
		document.querySelector(activePlayer.scoreSpanTag).textContent = activePlayer.score;
	}
	else{
		document.querySelector(activePlayer.scoreSpanTag).textContent = "BUST!!!";
		document.querySelector(activePlayer.scoreSpanTag).style.color = "red";
	}
}

function decideWinner(){
	let winner;
	if(YOU.score<=21 && DEALER.score<=21){
		if(YOU.score > DEALER.score){
			winner = YOU;
			blackjackGame.wins++
		}
		else if(YOU.score < DEALER.score){
			winner = DEALER;
			blackjackGame.losses++
		}
		else if (YOU.score === DEALER.score) {
			winner = null;
			blackjackGame.draws++
		}
	}
	else if(YOU.score<=21 && DEALER.score >=21){
		winner = YOU;
		blackjackGame.wins++
	}
	else if(YOU.score>=21 && DEALER.score<=21){
		winner = DEALER;
		blackjackGame.losses++
	}
	else if(YOU.score>21 && DEALER.score>21){
		winner = null;
		blackjackGame.draws++
	}
	console.log(blackjackGame);
	return winner;
}

function displayWinner(winner){
	let message, messageColor, sound;
	if (winner === YOU) {
		message = "YOU WIN!!!";
		messageColor = "green";
		sound = winSound;
	}
	else if (winner === DEALER) {
		message = "YOU LOSE!!!";
		messageColor = "red";
		sound = lossSound;
	}
	else if (winner === null) {
		message = "ITS A TIE";
		messageColor = "black";
	}

	document.querySelector("#blackjack-result").textContent = message;
	document.querySelector("#blackjack-result").style.color = messageColor;
	if(sound){
		sound.play();
	}

	document.querySelector("#wins").textContent = blackjackGame.wins;
	document.querySelector("#losses").textContent = blackjackGame.losses;
	document.querySelector("#draws").textContent = blackjackGame.draws;
}


}