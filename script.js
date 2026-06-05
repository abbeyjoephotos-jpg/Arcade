// Define choices
let choice = ['rock', 'paper', 'scissors'];
// Randomly generate computer choices
function getComputerChoice(choice){
    return choice[Math.floor(Math.random() * choice.length)];
}
console.log(getComputerChoice(choice));
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
const playerSelection = prompt("Please enter value").toLowerCase();
const computerSelection = getComputerChoice(choice);
console.log(round(playerSelection,computerSelection))

