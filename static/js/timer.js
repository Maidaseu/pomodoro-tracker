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

// Increases selected time by 5 minutes up to the maximum
function increaseMins() {
  // Only allow changes when timer is not running
  if (isRunning) return;
  if (selectedMins < MAX_MINS) {
    selectedMins += STEP;
    timeLeft = selectedMins * 60;
    updateDisplay();
  }
}

// Decreases selected time by 5 minutes down to the minimum
function decreaseMins() {
  // Only allow changes when timer is not running
  if (isRunning) return;
  if (selectedMins > MIN_MINS) {
    selectedMins -= STEP;
    timeLeft = selectedMins * 60;
    updateDisplay();
  }
}

// Starts the countdown timer
function startTimer() {
  // Prevent starting if already running
  if (isRunning) return;
  isRunning = true;

  // setInterval calls this every 1000ms (1 second)
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    // When timer hits zero
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;

      // Save the completed session to the database
      saveSession(selectedMins);

      alert("Pomodoro complete! Great work.");

      // Reset for next session
      timeLeft = selectedMins * 60;
      updateDisplay();
    }
  }, 1000);
}

// Pauses the timer without resetting it
function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

// Resets the timer back to the selected minutes
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = selectedMins * 60;
  updateDisplay();
}

// Sends the completed session to Flask to save in the database
function saveSession(duration) {
  fetch("/save_session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ duration: duration }),
  });
}

// Attach all functions to their buttons
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
increaseBtn.addEventListener("click", increaseMins);
decreaseBtn.addEventListener("click", decreaseMins);

// Initialise the display on page load
updateDisplay();
