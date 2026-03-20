// Elements
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const newGameBtn = document.getElementById('new-game-btn');
const quitBtn = document.getElementById('quit-btn');
const homeBtn = document.getElementById('home-btn');
const retryBtn = document.getElementById('retry-btn');
const charDisplay = document.getElementById('char-display');
const gameInfo = document.getElementById('game-info');

const resultCorrect = document.getElementById('result-correct');
const resultWrong = document.getElementById('result-wrong');
const resultTime = document.getElementById('result-time');
const resultAvg = document.getElementById('result-avg');

let sequence = [];
let currentIndex = 0;
let correct = 0;
let wrong = 0;
let startTime = 0;
let keypressTimes = [];

// Generate 20 random letters/numbers
function generateSequence() {
  sequence = [];
  for (let i = 0; i < 20; i++) {
    if (Math.random() < 0.5) {
      sequence.push(String.fromCharCode(65 + Math.floor(Math.random() * 26))); // letters A-Z
    } else {
      sequence.push(Math.floor(Math.random() * 10).toString()); // numbers 0-9
    }
  }
}

// Show character and start timer
function showChar() {
  if (currentIndex < sequence.length) {
    charDisplay.textContent = sequence[currentIndex];
    startTime = performance.now();
  } else {
    endGame();
  }
}

// Start game
function startGame() {
  homeScreen.classList.remove('active');
  resultScreen.classList.remove('active');
  gameScreen.classList.add('active');

  correct = 0;
  wrong = 0;
  currentIndex = 0;
  keypressTimes = [];

  gameInfo.innerHTML = '';
  generateSequence();
  showChar();
}

// Handle keypress
document.addEventListener('keydown', (e) => {
  if (!gameScreen.classList.contains('active')) return;

  const currentChar = sequence[currentIndex];
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(2); // time for this keypress

  const correctKey = /^[A-Z]$/.test(currentChar) ? 'a' : 'l';

  if (e.key.toLowerCase() === correctKey) {
    correct++;
  } else {
    wrong++;
  }

  keypressTimes.push(parseFloat(elapsed));

  // Show per-keypress info, centered, line by line
  gameInfo.innerHTML = `
    <p>Correct Moves: ${correct}</p>
    <p>Wrong Moves: ${wrong}</p>
    <p>Keypress Time: ${elapsed} s</p>
  `;

  currentIndex++;
  showChar();
});

// End game
function endGame() {
  gameScreen.classList.remove('active');
  resultScreen.classList.add('active');

  const totalTime = keypressTimes.reduce((a, b) => a + b, 0);
  const avgTime = (totalTime / keypressTimes.length).toFixed(2);

  resultCorrect.textContent = correct;
  resultWrong.textContent = wrong;
  resultTime.textContent = totalTime.toFixed(2);
  resultAvg.textContent = avgTime;
}

// Button events
newGameBtn.addEventListener('click', startGame);
quitBtn.addEventListener('click', endGame);
homeBtn.addEventListener('click', () => {
  resultScreen.classList.remove('active');
  gameScreen.classList.remove('active');
  homeScreen.classList.add('active');
});
retryBtn.addEventListener('click', startGame);