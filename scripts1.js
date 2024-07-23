let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(time) {
    let milliseconds = parseInt((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function startPause() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.innerHTML = formatTime(elapsedTime);
        }, 10);
        startPauseBtn.innerHTML = "Pause";
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.innerHTML = "Start";
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.innerHTML = "00:00:00.00";
    startPauseBtn.innerHTML = "Start";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    isRunning = false;
    laps.innerHTML = '';
    lapCounter = 1;
}

function lap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(lapItem);
    lapCounter++;
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
