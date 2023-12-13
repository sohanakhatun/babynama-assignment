let countdown;
let timerRunning = false;
let paused = false;
let totalSeconds = 0;

const minutesInput = document.getElementById('minutes');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');
const timerDisplay = document.getElementById('displayTimer');

startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);
pauseButton.addEventListener('click', pause);

minutesInput.addEventListener('change', () => {
  if (timerRunning || paused) {
    reset();
  }
});

function start() {
  if (!timerRunning) {
    totalSeconds = parseInt(minutesInput.value) * 60;

    if (totalSeconds > 0) {
      timerRunning = true;
      paused = false;
      countdown = setInterval(update, 1000);
    }
  }
}

function update() {
  if (!paused && totalSeconds > 0) {
    totalSeconds--;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    display(hours, minutes, seconds);

    if (totalSeconds === 0) {
      clearInterval(countdown);
      timerRunning = false;
    }
  }
}

function display(hours, minutes, seconds) {
  const displayHours = hours.toString().padStart(2, '0');
  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');
  timerDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

function reset() {
  clearInterval(countdown);
  timerRunning = false;
  paused = false;
  totalSeconds = 0;
  display(0, 0, 0);
}

function pause() {
  paused = true;
}
