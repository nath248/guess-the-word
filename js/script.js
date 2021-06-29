// Global variables

const guessLetters = document.querySelector(".guessed-letters"); // The unordered list where the player's guessed letters will appear
const guessButton = document.querySelector(".guess"); // The button with the text "Guess!" in it
const letterInput = document.querySelector(".letter"); // The text input where the player will guess a letter
const progress = document.querySelector(".word-in-progress"); // The empty paragraph where the word in progress will appear
const remainingGuesses = document.querySelector(".remaining"); // The paragraph where the remaining guesses will display
const span = document.querySelector(".remaining span"); // The span inside the paragraph where the remaining guesses will display
const message = document.querySelector(".message"); // The empty paragraph where messages will appear when the player guesses a letter
const hiddenButton = document.querySelector(".play-again"); // The hidden button that will appear prompting the player to play again

const word = "magnolia";
const guessedLetters = []; // The array will contain all the letters the player guesses

// Function to Add Placeholders for Each Letter

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    progress.innerText = placeholderLetters.join(" ");
};
placeholder(word);

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
    }

};