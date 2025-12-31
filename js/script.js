let score = {
    win: 0,
    losses: 0,
    ties: 0
};

const savedScore = JSON.parse(localStorage.getItem('score'));

if (savedScore) {
    score = savedScore;
}

updateScoreElement();

function pickComputerMove () {
    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber < (1/3)) {
        computerMove = 'rock';
    } else if (randomNumber < (2/3)) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors'
    }

    return computerMove;
}

function makeMove (move) {
    const computerMove = pickComputerMove();
    const resultElement = document.querySelector('.js-result');
    const movesElement  = document.querySelector('.js-moves-chosen');

    if (move  === computerMove) {
        resultElement.innerHTML = 'Tie.';
        score.ties += 1;
    } else if ((move === 'rock' && computerMove === 'scissors') || (move === 'paper' && computerMove === 'rock') || (move === 'scissors' && computerMove === 'paper')) {
        resultElement.innerHTML = 'You Win.';
        score.win += 1;
    } else {
        resultElement.innerHTML = 'You lose.';
        score.losses += 1;
    }

    // move element updater 
    movesElement.innerHTML = `You <img class="move-icon" src="images/${move}-emoji.png"/>, <img class="move-icon" src="images/${computerMove}-emoji.png"/> computer`;

    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
}

function resetScore () {
    score = {
        win: 0,
        losses: 0,
        ties: 0,
    };

    updateScoreElement();
    localStorage.removeItem('score');
}

function updateScoreElement () {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.win}, Losses: ${score.losses} and Ties: ${score.ties}`;
}