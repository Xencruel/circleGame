const gameArea = document.getElementById("game");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const scoreBoard = document.getElementById("scoreBoard");
const finalScore = document.getElementById("finalScore");
const spawnSound = new Audio("spawn.flac");
const clickSound = new Audio("baloon.flac");
const accuracyDisplay = document.getElementById("accuracy");
const accuracyText = document.getElementById("accuracy-text");
const accuracyFill = document.getElementById("accuracy-fill");

let score = 0;
let timeLeft = 30;
let gameInterval;
let spawnInterval;
let totalClicks = 0;
let succesfulClicks = 0;

function updataAccuracy() 
{
    if (totalClicks ===0) {
        accuracyDisplay.textContent = "Accuracy: %100";
        accuracyFill.style.width = "%100";
        return;
    }
    let ratio = (succesfulClicks / totalClicks) * 100;
    accuracyDisplay.textContent = "Accuracy: %" +ratio.toFixed(1);
    accuracyFill.style.width = ratio + "%";
    if (ratio >= 90) {
        accuracyDisplay.style.color = "blueviolet";
        accuracyFill.style.backgroundColor="blueviolet";
    }
    else if (ratio >= 80) {
        accuracyDisplay.style.color = "limegreen";
        accuracyFill.style.backgroundColor="limegreen";
    }
    else if (ratio >= 70) {
        accuracyDisplay.style.color = "green";
        accuracyFill.style.backgroundColor="green";
    }
    else if (ratio >= 60) {
        accuracyDisplay.style.color = "yellowgreen";
        accuracyFill.style.backgroundColor="yellowgreen";
    } 
    else if (ratio >= 50) {
        accuracyDisplay.style.color = "orange";
        accuracyFill.style.backgroundColor="orange";
    } 
    else if (ratio >= 30) {
        accuracyDisplay.style.colar ="deeporange";
        accuracyFill.style.backgroundColor="deeporange";
    }
    else {
        accuracyDisplay.style.color = "red";
        accuracyFill.style.backgroundColor="red";
    }
}

function startGame() {
  score = 0;
  timeLeft = 30;
  totalClicks = 0;
  succesfulClicks =0;
  timerDisplay.textContent = "Time: " + timeLeft;
  startButton.style.display = "none";
  restartButton.style.display = "none";
  scoreBoard.style.display = "none";
  gameArea.innerHTML = "";
  updataAccuracy();

  gameInterval = setInterval(updateTimer, 1000);
  spawnInterval = setInterval(spawnCircle, 800);
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = "Time: " + timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

function spawnCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 40);

  circle.style.left = x + "px";
  circle.style.top = y + "px";

  spawnSound.currentTime = 0;
  spawnSound.play();

  circle.addEventListener("click", (e) => {
    e.stopPropagation();
    totalClicks++;
    succesfulClicks++;
    updataAccuracy();
    score++;
    clickSound.currentTime = 0;
    clickSound.play();
    
    circle.style.animation = "fadeOut 0.3s forwards";
    setTimeout(() => {
      circle.remove();
    }, 300);
  });

  gameArea.appendChild(circle);

  
  setTimeout(() => {
    if (circle.parentElement) {
      circle.remove();
    }
  }, 2000);
}

gameArea.addEventListener("click",() => {
    totalClicks++;
    updataAccuracy();
});

function endGame() {
  clearInterval(gameInterval);
  clearInterval(spawnInterval);
  timerDisplay.textContent = "Time 0ver!";
  finalScore.textContent = score;
  scoreBoard.style.display = "block";
  restartButton.style.display = "inline-block";
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
