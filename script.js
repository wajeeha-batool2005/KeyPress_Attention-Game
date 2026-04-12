const mainScreen = document.getElementById("main-screen");
const resultScreen = document.getElementById("result-screen");

const charDisplay = document.getElementById("char-display");

const timeEl = document.getElementById("time");
const correctEl = document.getElementById("correct");
const wrongEl = document.getElementById("wrong");

const startBtn = document.getElementById("start-btn");
const quitBtn = document.getElementById("quit-btn");
const okBtn = document.getElementById("ok-btn");

const rCorrect = document.getElementById("r-correct");
const rWrong = document.getElementById("r-wrong");
const rTime = document.getElementById("r-time");
const rAvg = document.getElementById("r-avg");

let sequence = [];
let index = 0;

let correct = 0;
let wrong = 0;

let startTime = 0;
let times = [];
let running = false;

/* GENERATE */
function generate() {
    sequence = [];
    for (let i = 0; i < 20; i++) {
        if (Math.random() < 0.5) {
            sequence.push(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
        } else {
            sequence.push(Math.floor(Math.random() * 10).toString());
        }
    }
}

/* SHOW CHAR */
function show() {
    if (index >= sequence.length) {
        endGame();
        return;
    }

    charDisplay.textContent = sequence[index];
    startTime = performance.now();
}

/* START */
startBtn.onclick = () => {
    generate();
    index = 0;
    correct = 0;
    wrong = 0;
    times = [];
    running = true;

    updateUI();
    show();
};

/* KEY PRESS */
document.addEventListener("keydown", (e) => {
    if (!running) return;

    const current = sequence[index];
    const elapsed = (performance.now() - startTime) / 1000;

    const expected = /^[A-Z]$/.test(current) ? "a" : "l";

    if (e.key.toLowerCase() === expected) correct++;
    else wrong++;

    times.push(elapsed);

    index++;

    updateUI();
    show();
});

/* UI UPDATE */
function updateUI() {
    correctEl.textContent = correct;
    wrongEl.textContent = wrong;

    const last = times[times.length - 1] || 0;
    timeEl.textContent = last.toFixed(2) + "s";
}

/* END */
function endGame() {
    running = false;

    mainScreen.classList.remove("active");
    resultScreen.classList.add("active");

    const total = times.reduce((a,b) => a + b, 0);
    const avg = total / times.length;

    rCorrect.textContent = correct;
    rWrong.textContent = wrong;
    rTime.textContent = total.toFixed(2);
    rAvg.textContent = avg.toFixed(2);
}

function resetGame() {
    sequence = [];
    index = 0;
    correct = 0;
    wrong = 0;
    startTime = 0;
    times = [];
    running = false;

    charDisplay.textContent = "?";

    correctEl.textContent = "0";
    wrongEl.textContent = "0";
    timeEl.textContent = "0.00s";
}

/* QUIT */
quitBtn.onclick = () => {
    endGame();
    resetGame();
};

/* OK BACK */
okBtn.onclick = () => {
    resultScreen.classList.remove("active");
    mainScreen.classList.add("active");
    resetGame();
};