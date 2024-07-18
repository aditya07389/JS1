var scores, roundScore, activePlayer, gamePlaying;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function updateCurrentScore(player, score) {
    document.querySelector('#current-' + player).textContent = score;
}

function updateTotalScore(player, score) {
    document.querySelector('#score-' + player).textContent = score;
}

// Function to roll the dice
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        var dice = rollDice();

        console.log("Dice rolled: " + dice); // Log the dice value for debugging

        if (dice !== 1) {
            roundScore += dice;
            updateCurrentScore(activePlayer, roundScore);
        } else {
            roundScore = 0;
            updateCurrentScore(activePlayer, roundScore);
            activePlayer = activePlayer === 0 ? 1 : 0;
            toggleActivePlayer();
        }

        // Update the dice image
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        console.log("Dice image source: " + diceDOM.src); // Log the dice image source for debugging
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add the current round score to the active player's total score
        scores[activePlayer] += roundScore;

        // Update the UI with the new total score
        updateTotalScore(activePlayer, scores[activePlayer]);

        // Check if the active player has won the game
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

            // Show play again button
            document.querySelector('.btn-new').textContent = 'Play Again';
            document.querySelector('.btn-new').style.display = 'block';
        } else {
            // Reset the round score
            roundScore = 0;
            updateCurrentScore(activePlayer, roundScore);

            // Switch to the next player
            activePlayer = activePlayer === 0 ? 1 : 0;
            toggleActivePlayer();
        }
    }
});

function toggleActivePlayer() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', function() {
    // Reset the button text to "New Game" and hide it until the next win
    document.querySelector('.btn-new').textContent = 'New Game';
    document.querySelector('.btn-new').style.display = 'none';
    init();
});

init();
