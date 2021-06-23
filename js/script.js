const guessLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const span = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");
const word = "magnolia";

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    progress.innerText = placeholderLetters.join(" ");
};
placeholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const inputValue = letterInput.value;
    console.log(inputValue);
    letterInput.value = "";
});

const validate = function(inputValue) {
    const acceptedLetter = /[a-zA-Z]/;
    if (letterInput === "") {}
}