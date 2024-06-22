document.addEventListener('DOMContentLoaded', () => {
    const choices = ['Piedra', 'Papel', 'Tijeras'];
    const machineImg = document.getElementById('machine-img');
    const userImg = document.getElementById('user-img');
    const startText = document.getElementById('start-text');
    const player1ScoreEl = document.getElementById('player1-score');
    const player2ScoreEl = document.getElementById('player2-score');
    const attemptsInput = document.getElementById('attempts');
    const startGameButton = document.getElementById('start-game');
    const buttons = document.querySelectorAll('#group-btn button');
    const singlePlayerButton = document.getElementById('singleplayer');
    const multiPlayerButton = document.getElementById('multiplayer');

    let player1Score = 0;
    let player2Score = 0;
    let remainingAttempts = 0;
    let gameMode = 'single'; // 'single' para jugar contra la máquina, 'multi' para dos jugadores

    // Inicia el juego
    startGameButton.addEventListener('click', () => {
        remainingAttempts = parseInt(attemptsInput.value);
        player1Score = 0;
        player2Score = 0;
        player1ScoreEl.textContent = player1Score;
        player2ScoreEl.textContent = player2Score;
        startText.textContent = 'Elige una opción';
        startGameButton.disabled = true;
        attemptsInput.disabled = true;
        singlePlayerButton.disabled = true;
        multiPlayerButton.disabled = true;
        buttons.forEach(button => button.disabled = false);
    }); 

    // Cambia el modo de juego
    singlePlayerButton.addEventListener('click', () => {
        gameMode = 'single';
        singlePlayerButton.disabled = true;
        multiPlayerButton.disabled = false;
    });

    multiPlayerButton.addEventListener('click', () => {
        gameMode = 'multi';
        multiPlayerButton.disabled = true;
        singlePlayerButton.disabled = false;
    });

    // Juega una ronda
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const userChoice = button.textContent;
            const machineChoice = choices[Math.floor(Math.random() * choices.length)];
            userImg.src = `images/${userChoice.toLowerCase()}.png`;
            machineImg.src = `images/${machineChoice.toLowerCase()}.png`;

            if (userChoice === machineChoice) {
                startText.textContent = 'Empate';
            } else if (
                (userChoice === 'Piedra' && machineChoice === 'Tijeras') ||
                (userChoice === 'Papel' && machineChoice === 'Piedra') ||
                (userChoice === 'Tijeras' && machineChoice === 'Papel')
            ) {
                startText.textContent = 'Ganaste';
                player1Score++;
                player1ScoreEl.textContent = player1Score;
            } else {
                startText.textContent = 'Perdiste';
                player2Score++;
                player2ScoreEl.textContent = player2Score;
            }

            remainingAttempts--;
            if (remainingAttempts === 0) {
                startText.textContent = 'Fin del juego';
                startGameButton.disabled = false;
                attemptsInput.disabled = false;
                buttons.forEach(button => button.disabled = true);
            }
        });
    });
}

