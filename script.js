// ------------------------------
// Typing Tool Main Logic Script
// ------------------------------

// Hard-coded paragraph for typing practice
const paragraphText =
  "Typing is a fundamental skill that helps you communicate efficiently with computers. Practice daily to improve your speed and accuracy, and learn to use all your fingers for the best results.";

// Selectors for DOM elements
const typingDisplay = document.getElementById("typingDisplay");
const typingInput = document.getElementById("typingInput");
const wpmDisplay = document.getElementById("liveWPM");
const accuracyDisplay = document.getElementById("liveAccuracy");
const resultBox = document.getElementById("resultBox");
// Restart button (for test page)
const restartBtn = document.getElementById("restartBtn");

// State variables for typing logic
let started = false;       // Has typing started?
let startTime = null;      // Timestamp when typing starts
let timerInterval = null;  // Interval for updating stats
let currentIndex = 0;      // Current character index user is typing
let correctCount = 0;      // Number of correct characters typed
let errorCount = 0;        // Number of incorrect characters typed
let totalTyped = 0;        // Total characters typed

// Utility: Render the paragraph with highlights for correct/incorrect typing
function renderParagraph(userInput) {
  let html = "";
  for (let i = 0; i < paragraphText.length; i++) {
    let char = paragraphText[i];
    if (i < userInput.length) {
      if (userInput[i] === char) {
        // Correct character: highlight green
        html += `<span class="typed-correct">${char}</span>`;
      } else {
        // Incorrect character: highlight red
        html += `<span class="typed-wrong">${char}</span>`;
      }
    } else {
      // Untyped character: default style
      html += `<span>${char}</span>`;
    }
  }
  typingDisplay.innerHTML = html;
}

// Utility: Calculate WPM (words per minute)
function calculateWPM(charsTyped, elapsedSeconds) {
  // 1 word = 5 chars (standard)
  if (elapsedSeconds === 0) return 0;
  const words = charsTyped / 5;
  const minutes = elapsedSeconds / 60;
  return Math.round(words / minutes);
}

// Utility: Calculate accuracy percentage
function calculateAccuracy(correct, total) {
  if (total === 0) return 100;
  return Math.round((correct / total) * 100);
}

// Timer: Start the timer and update WPM/accuracy every 0.2 seconds
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const wpm = calculateWPM(totalTyped, elapsed);
    const accuracy = calculateAccuracy(correctCount, totalTyped);
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy + "%";
  }, 200);
}

// Timer: Stop the timer and show final results
function stopTimer() {
  clearInterval(timerInterval);
  const elapsed = (Date.now() - startTime) / 1000;
  const wpm = calculateWPM(totalTyped, elapsed);
  const accuracy = calculateAccuracy(correctCount, totalTyped);

  // Show final results
  resultBox.innerHTML =
    `<div class="result-title">Typing Complete!</div>
     <div class="result-score">WPM: <b>${wpm}</b></div>
     <div class="result-accuracy">Accuracy: <b>${accuracy}%</b></div>`;
  resultBox.style.display = "block";
}

// Event: User input handler
typingInput.addEventListener("input", function (e) {
  const userInput = typingInput.value;

  // Start timer on first character
  if (!started && userInput.length > 0) {
    started = true;
    startTimer();
    resultBox.style.display = "none";
  }

  // Reset tracking
  correctCount = 0;
  errorCount = 0;
  totalTyped = userInput.length;

  // Calculate correct and error chars
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === paragraphText[i]) {
      correctCount++;
    } else {
      errorCount++;
    }
  }

  // Render paragraph highlighting
  renderParagraph(userInput);

  // Update WPM/accuracy in real-time
  if (started) {
    const elapsed = (Date.now() - startTime) / 1000;
    wpmDisplay.textContent = calculateWPM(totalTyped, elapsed);
    accuracyDisplay.textContent = calculateAccuracy(correctCount, totalTyped) + "%";
  }

  // If paragraph completed, stop timer and show results
  if (userInput === paragraphText) {
    stopTimer();
    typingInput.disabled = true;
  }
});

// Utility: Reset the typing test (can be called by a "restart" button)
function resetTypingTest() {
  started = false;
  startTime = null;
  clearInterval(timerInterval);
  typingInput.value = "";
  typingInput.disabled = false;
  correctCount = 0;
  errorCount = 0;
  totalTyped = 0;
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "100%";
  resultBox.style.display = "none";
  renderParagraph("");
}

// Restart button event
if (restartBtn) {
  restartBtn.addEventListener("click", resetTypingTest);
}

// Initial Setup: Display paragraph & reset stats
window.addEventListener("DOMContentLoaded", () => {
  renderParagraph("");
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "100%";
  resultBox.style.display = "none";
});