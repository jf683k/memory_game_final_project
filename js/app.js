/*Below is the list of cards*/
 const icons = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o",
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt",
"fa fa-bolt", "fa fa-cube", "fa fa-cube","fa fa-leaf", "fa fa-leaf", 
"fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb",];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*Below is the variable causing the timer to begin on the first click.*/
var timerStart;
timerStart = false;

/*Timer*/
let hour = 0;
let minute = 0;
let second = 0;

let timer;

/*timer start function*/
function startTimer() {
	timer = setInterval(function(){
		second++;
		if(second == 60) {
			minute++;
			second = 0;
		}
		document.getElementById('timer').innerHTML = formatTimer();
	}, 1000);
}
/*stop timer function*/
function stopTimer() {
	clearInterval(timer);
}

/*resetting the timer function*/
function resetTimer() {
    second = 0;
    minute = 0; 
    var timer = document.querySelector("#timer");
    document.getElementById('timer').innerHTML = formatTimer();
    clearInterval(interval);
}
/*formatting of the timer*/
function formatTimer() {
	let sec = second > 9 ? String(second) : "0" + String(second);
	let min = minute > 9 ? String(minute) : "0" + String(minute);
	return min + ":" + sec;
}
/*Shuffles the deck of cards*/
shuffle(icons);

const cardsContainer = document.querySelector(".deck");

/*This is an empty array which allows the clicked on cards to be registered.*/
let openedCards = [];
let matchedCards = [];

/*Begin the game*/
function init() {

	/*The below coding creates the deck 
	* as well as places the icons
	* from the above array to each*/
	for(let i = 0; i < icons.length; i++) {
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = "<i class="${icons[i]}"></i>`";
		cardsContainer.appendChild(card);

		/*Creates animation for card clicks.*/
		click(card);
	}	
}

/*Click event*/
function click(card) {

	/*Below is "listening" for an event within the 
	* the deck, specifically, a click. This is included
	*in the loop to involve each event on the "cards"
	*within the deck.*/
	card.addEventListener("click", function() {

		const currentCard = this;
		const previousCard = openedCards[0];

		if (!timerStart) {
			timerStart = true;
			startTimer();
		}
		/*If else statement to create proper action
		*considering whether a card is already opened
		*or not.*/
	if (openedCards.length < 2){
		if(openedCards.length === 1) {

			card.classList.add("open", "show", "disable");
			openedCards.push(this);

			/*Below calls for the comparison of the cards.*/
			compare(currentCard, previousCard);

		} else {
		/*We do NOT have any opened cards.*/
			currentCard.classList.add("open", "show", "disable");
			openedCards.push(this);
		}
	}	
	});
}

/*Below function compares the chosen cards for matches.*/
function compare(currentCard, previousCard) {
	if(currentCard.innerHTML === previousCard.innerHTML) {
		currentCard.classList.add("match");
		previousCard.classList.add("match");
		matchedCards.push(currentCard, previousCard);
				
		openedCards = [];

		//Check if all cards are matched.
		gameOver();

	} else {
		/*This will allow the second card to appear
		*for 1/2 second when a mismatch is made*/
		setTimeout(function() {
			currentCard.classList.remove("open", "show", "disable");
			previousCard.classList.remove("open", "show", "disable");
			openedCards = [];
		}, 500);

	}

	/*Calls moveCounter*/
	moveCounter();
}

/*Game over*/
function gameOver() {
	if (matchedCards.length === icons.length) {
		stopTimer();
		document.querySelector('.modal').style.display = "block";
	}
}
/*Move Counter*/
const movesContainer = document.querySelector(".moves");
const modalMovesContainer = document.querySelector(".modal-moves");
let moves = 0;
movesContainer.innerHTML = 0;
modalMovesContainer.innerHTML = 0;
function moveCounter() {
	moves++;
	movesContainer.innerHTML = moves;
	modalMovesContainer.innerHTML = moves;
	/*Calculate Star Rating*/
	ranking();
}

/*Star Rating*/
const starsContainer = document.querySelector(".stars");
const starsCount = document.querySelector("#stars-count");
function ranking() {

	switch(moves) {
		case 15:
			starsContainer.innerHTML = '"<li><i class="fa fa-star"></i></li>
        	<li><i class="fa fa-star"></i>";
    		starsCount.innerText = "2";
        break;

        case 20:
        	starsContainer.innerHTML = "<li><i class="fa fa-star"></i>";
        	starsCount.innerText = "1";
        break;
	}
}

/*Restart Button*/
const restartButton = document.querySelector(".restart");
const modalRestartButton = document.querySelector(".modal-restart");
const restartGame = function() {
	/*Reset cards back to beginning.*/
	document.querySelector('.modal').style.display = 'none';
	cardsContainer.innerHTML = "";
	stopTimer();
	timerStart = false;
	/*reshuffle the deck*/
	shuffle(icons);
	/*Call init() to restart game.*/
	init();
	/*Reset variables.*/
	matchedCards = [];
	moves = 0;
	resetTimer();
	movesContainer.innerHTML = moves;
	modalMovesContainer.innerHTML = moves;
	starsContainer.innerHTML = "<li><i class="fa fa-star"></i>
	<li><i class="fa fa-star"></i>
	<li><i class="fa fa-star"></i>";
};
restartButton.addEventListener("click", restartGame);
modalRestartButton.addEventListener("click", restartGame);
/*Play the first time.*/
init();


document.querySelector('#close-modal').onclick = function() {
  document.querySelector('.modal').style.display = 'none'
}
