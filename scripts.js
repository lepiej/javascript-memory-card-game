var cards = [
  { value: "2", image: "./images/clubs_2.svg", matched: false },
  { value: "3", image: "./images/clubs_3.svg", matched: false },
  { value: "4", image: "./images/clubs_4.svg", matched: false },
  { value: "5", image: "./images/clubs_5.svg", matched: false },
  { value: "6", image: "./images/clubs_6.svg", matched: false },
  { value: "7", image: "./images/clubs_7.svg", matched: false },
  { value: "2", image: "./images/clubs_2.svg", matched: false },
  { value: "3", image: "./images/clubs_3.svg", matched: false },
  { value: "4", image: "./images/clubs_4.svg", matched: false },
  { value: "5", image: "./images/clubs_5.svg", matched: false },
  { value: "6", image: "./images/clubs_6.svg", matched: false },
  { value: "7", image: "./images/clubs_7.svg", matched: false },
];

var cardEventlistener = document.querySelectorAll(".card");
// store the index of the first guess
var firstGuess = null;
var canGuess = true;
var flippedCards = 0;
var guesses = 0;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

shuffle(cards);

cardEventlistener.forEach(function (element, index) {
  element.addEventListener("click", function () {
    // debug
    if (
      // if the current element that was clicked is the same as the first guess
      index === firstGuess ||
      // if the card has already been matched
      cards[index].matched ||
      // if the player is not allowed to make a guess at the moment
      !canGuess
    ) {
      alert("invalid guess");
      return;
    }

    var clickedCard = cards[index];
    // show the flipped image of the card (front)
    element.setAttribute("src", clickedCard.image);

    if (firstGuess === null) {
      // add value to the first guess
      firstGuess = index;
    } // second guess
    else {
      guesses++;
      document.querySelector("#guesses").textContent = guesses;
      // match
      if (cards[firstGuess].value === cards[index].value) {
        cards[firstGuess].matched = true;
        cards[index].matched = true;
        firstGuess = null;
        flippedCards += 2;

        // check for a win and reset
        if (flippedCards === cards.length) {
          resetGame();
        }
      } else {
        // no match
        canGuess = false;
        setTimeout(function () {
          cardEventlistener[firstGuess].setAttribute(
            "src",
            "./images/red2.svg"
          );
          // flip back both over (front -> back)
          cardEventlistener[index].setAttribute("src", "./images/red2.svg");
          //starts a new turn
          firstGuess = null;
          canGuess = true;
        }, 500);
      }
    }
  });
});

function resetGame() {
  // delay after a win
  canGuess = false;
  setTimeout(function () {
    // change back to the initial values
    firstGuess = null;
    canGuess = true;
    flippedCards = 0;
    guesses = 0;
    document.querySelector("#guesses").textContent = guesses;

    // flipp upside down
    cardEventlistener.forEach(function (element, index) {
      element.setAttribute("src", "./images/red2.svg");
    });

    // reset matched positions
    cards.forEach(function (card, index) {
      card.matched = false;
    });

    // shuffle
    shuffle(cards);
  }, 1500);
}

document.querySelector("#reset").addEventListener("click", function () {
  resetGame();
});
