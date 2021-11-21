var scores, roundScore, activePlayer, dice, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-new').addEventListener('click', init);

function rules() {
alert("Welcome, deux joueurs lance le dé 🎲 chacun leur tour et autant de fois qu'ils le souhaitent. Mais attention, si le dé 🎲 sort le numéro 1 alors les points accumulé sont perdu et c'est au joueur suivant de lancer le dé. Voous pouvez définir à un objectif de points à atteindre (100pts est définit par défaut). Ne soyez pas trop gourmand et penser à sécuriser votre score 🤣 ");
}


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Numéro aléatoire
        var dice1 = Math.floor(Math.random() * 6) + 1;

        // Retourne le résultat
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-1').src = './assets/dice-' + dice1 + '.png';

        // Additione le résultat du round si le numéro est autre que le 1
        if (dice1 !== 1) {
            roundScore += dice1;
            document.querySelector('#current' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Additione le résultat obtenu dans le round au score total du joueur
        scores[activePlayer] += roundScore;

        document.querySelector('#score' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Si les joeurs n'indiquent pas d'objectif de points à atteindre, alors le total de point par défaut à atteindre est de 100pts
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Vérifie si un joueur est gagnant
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';

            document.querySelector('.player' + activePlayer).classList.add('winner');
            document.querySelector('.player' + activePlayer).classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current0').textContent = '0';
    document.getElementById('current1').textContent = '0';
    document.querySelector('.player0').classList.toggle('active');
    document.querySelector('.player1').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';

}



function init() {
    scores = [0, 0]
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';

    document.getElementById('score0').textContent = '0';
    document.getElementById('score1').textContent = '0';
    document.getElementById('current0').textContent = '0';
    document.getElementById('current1').textContent = '0';
    document.querySelector('#name0').textContent = 'Player 1';
    document.querySelector('#name1').textContent = 'Player 2';
    document.querySelector('.player0').classList.remove('winner');
    document.querySelector('.player1').classList.remove('winner');
    document.querySelector('.player0').classList.remove('active');
    document.querySelector('.player1').classList.remove('active');
    document.querySelector('.player0').classList.add('active');

}
