// Time settings - all in minutes
const MIN_MINS = 5;
const MAX_MINS = 120;
const STEP = 5;

// Current selected minutes and time left in seconds
let selectedMins = 25;
let timeLeft = selectedMins * 60;

// Tracks whether the timer is currently running
let isRunning = false;

// Holds the interval
let timerInterval = null;

// Grab all the HTML elements
const timerDisplay = document.getElementById("timer");
const minsDisplay = document.getElementById("selected-mins");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");

// Converts seconds into MM:SS format for display
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  // padStart ensures that two digits are always shown e.g. 0 5 not 5
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Updates the timer display on screen
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  minsDisplay.textContent = `${selectedMins} minutes`;
}
