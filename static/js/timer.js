// Only run timer code if we're on the timer page
if (document.getElementById("timer")) {
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
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  // Updates the timer display on screen
  function updateDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
    minsDisplay.textContent = `${selectedMins} minutes`;
  }

  // Increases selected time by 5 minutes up to the maximum
  function increaseMins() {
    if (isRunning) return;
    if (selectedMins < MAX_MINS) {
      selectedMins += STEP;
      timeLeft = selectedMins * 60;
      updateDisplay();
    }
  }

  // Decreases selected time by 5 minutes down to the minimum
  function decreaseMins() {
    if (isRunning) return;
    if (selectedMins > MIN_MINS) {
      selectedMins -= STEP;
      timeLeft = selectedMins * 60;
      updateDisplay();
    }
  }

  // Starts the countdown timer
  function startTimer() {
    if (isRunning) return;
    isRunning = true;

    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        saveSession(selectedMins);
        alert("Pomodoro complete! Great work.");
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

  // Sends the completed session to Flask and handles any errors
  function saveSession(duration) {
    fetch("/save_session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duration: duration }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error("Failed to save session:", data.error);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
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
}
