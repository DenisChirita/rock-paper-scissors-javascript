let playerSelection;
let computerSelection;
let numberOfClicks = 0;
let playerScore = 0;
let computerScore = 0;
const PLAYER_COLOR = "rgb(252, 88, 104)";
const DEFAULT_COLOR = "white";
const COMPUTER_COLOR = "rgb(121, 135, 233)";
const NUMBER_OF_ROUNDS = 7;
const messageParagraph = document.getElementById("message");

/**
 * Function that plays a round when the player clicks a choice
 * @param element is the css element clicked by the player 
 * @param val 
 */
function playerClick(element, playerWeapon) {
    if (numberOfClicks === NUMBER_OF_ROUNDS)
        return;
    numberOfClicks++;

    if (playerSelection)
        changeBackgroundColor(getPlayerButton(), DEFAULT_COLOR);
    playerSelection = playerWeapon;
    changeBackgroundColor(element, PLAYER_COLOR);

    if (computerSelection)
        changeBackgroundColor(getComputerButton(), DEFAULT_COLOR);
    computerSelection = computerPlay();
    changeBackgroundColor(getComputerButton(), COMPUTER_COLOR);

    updateScoreAndMessage(playRound());

    checkIfGameOver();
}

/**
 * Function that gives a random weapon choice for the computer
 * @returns the weapon chosen by the computer
 */
function computerPlay() {
    number = Math.floor(3 * Math.random());
    if (number === 0)
        return "Rock";
    else if (number === 1)
        return "Paper";
    else
        return "Scissors";
}

/**
 * Function that plays a round of Rock Paper Scissors
 * @param playerSelection the weapon chosen by the human
 * @param computerSelection the weapen chosen by the computer
 * @returns a string with a win, lose or draw message
 */
function playRound() {
    const loseMessage = "You Lose! " + computerSelection + " beats " + playerSelection;
    const winMessage = "You Win! " + playerSelection + " beats " + computerSelection;
    const drawMessage = "Draw! " + playerSelection + " equals " + computerSelection;
    if (playerSelection === computerSelection)
        return drawMessage
    switch (playerSelection) {
        case "Rock": if (computerSelection === "Paper") {
            return loseMessage;
        } break;
        case "Paper": if (computerSelection === "Scissors") {
            return loseMessage;
        } break;
        case "Scissors": if (computerSelection === "Rock") {
            return loseMessage;
        }
    }
    return winMessage;
}


/**
 * Updates the score and message displayed for the user after a round is played
 * @param roundResult is a win, draw or lose message
 */
function updateScoreAndMessage(roundResult) {
    messageParagraph.textContent = roundResult;
    switch (roundResult.substring(0, 5)) {
        case "You L": computerScore = computerScore + 1; messageParagraph.style.color = "coral"; break;
        case "You W": playerScore = playerScore + 1; messageParagraph.style.color = "lightGreen"; break;
        default: messageParagraph.style.color = "lightGray"; break;
    }
    document.getElementById("human-score").textContent = "Score: " + playerScore;
    document.getElementById("computer-score").textContent = "Score: " + computerScore;
}

/**
 * Function that checks if the game is over
 */
function checkIfGameOver() {
    if (numberOfClicks !== NUMBER_OF_ROUNDS) {
        return;
    }
    if (playerScore < computerScore) {
        alert("Computer Wins");
    }
    else if (playerScore === computerScore) {
        alert("It's a Draw");
    }
    else {
        alert("You Win");
    }

}

/**
 * Function that changes the background of an element to a given color
 * @param  element is the element
 * @param color is the color that the background will have
 */
function changeBackgroundColor(element, color) {
    element.style.backgroundColor = color;
}

const rockButton = document.getElementById('rock');
rockButton.addEventListener('click', function () { playerClick(this, "Rock"); });
const paperButton = document.getElementById('paper');
paperButton.addEventListener("click", function () { playerClick(this, "Paper") });
const scissorsButton = document.getElementById('scissors');
scissorsButton.addEventListener("click", function () { playerClick(this, "Scissors") });

const computerRockButton = document.getElementById("computer-rock");
const computerPaperButton = document.getElementById("computer-paper");
const computerScissorsButton = document.getElementById("computer-scissors");

/** 
 * @returns a button that coresponds to the weapon chosen by the player
 */
function getPlayerButton() {
    if (playerSelection === 'Rock')
        return rockButton;
    if (playerSelection === 'Paper')
        return paperButton;
    if (playerSelection === 'Scissors')
        return scissorsButton;
}

/**
 * @returns a button that coresponds to the weapon chosen by the computer
 */
function getComputerButton() {
    if (computerSelection === 'Rock')
        return computerRockButton;
    if (computerSelection === 'Paper')
        return computerPaperButton;
    if (computerSelection === 'Scissors')
        return computerScissorsButton;
}

