const ROCK = "piedra";
const PAPER = "papel";
const SCISSORS = "tijeras";

const TIE = 0;
const WIN = 1;
const LOST = 2;

let isPlaying = false; // Variable para controlar si se está jugando actualmente

const rockBtn = document.getElementById("piedra");
const paperBtn = document.getElementById("papel");
const scissorsBtn = document.getElementById("tijeras");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");
const restartBtn = document.getElementById("restart");

// Event listeners para los botones de juego
rockBtn.addEventListener("click", () => {
    play(ROCK);
});
paperBtn.addEventListener("click", () => {
    play(PAPER);
});
scissorsBtn.addEventListener("click", () => {
    play(SCISSORS);
});

// Función principal para manejar el juego
function play(userOption) {
    if (isPlaying) return; // Si ya está jugando, no hace nada

    isPlaying = true; // Marca que el juego está en curso

    userImg.src = "assets/" + userOption + ".png"; // Actualiza la imagen del jugador

    resultText.innerHTML = "Eligiendo..."; // Muestra mensaje de "Eligiendo..."

    // Intervalo para simular la elección de la máquina
    const interval = setInterval(function () {
        const machineOption = calcMachineOption(); // Obtiene opción aleatoria de la máquina
        machineImg.src = "assets/" + machineOption + ".png"; // Actualiza imagen de la máquina
    }, 200); // Intervalo de 200ms

    // Función para detener el intervalo después de 2 segundos
    setTimeout(function () {
        clearInterval(interval); // Detiene el intervalo

        const machineOption = calcMachineOption(); // Obtiene opción final de la máquina
        const result = calcResult(userOption, machineOption); // Calcula el resultado

        machineImg.src = "assets/" + machineOption + ".png"; // Actualiza imagen de la máquina con la elección final

        // Muestra resultado según el resultado calculado
        switch (result) {
            case TIE:
                resultText.innerHTML = "¡Empate!";
                break;
            case WIN:
                resultText.innerHTML = "¡Ganaste!";
                break;
            case LOST:
                resultText.innerHTML = "¡Perdiste!";
                break;
        }

        isPlaying = false; // Marca que el juego ha terminado
    }, 2000); // 2000ms (2 segundos) de espera
}

// Función para calcular la opción aleatoria de la máquina
function calcMachineOption() {
    const number = Math.floor(Math.random() * 3); // Número aleatorio entre 0 y 2
    switch (number) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

// Función para calcular el resultado del juego
function calcResult(userOption, machineOption) {
    if (userOption === machineOption) {
        return TIE; // Empate
    } else if (
        (userOption === ROCK && machineOption === SCISSORS) ||
        (userOption === PAPER && machineOption === ROCK) ||
        (userOption === SCISSORS && machineOption === PAPER)
    ) {
        return WIN; // Jugador gana
    } else {
        return LOST; // Jugador pierde
    }
}

//funcion para reiniciar el juego cuando se preciona el boton de restart
restartBtn.addEventListener("click", () => {
    userImg.src = "assets/question.png";
    machineImg.src = "assets/question.png";
    resultText.innerHTML = "Elige una opción";
});
