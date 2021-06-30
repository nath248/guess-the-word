// Global variables

const guessLetters = document.querySelector(".guessed-letters"); // The unordered list where the player's guessed letters will appear
const guessButton = document.querySelector(".guess"); // The button with the text "Guess!" in it
const letterInput = document.querySelector(".letter"); // The text input where the player will guess a letter
const progress = document.querySelector(".word-in-progress"); // The empty paragraph where the word in progress will appear
const remainingGuessesMsg = document.querySelector(".remaining"); // The paragraph where the remaining guesses will display
const span = document.querySelector(".remaining span"); // The span inside the paragraph where the remaining guesses will display
const message = document.querySelector(".message"); // The empty paragraph where messages will appear when the player guesses a letter
const hiddenButton = document.querySelector(".play-again"); // The hidden button that will appear prompting the player to play again

let word = "magnolia";
const guessedLetters = []; // The array will contain all the letters the player guesses
let remainingGuesses = 8; // Max number of guesses a player can make

// Async Function

const getword = async function() {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
getword();



// Function to Add Placeholders for Each Letter

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    progress.innerText = placeholderLetters.join(" ");
};


// Event Listener for the Button

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const inputValue = letterInput.value;
    const goodGuess = validate(inputValue);

    if (goodGuess) {
        makeGuess(inputValue);
    }
    letterInput.value = "";
});

/* Note: Because you're working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page.
To prevent this reloading behavior, add this line of code at the top of the callback function: e.preventDefault();.*/

// Function to Check Player's Input

const validate = function(inputValue) {
    const acceptedLetter = /[a-zA-Z]/;
    if (inputValue.length === 0) {
        message.innerText = "Please enter a value";
    } else if (inputValue.length > 1) {
        message.innerText = "Please only enter 1 letter at a time";
    } else if (!inputValue.match(acceptedLetter)) {
        message.innerText = "Please only enter letters";
    } else {
        return inputValue;
    }
};

// Function to Capture Input

const makeGuess = function(inputValue) {
    inputValue = inputValue.toUpperCase();
    if (guessedLetters.includes(inputValue)) {
        message.innerText = "You have already guessed this letter, Please Try Again!";
    } else {
        guessedLetters.push(inputValue);
        console.log(guessedLetters);
        countGuesses(inputValue);
        updateLetterGuess();
        updateWordInProgress(guessedLetters);
    }

};

// Function to show guessed letters

const updateLetterGuess = function() {
    guessLetters.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessLetters.append(li);
    }
};

// Function to Update the Word in Progress

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const reveal = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            reveal.push(letter.toUpperCase());
        } else {
            reveal.push("●");
        }
    }
    progress.innerText = reveal.join("");
    successfulGuess();
};

// Function to Count Guesses Remaining

const countGuesses = function(inputValue) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(inputValue)) {
        message.innerText = `Oh no! ${inputValue} is not included in the word.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Great job! ${inputValue} is included in the word.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        span.innerText = `${remainingGuesses} guess`;
    } else {
        span.innerText = `${remainingGuesses} guesses`;
    }
};

// Function to Check If the Player Won

const successfulGuess = function() {
    if (word.toUpperCase() === progress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};