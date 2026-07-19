// define choices //
const choices = ["heads", "tails"];

const choiceImage = {
    heads: "coinflipImages/headsImage.jpg",
    tails: "coinflipImages/tailsImage.jpg"
};

// game starting point //
const match = {   
    user: 0,
    computer: 0,

    targetWins: 5
};

// Locks buttons during round //
let roundIsRunning = false;

// Tracks if game is over //
let gameIsOver = false;

// Select HTML elements //
//------Buttons------- //
const headsButton =
document.querySelector("#heads");

const tailsButton =
document.querySelector("#tails");

const testButton =
    document.querySelector("#tester");

const computerChoiceImage =
    document.querySelector("#computer-choice-image");

const roundResultText = 
    document.querySelector("#round-result-text");

const resetGameButton =
    document.querySelector(".reset-game");

const finalResetButton =
    document.querySelector("#final-reset-button");


const choiceButtonMap = {
    heads: headsButton,
    tails: tailsButton
};
//-------Popup------//
const gameOverPopup =
    document.querySelector("#game-over-popup");

const gameOverTitle = 
    document.querySelector("#game-over-title");

const gameOverImage =
    document.querySelector("#game-over-image");

const gameOverMessage =
    document.querySelector("#game-over-message");


//------Score Dots-------//
const playerDots =
document.querySelectorAll(".player-dots span");

const computerDots =
document.querySelectorAll(".computer-dots span");

// Button array to enable and disable easily //

const choiceButtons = [headsButton, tailsButton];

// Make random computer choice //
function getRandomCoinflip() {
    const randomIndex =
        Math.floor(Math.random() * choices.length);

    const randomCoinflip = 
        choices[randomIndex];

        return randomCoinflip;
};

// Make players choice //
function selectChoice(selectedButton) {
    headsButton.classList.remove("choice-selected");
    tailsButton.classList.remove("choice-selected");

    selectedButton.classList.add("choice-selected");
}
// Clear selected choice //
function clearSelectedChoice() {
    headsButton.classList.remove("choice-selected");
    tailsButton.classList.remove("choice-selected");
}
// Display message and erase in round results box //
function displayRoundMessage(message) {
    roundResultText.textContent = message;
}
function clearRoundMessage() {
    roundResultText.textContent = "";
}
//-------Disable and enable buttons after choice-------//
function disableChoiceButtons() {
    headsButton.disabled = true;
    tailsButton.disabled = true;
    resetGameButton.disabled = true;
}
function enableChoiceButtons (){
    headsButton.disabled = false;
    tailsButton.disabled = false;
}
// Clear round dots //
function clearRoundDots() {
    playerDots.forEach(function(dot){
        dot.classList.remove("dot-active");
    });
    computerDots.forEach(function(dot){
        dot.classList.remove("dot-active");
    });
}
// Rolling coin image //
function rollCoin(playerSelection, finalSelection) {

//-------Always begin on heads-------//
let currentChoiceIndex = 0;

//-------Start fast-------//
let delay = 40;
computerChoiceImage.style.visibility = "visible";

//-------Add blur while rolling-------//
computerChoiceImage.classList.add("coin-rolling");

function showNextCoinImage() {
    const currentChoice = choices[currentChoiceIndex];

    computerChoiceImage.src = choiceImage[currentChoice];
    computerChoiceImage.alt = `Coin rolling: ${currentChoice}`;

    currentChoiceIndex++;

    if (currentChoiceIndex === choices.length) {
        currentChoiceIndex = 0;
    }

//-------Gradually slow down animation-------//
delay += 20;

if (delay < 300) {
    setTimeout(
        showNextCoinImage,
        delay
    );
}
else {
    computerChoiceImage.src = choiceImage[finalSelection];
    computerChoiceImage.alt = `coin landed on ${finalSelection}`;
    computerChoiceImage.classList.remove("coin-rolling");

    const result = round(playerSelection, finalSelection);
        updateScore(result.winner);
        displayRoundMessage(result.message);
        clearSelectedChoice();
        
        if (!gameIsOver) {
            enableChoiceButtons();
        }
               
    }

}
clearRoundMessage();
showNextCoinImage();
}


// Who wins round //
function round(playerSelection, randomSelection) {
    if (playerSelection === randomSelection) {
        return {
            winner: "user",
            message:
                `You won, you chose ${playerSelection} and it landed on ${randomSelection}!`
        };
    }
    else {
        return {
            winner: "computer",
            message:
                `You lost, you chose ${playerSelection} and it landed on ${randomSelection}!`
        }
    }        
};


// Light computer dots from the bottom up //
function lightNextComputerDot() {
//-------Stop when someone reaches 5-------//
    if (match.computer >= match.targetWins) {
        return;
    }
//------Start with bottom dot-------//
const nextDotIndex = 
    playerDots.length - 1 - match.computer;

const nextComputerDot =
    computerDots[nextDotIndex];

nextComputerDot.classList.add("dot-active");

match.computer++;
}

// Light player dots //
function lightNextPlayerDot() {
    if (match.user >= match.targetWins) {
        return;
    }
const nextDotIndex = 
    playerDots.length - 1 - match.user;

const nextPlayerDot = 
    playerDots[nextDotIndex];

nextPlayerDot.classList.add("dot-active");

match.user++;
}

// Game over popup //
function showGameOverPopup(title, image, alt, message) {
    gameOverTitle.textContent = title;
    gameOverImage.src = image;
    gameOverImage.alt = alt;
    gameOverMessage.textContent = message;

    gameOverPopup.classList.remove("hidden");
}

// Update score //
function updateScore(winner) {
    if (winner === "user") {
        lightNextPlayerDot();
    // Shows popup after win //
        if (match.user === match.targetWins) {
            gameIsOver = true;

            showGameOverPopup(
                "YOU WIN!",
                "coinflipImages/winner.gif",
                "You won the game!",
                "Congratulations! You reached 5 points first!"
            );
        }
    }
    
    else if (winner === "computer") {
        lightNextComputerDot();
    // Shows lose popup //
        if (match.computer === match.targetWins) {
            gameIsOver = true;

            showGameOverPopup(
                "YOU LOSE!",
                "coinflipImages/matchGameOver.gif",
                "You lost the game!",
                "You lost, Better luck next time!"
            );
        }
    }
}


// Reset button //
function resetGame() {
    gameIsOver = false;

    match.user = 0;
    match.computer = 0;

    clearRoundDots();
    clearRoundMessage();

    clearSelectedChoice();
    enableChoiceButtons();
    gameOverPopup.classList.add("hidden");
};
// Event Listeners //
headsButton.addEventListener("click", () => {
    selectChoice(headsButton);
});

tailsButton.addEventListener("click", () => {
    selectChoice(tailsButton);
});

headsButton.addEventListener("click", () => {
    selectChoice(headsButton);
    disableChoiceButtons();
    
    const result = getRandomCoinflip();
    rollCoin("heads", result)
});

tailsButton.addEventListener("click", () => {
    selectChoice(tailsButton);
    disableChoiceButtons();
    
    const result = getRandomCoinflip();
    rollCoin("tails", result)
});
resetGameButton.addEventListener("click", () => {
    resetGame();
});
finalResetButton.addEventListener("click", () => {
    resetGame();
})