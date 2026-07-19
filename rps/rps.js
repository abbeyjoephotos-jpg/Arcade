// Difine choices //
const choices = ["rock", "paper", "scissors"];

const choiceImages = {
    rock: "rpsimages/buttonrock.png",
    paper: "rpsimages/buttonpaper.png",
    scissors: "rpsimages/buttonscissors.png"
};
// Game starting points //
const match = {
// Current best of 5 match //
    user: 0,
    computer: 0,
// Total match win count //
    userMatches: 0,
    computerMatches: 0,
// First to 3 wins //
    targetWins: 3,
// First to 5 matches //
    targetMatches: 5
};
// Prevents buttons pressed during animation //
let roundIsRunning = false;

// Tracks if game is done //
let gameIsOver = false;

// Select HTML elements //

//---------Score dots ---------//
const playerDots = 
document.querySelectorAll(".player-dots span");

const computerDots = 
document.querySelectorAll(".computer-dots span");

//---------Seven segment display--------//
const playerMatchDisplay =
document.querySelector("#player-match-display");

const computerMatchDisplay =
document.querySelector("#computer-match-display");

//---------Choice Buttons---------//
const rockButton = 
document.querySelector("#rock");

const scissorsButton = 
document.querySelector("#scissors");

const paperButton = 
document.querySelector("#paper");

const choiceButtonMap = {
    rock: rockButton,
    paper: paperButton,
    scissors: scissorsButton
};

// Button array to enable and disable easily //
const choiceButtons = [rockButton, scissorsButton, paperButton];

// Round status screen //
const playerChoiceImage = 
document.querySelector("#player-choice-image");

const computerChoiceImage =
document.querySelector("#computer-choice-image");

const roundResultText =
document.querySelector("#round-result-text");

// Match winner popup //
const matchPopup =
document.querySelector("#match-popup");

const matchMessage =
document.querySelector("#match-message");

const matchMedia =
document.querySelector("#match-media");

const nextGameButton =
document.querySelector("#next-game");

const resetGameButton =
document.querySelector("#reset-game");

const gameOverPopup = 
document.querySelector("#game-over-popup");

const gameOverTitle =
document.querySelector("#game-over-title");

const gameOverImage =
document.querySelector("#game-over-image");

const gameOverMessage =
document.querySelector("#game-over-message");

const finalResetButton =
document.querySelector("#final-reset-button");

// Make random computer choice //
function getComputerChoice() {
    const randomIndex =
        Math.floor(Math.random() * choices.length);

    const computerChoice =
        choices[randomIndex];

    return computerChoice;
}
// Determine who wins round //
function round(playerSelection, computerSelection) {
//---------Tie--------//
if (playerSelection === computerSelection) {
    return {
        winner: "tie", 
        message: 
            `It's a tie! You both chose ${playerSelection.toUpperCase()}.`
    };
}
//---------Player winner---------//
else if (playerSelection === "rock" && computerSelection === "scissors") {
    return {
        winner: "user",
        message:
            "You win! Rock crushes scissors!"
    };
}
else if (playerSelection === "paper" && computerSelection === "rock") {
    return {
        winner: "user",
        message:
            "You win! Paper covers rock!"
    };
}
else if (playerSelection === "scissors" && computerSelection === "paper") {
    return {
        winner: "user",
        message:
            "You win! Scissors cut paper!"
    };
}
//--------Computer winner--------//
else if (computerSelection === "rock" && playerSelection === "scissors") {
    return {
        winner: "computer",
        message:
            "You lost! Computer chooses rock!"
    };
}
else if (computerSelection === "paper" && playerSelection === "rock") {
    return {
        winner: "computer",
        message:
            "You lost! Computer chooses paper!"
    };
}
else {
    return {
        winner: "computer",
        message:
            "You lost! Computer chooses scissors!"
        };
    }
}

// Seven segment display logic //
function setDigit(display, number) {
    const segmentMap = {
        0: ["top", "upper-left", "upper-right", "lower-left", "lower-right", "bottom"],
        1: ["upper-right", "lower-right"],
        2: ["top", "upper-right", "middle", "lower-left", "bottom"],
        3: ["top", "upper-right", "middle", "lower-right", "bottom"],
        4: ["upper-left", "upper-right", "middle", "lower-right"],
        5: ["top", "upper-left", "middle", "lower-right", "bottom"],
        6: ["top", "upper-left", "middle", "lower-left", "lower-right", "bottom"],
        7: ["top", "upper-right", "lower-right"],
        8: ["top", "upper-left", "upper-right", "middle", "lower-left", "lower-right", "bottom"],
        9: ["top", "upper-left", "upper-right", "middle", "lower-right", "bottom"]
    };

    const segments =
        display.querySelectorAll(".segment");

    segments.forEach(function (segment) {
        segment.classList.remove("on");
    });

    const segmentsToTurnOn =
        segmentMap[number];

    segmentsToTurnOn.forEach(function (segmentName) {
        const segment =
            display.querySelector("." + segmentName);

        segment.classList.add("on");
    });
}

// Both matches start at 0
setDigit(playerMatchDisplay, 0);
setDigit(computerMatchDisplay, 0);

// Prevents additional button presses while round is running //
function disableChoiceButtons() {
    choiceButtons.forEach(function (button) {
        button.disabled = true;
    });
}

// Turns choice buttons back on after round animation completes //
function enableChoiceButtons() {
    choiceButtons.forEach(function (button) {
        button.disabled = false;
    });
}  
function clearSelectedButton() {
    choiceButtons.forEach(function (button) {
        button.classList.remove("choice-selected");
    });
}

// show and rolling effects after choices made //

//-------show player choice-------//
function showPlayerChoice(playerSelection) {
    
    playerChoiceImage.src =
        choiceImages[playerSelection];
    
    playerChoiceImage.alt = 
    `Player chose ${playerSelection}`;

    playerChoiceImage.style.visibility = "visible";
}


//-------Rolling effect for computer choice------//
function rollComputerChoice(computerSelection) {
    return new Promise(function (resolve) {
        let currentChoiceIndex = 0;
        
        computerChoiceImage.style.visibility = "visible";

        const rollingInterval = setInterval(function () {
            const rollingChoice = choices[currentChoiceIndex];

            computerChoiceImage.src = choiceImages[rollingChoice];

            computerChoiceImage.alt = `Computer rolling: ${rollingChoice}`;
            currentChoiceIndex++;

            if (currentChoiceIndex === choices.length) {
                currentChoiceIndex = 0
            }            
        }, 120);
        
        setTimeout(function (){
            clearInterval(rollingInterval);
            computerChoiceImage.src = choiceImages[computerSelection];
            computerChoiceImage.alt = `Computer chose ${computerSelection}`;
            
            resolve();
        }, 2000);
    });
}

// Play one round //
async function playRoundFromButton(buttonChoice) {
    if (roundIsRunning === true) {
        return;
    }
    if (gameIsOver === true) {
        return;
    }

    // Don't allow more rounds once best of 5 match is over//
if (match.user >= match.targetWins || match.computer >= match.targetWins) {
    return;
    }

// Lock buttons until round finished //
roundIsRunning = true;
disableChoiceButtons();

// Remove previous rounds message //
roundResultText.textContent = "";
roundResultText.className = "";

// Player Selection //
const playerSelection = buttonChoice;

const selectedButton = choiceButtonMap[playerSelection];
selectedButton.classList.add("choice-selected");

playerChoiceImage.src = choiceImages[playerSelection];
playerChoiceImage.alt = playerSelection;
playerChoiceImage.style.visibility = "visible";

//-------Computer Selection-------//
const computerSelection = getComputerChoice();

await rollComputerChoice(computerSelection);

clearSelectedButton();
//------Determine winner-------//
const roundResult = round(playerSelection, computerSelection);

//-------Display Result-------//
roundResultText.textContent = roundResult.message;

if (roundResult.winner === "user") {
    roundResultText.classList.add("round-win");
    }
else if (roundResult.winner === "computer") {
    roundResultText.classList.add("round-loss");
}
else {
    roundResultText.classList.add("round-tie");
    }


// Update the score //
const matchFinished = updateScore(roundResult.winner);

// Re engage buttons //
roundIsRunning = false;
if (matchFinished === false){
    enableChoiceButtons();
    }
}

// Score update round and match //
function updateScore(winner) {

    //------Player wins round-------//
    if (winner === "user") {
        const nextPlayerDot = playerDots[match.user];

    nextPlayerDot.classList.add("dot-active");
    match.user++
    }
    //-------Computer wins roound-------//
    else if (winner === "computer") {
        const nextComputerDot = computerDots[match.computer];

    nextComputerDot.classList.add("dot-active");
    match.computer++;
    }
    //-------Round ties-------//
    else {
        return false;
    }
    
    //------Player wins a match------//
// Player wins a match
    if (match.user === match.targetWins) {
        match.userMatches++;

        setDigit(playerMatchDisplay, match.userMatches);

    // Player has now won 5 complete matches
    if (match.userMatches === match.targetMatches) {
        gameIsOver = true;

        disableChoiceButtons();

        showGameOverPopup("player");

        return true;
    }

    // Player won this match but has fewer than 5 total
    showMatchPopup("You Won the Match!", "win");

    return true;
}

    //-------Computer wins match------//
    if (match.computer === match.targetWins) {
        match.computerMatches++;

        setDigit(computerMatchDisplay, match.computerMatches);

    //-------Checks if computer reached 5 matches yet------//
    if (match.computerMatches === match.targetMatches) {
        gameIsOver = true;
        disableChoiceButtons();
        showGameOverPopup("computer");
        return true;
        }
    //-------Computer wins match but no one reaches 5 yet------//
    showMatchPopup("COMPUTER WINS THE MATCH", "lose");
    return true;
    }
    //-------If nobody has won yeet-------//
    return false;
}

// Match popup //

function showMatchPopup(message, resultType) {

    matchMessage.textContent = message;

    if (resultType === "win") {
        matchMedia.src = "images/fireworks.gif";
        matchMedia.alt = "Fireworks Display";
    }
    else {
        matchMedia.src = "images/gameover.jpg";
        matchMedia.alt = "Game Over";
    }
    matchPopup.classList.remove("hidden");
}
function showGameOverPopup(winner) {
    matchPopup.classList.add("hidden");

    if (winner === "player") {
        gameOverTitle.textContent = "YOU ARE THE CHAMPION!";
        gameOverMessage.textContent = `Final Score: Player ${match.userMatches} -  ${match.computerMatches} Computer`;
        gameOverImage.src = "images/Winner.gif";
        gameOverImage.alt = "Final match winner";
    }
    else {
        gameOverTitle.textContent = "GAME OVER, COMPUTER WINS!";
        gameOverMessage.textContent = `Final Score: Player ${match.userMatches} - ${match.computerMatches} Computer`;
        gameOverImage.src = "images/matchGameOver.gif";
        gameOverImage.alt = "Final match loser";
    }
// Displays final popup //
gameOverPopup.classList.remove("hidden");
}


// Disable dots //
function clearRoundDots() {
    playerDots.forEach(function(dot) {
        dot.classList.remove("dot-active");
    });

    computerDots.forEach(function(dot) {
        dot.classList.remove("dot-active");
    });
}

// Clear status screen //
function clearStatusScreen() {
    playerChoiceImage.src = "";
    playerChoiceImage.alt = "";
    playerChoiceImage.style.visibility = "hidden";

    computerChoiceImage.src = "";
    computerChoiceImage.alt = "";
    computerChoiceImage.style.visibility = "hidden";

    roundResultText.textContent = "";
    roundResultText.className = "";
} 

// Start next match //
function nextGame() {
    match.user = 0;
    match.computer = 0;

    clearRoundDots();
    clearStatusScreen();

    matchPopup.classList.add("hidden");
    clearSelectedButton();
    enableChoiceButtons();

}

// Reset the entire game //
function resetGame() {
    gameIsOver = false;

    match.user = 0;
    match.computer = 0;

    match.userMatches = 0;
    match.computerMatches = 0;

    clearRoundDots();
    clearStatusScreen();
    
    setDigit(playerMatchDisplay, 0);
    setDigit(computerMatchDisplay, 0);

    matchPopup.classList.add("hidden");
    gameOverPopup.classList.add("hidden");

    clearSelectedButton();
    
    enableChoiceButtons();
}

// Button event listeners //
rockButton.addEventListener("click", function () {
    const buttonChoice = "rock";
    playRoundFromButton(buttonChoice);
});

paperButton.addEventListener("click", function () {
    const buttonChoice = "paper";
    playRoundFromButton(buttonChoice);
});

scissorsButton.addEventListener("click", function () {
    const buttonChoice = "scissors";
    playRoundFromButton(buttonChoice);
});

//------Popup buttons------//
nextGameButton.addEventListener("click", function (){
    nextGame();
});

resetGameButton.addEventListener("click", function () {
    resetGame();
});

finalResetButton.addEventListener("click", function() {
    resetGame();
});
