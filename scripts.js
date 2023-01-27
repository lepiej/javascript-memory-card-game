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

var cardEls = document.querySelectorAll(".card");
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

cardEls.forEach(function (element, index) {
  element.addEventListener("click", function () {
    // debug
    if (index === firstGuess || cards[index].matched || !canGuess) {
      alert("invalid guess");
      return;
    }

    var clickedCard = cards[index];
    element.setAttribute("src", clickedCard.image);

    if (firstGuess === null) {
      firstGuess = index;
    } else {
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
          cardEls[firstGuess].setAttribute("src", "./images/red2.svg");
          cardEls[index].setAttribute("src", "./images/red2.svg");
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
    // changing back to the initial values
    firstGuess = null;
    canGuess = true;
    flippedCards = 0;
    guesses = 0;
    document.querySelector("#guesses").textContent = guesses;

    // flipping upside down
    cardEls.forEach(function (element, index) {
      element.setAttribute("src", "./images/red2.svg");
    });

    // reseting matched positions
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
