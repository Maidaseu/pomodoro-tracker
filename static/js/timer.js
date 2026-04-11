// Time settings - all in minutes
const MIN_MINS = 5;
const MAX_MINS = 120;
const STEP = 5;

// Current selected minutes and time left in seconds
let selectedMins = 25;
let timeLeft = selectedMins * 60;

// Tracks whether the timer is currently running
let isRunning = false;

// Holds the interval so we can stop it later
let timerInterval = null;

// Grab all the HTML elements we need
const timerDisplay = document.getElementById("timer");
const minsDisplay = document.getElementById("selected-mins");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
