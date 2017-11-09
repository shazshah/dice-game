/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying, previousDice, userScoreChoice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        userScoreChoice = document.getElementById("scoreToReach").value;
        // 1. Random number
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;

        //2. display the result
        var diceOneDOM = document.querySelector('.diceOne');
        diceOneDOM.style.display = 'block';
        diceOneDOM.src = 'dice-' + diceOne + '.png';

        var diceTwoDOM = document.querySelector('.diceTwo');
        diceTwoDOM.style.display = 'block';
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';

        //3. Update the round score IF the rolled number was NOT a 1
        if (diceOne > 1 || diceTwo > 1) {
            //check if two sixes are rolled.
            if(diceOne === 6 || diceTwo === 6){
                previousDice += 1
                if(previousDice != 2) {
                    roundScore += diceOne;
                    roundScore += diceTwo;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }
            } else if (previousDice != 2){
                //add score
                roundScore += diceOne;
                roundScore += diceTwo;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer()
            }
        } else {
            //next player
            nextPlayer();

            //document.querySelector('.player-0-panel').classList.remove('active');
            //document.querySelector('.player-1-panel').classList.add('active');
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if the player won the game
        if (scores[activePlayer] >= userScoreChoice) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.diceOne').style.display = 'none';
            document.querySelector('.diceTwo').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            
            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousDice = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.diceOne').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    userScoreChoice = 15;

    previousDice = 0;

    document.querySelector('.diceOne').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active`');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
       
}
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;







