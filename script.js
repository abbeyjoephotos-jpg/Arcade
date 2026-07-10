// Define choices
let choice = ['rock', 'paper', 'scissors'];
// Randomly generate computer choices
function getComputerChoice(choice){
    return choice[Math.floor(Math.random() * choice.length)];
}
// Input player choice; Determine winner
function round (playerSelection,computerSelection){
    if (playerSelection===computerSelection){
        return "It's a tie. You both picked the same choice!" ;
    }
    else if (playerSelection==="rock" && computerSelection==="scissors"){
        return "You win! Rock beats Scissors!";
    }
    else if (playerSelection==="paper" && computerSelection==="rock"){
        return "You win! Paper beats Rock!";
    }
    else if (playerSelection==="scissors" && computerSelection==="paper"){
        return "You win! Scissors beats Paper!";
    }
    else {
        return "You lose!"
    }
}

const playerDots = document.querySelectorAll(".player-dots span");
const computerDots = document.querySelectorAll(".computer-dots span");

const playerMatchDisplay = document.querySelector("#player-match-display");
const computerMatchDisplay = document.querySelector("#computer-match-display");

const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");

// match total wins //

const match = {
    user: 0,
    computer: 0,
    userMatches: 0,
    computerMatches: 0,
    targetWins: 3
};

// seven segment function //

function setDigit(display, number) {
    const segmentMap = {
        0: ["top", "upper-left", "upper-right", "lower-left", "lower-right", "bottom"],
        1: ["upper-right", "lower-right"],
        2: ["top", "upper-right", "middle", "lower-left", "bottom"],
        3: ["top", "upper-right", "middle", "lower-right", "bottom"],
        4: ["upper-left", "upper-right", "middle", "lower-right"],
        5: ["top", "upper-right", "middle", "lower-left", "bottom"],
        6: ["top", "upper-left", "middle", "lower-left", "lower-right", "bottom"],
        7: ["top", "upper-right", "lower-right"],
        8: ["top", "upper-left", "upper-right", "middle", "lower-left", "lower-right", "bottom"],
        9: ["top", "upper-left", "upper-right", "middle", "lower-right", "bottom"],
    };
    const segments = display.querySelectorAll(".segment");
        segments.forEach(function(segment) {
            segment.classList.remove("on");
        });

        segmentMap[number].forEach(function(segmentName) {
            display.querySelector("." + segmentName).classList.add("on");
        });           
        }
// Set both counts to 0 when page loads //

setDigit(playerMatchDisplay, 0);
setDigit(computerMatchDisplay, 0);

// button event listeners //

rockButton.addEventListener("click", function() {
    playRoundFromButton("rock");
});
paperButton.addEventListener("click", function() {
    playRoundFromButton("paper");
});
scissorsButton.addEventListener("click", function() {
    playRoundFromButton("scissors");
});

// press button to play function //

function playRoundFromButton(playerSelection) {
    if (match.user >= match.targetWins || match.computer >= match.targetWins){
        console.log("Game over, please press reset for another round.");
        return;
    }
const computerSelection = getComputerChoice(choice);
const winner = round(playerSelection, computerSelection);

    if (winner === "user") {
        updateScore("user");
    }
    else if (winner === "computer") {
        updateScore("computer");
    }
}

// score keeper function //
function updateScore(winner) {
    if (winner === "user") {
        playerDots[match.user].classList.add("dot-active");
        match.user++;
    }
    
    else if (winner === "computer") {
        playerDots[match.computer].classList.add("dot-active");
        match.computer++;
    }
    
    if (match.user === match.targetWins) {
        match.userMatches++;
        setDigit(playerMatchDisplay, match.userMatches);
        showMatchPopup("You Won the Match. Press Next Game!", "win");
    }
    
    if (match.computer === match.targetWins) {
        match.computerMatches++;
        setDigit(computerMatchDisplay, match.computerMatches);
        showMatchPopup("Better Luck Next Time, Computer Wins.  Press Next Game!", "win");
    }
}
// popup  function //
function showMatchPopup(message, resultType) {
    matchMessage.textContent = message;

    if (resultType === "win") {
        matchMedia.src = "images/fireworks.gif";
        matchMedia.alt = "Fireworks Celebration";
    }

    else (resultType === "lose") {
        matchMedia.src = "images/gameover.jpg";
        matchMedia.alt = "Game Over";
    }

    matchPopup.classList.remove("hidden");
}
// Clear only round dots for best of 5 game //

function clearRoundDots() {
    playerDots.forEach(function(dot) {
        dot.classList.remove("dot-active");
    });

    computerDots.forEach(function(dot) {
        dot.classList.remove("dot-active")
    });
}
// Next best of 5 match //

function nextGame() {
    match.user = 0;
    match.computer = 0;

    clearRoundDots();

    matchPopup.classList.add("hidden");
}

// Reset full game //

function resetGame() {
    match.user = 0;
    match.computer = 0;
    match.userMatches = 0;
    match.computerMatches = 0;

    clearRoundDots();

    setDigit(playerMatchDisplay, 0);
    setDigit(computerMatchDisplay, 0);

    matchPopup.classList.add("hidden");
}

nextGameButton.addEventListener("click", function() {
    nextGame();
});

resetGameButton.addEventListener("click", function() {
    resetGame();
});

// Add 1 round to whoever won the round //
function updateScore(winner) {
    if (winner === "user") {
        playerDots[match.user].classList.add("dot-active");
        match.user++;
    }
    else if (winner === "computer") {
        computerDots[match.computer].classList.add("dot-active");
        match.computer++;
    }
// see if user won the best of 5 match //

if (match.user === match.targetWins) {
    match.userMatches++;
    setDigit(playerMatchDisplay, match.userMatches);
    console.log(userWin)
}

}

