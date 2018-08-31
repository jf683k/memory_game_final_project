/*
 * Create a list that holds all of your cards
 */
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

/*First click timer*/
var timerStart;
timerStart = false;

/*Timer*/
let hour = 0;
let minute = 0;
let second = 0;

let timer;

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

function stopTimer() {
	clearInterval(timer);
}

function formatTimer() {
	let sec = second > 9 ? String(second) : "0" + String(second);
	let min = minute > 9 ? String(minute) : "0" + String(minute);
	return min + ":" + sec;
}
/*Shuffles the deck of cards*/
/*shuffle(icons);*/

const cardsContainer = document.querySelector(".deck");

/*This is an empty array which allows
*the clicked on cards to be registered.*/
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
		card.innerHTML = `<i class="${icons[i]}"></i>`;
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
	});
}

/*Below function compares the chosen cards for matches.*/
function compare(currentCard, previousCard) {
	if(currentCard.innerHTML === previousCard.innerHTML) {
		currentCard.classList.add("match");
		previousCard.classList.add("match");

		matchedCards.push(currentCard, previousCard);
				
		openedCards = [];

		/*Check if all cards are matched.*/
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

/*The below function calculates when all the 
*cards are matched and the game is over.*/
function gameOver() {
	if (matchedCards.length === icons.length) {
		alert("Congratulations, you have matched all the cards!!!");
	}
}

/*Move Counter*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function moveCounter() {
	moves++;
	movesContainer.innerHTML = moves;

	/*Calculate Star Rating*/
	ranking();
}

/*Star Rating*/
const starsContainer = document.querySelector(".stars");
function ranking() {
	switch(moves) {
		case 20:
			starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        	<li><i class="fa fa-star"></i>`;
        break;

        case 25:
        	starsContainer.innerHTML = `<li><i class="fa fa-star"></i>`;
        break;
	}
}

/*Restart Button*/
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
	/*Reset cards back to beginning.*/
	cardsContainer.innerHTML = "";
	clearInterval(timer);
	/*Call init() to restart game.*/
	init();
	/*Reset variables.*/
	matchedCards = [];
	moves = 0;
	movesContainer.innerHTML = moves;
	starsContainer.innerHTML = `<li><i class="fa fa-star"></i>
	<li><i class="fa fa-star"></i>
	<li><i class="fa fa-star"></i>`;
	shuffle(icons);
});

/*Play the first time.*/
init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
