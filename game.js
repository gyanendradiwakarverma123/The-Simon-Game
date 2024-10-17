let gameSequence = [];
let playerSequence = [];
let gameStarted = false;
let level = 0;
let highScore = localStorage.getItem("simonHighScore") || 0; // Fetch high score from localStorage

// Update high score display on page load
document.getElementById("high-score").textContent = `Highest Score: ${highScore}`;

// Initialize color sounds
const colorSounds = {
  green: new Audio("sounds/green.mp3"),
  red: new Audio("sounds/red.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  blue: new Audio("sounds/blue.mp3"),
  wrong: new Audio("sounds/wrong.mp3")
};

// Start game on click
document.getElementById("game-title").addEventListener("click", function() {
  if (!gameStarted) {
    startGame();
  }
});

// Handle user clicks on color boxes
document.querySelectorAll(".color-box").forEach(box => {
  box.addEventListener("click", function() {
    if (gameStarted) {
      const chosenColor = this.id.split("-")[1]; // Extract color from id e.g., color-green -> green
      playerSequence.push(chosenColor);
      playColor(chosenColor);
      animatePress(this);

      checkPlayerMove(playerSequence.length - 1);
    }
  });
});

// Start a new game
function startGame() {
  gameStarted = true;
  level = 0;
  gameSequence = [];
  playerSequence = [];
  document.getElementById("game-title").textContent = "Level " + level;
  nextLevel();
}

// Generate the next step in the sequence
function nextLevel() {
  playerSequence = [];
  level++;
  document.getElementById("game-title").textContent = "Level " + level;

  // Randomly pick a color and add it to the game sequence
  const colors = ["green", "red", "yellow", "blue"];
  const randomColor = colors[Math.floor(Math.random() * 4)];
  gameSequence.push(randomColor);

  // Play the current game sequence
  gameSequence.forEach((color, index) => {
    setTimeout(() => {
      playColor(color);
      animatePress(document.getElementById(`color-${color}`));
    }, 500 * (index + 1));
  });
}

// Check player's move against game sequence
function checkPlayerMove(currentStep) {
  if (gameSequence[currentStep] === playerSequence[currentStep]) {
    if (playerSequence.length === gameSequence.length) {
      setTimeout(nextLevel, 1000);
    }
  } else {
    updateHighScore();
    gameOver();
  }
}

// Play sound for a given color
function playColor(color) {
  colorSounds[color].play();
}

// Animate color box on press
function animatePress(box) {
  box.classList.add("active");
  setTimeout(() => {
    box.classList.remove("active");
  }, 200);
}

// End the game and reset
function gameOver() {
  document.body.classList.add("game-over");
  document.getElementById("game-title").textContent = "Game Over, Tap to Restart";
  colorSounds.wrong.play();

  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 300);

  gameStarted = false;
}

// Update and display the highest score
function updateHighScore() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("simonHighScore", highScore); // Save new high score to localStorage
    document.getElementById("high-score").textContent = `Highest Score: ${highScore}`;
  }
}
