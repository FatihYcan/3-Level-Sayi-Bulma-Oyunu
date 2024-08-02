const minNumber = 0;
const maxNumber = 1000;
const maxAttempts = 15; // 15 tahmin hakkı

let secretNumber;
let attempts;
let firstGuess;
let lastGuess;

const userGuessInput = document.getElementById("userGuess");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const first = document.getElementById("first");
const input = document.querySelector(".input");
const last = document.getElementById("last");
const lastGuessDisplay = document.getElementById("lastGuess");
const restartButton = document.getElementById("restartButton");
const animationContainer = document.getElementById("animation-container");
const winAnimation = document.getElementById("winAnimation");
const gerilim = new Audio("./mp3/gerilim.mp3"); // Eğer gerilim.mp3 varsa

window.addEventListener("load", () => {
  input.focus();
});

initializeGame();

guessButton.addEventListener("click", playGame);
userGuessInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    playGame();
  }
});

restartButton.addEventListener("click", function () {
  restartGame();
});

function initializeGame() {
  secretNumber = generateRandomNumber();
  attempts = 0;
  attemptsDisplay.textContent = attempts;
  lastGuessDisplay.textContent = "";
  message.textContent = "";
  guessButton.disabled = false;
  userGuessInput.disabled = false;
  restartButton.style.display = "none";
  attemptsDisplay.style.display = "none";
  firstGuess = null;
  lastGuess = null;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

function playGame() {
  const userGuess = parseInt(userGuessInput.value);

  if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
    alert(
      `Lütfen geçerli bir sayı girin (${minNumber} ile ${maxNumber} arasında).`
    );
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;
  first.style.display = "block";
  last.style.display = "block";
  first.textContent = `Kalan tahmin sayısı: ${maxAttempts - attempts}  `;
  lastGuess = userGuess;
  last.textContent = `Son tahmin: ${userGuess}  `;
  input.focus();

  if (attempts === 1) {
    firstGuess = userGuess;
  }

  if (userGuess < secretNumber && maxAttempts - attempts > 0) {
    message.textContent = "Daha büyük bir sayı deneyin.";
    playAudio("./mp3/yanlis.mp3", "orange");
  } else if (userGuess > secretNumber && maxAttempts - attempts > 0) {
    message.textContent = "Daha küçük bir sayı deneyin.";
    playAudio("./mp3/yanlis.mp3", "crimson");
  } else if (userGuess === secretNumber) {
    message.textContent = `Tebrikler 👏👏👏 ${secretNumber} sayısını ${attempts} denemede buldunuz ve oyunu kazandınız.`;
    const audio = new Audio("./mp3/sampiyon.mp3");
    audio.play();
    audio.addEventListener("ended", function () {
      audio.currentTime = 0; // Müziği başa sar
      audio.play(); // Müziği tekrar başlat
    });
    first.style.display = "none";
    last.style.display = "none";
    guessButton.disabled = true;
    userGuessInput.disabled = true;
    message.style.color = "green";
    restartButton.style.display = "block";
    gerilim.pause();
    animationContainer.style.display = "block";
    winAnimation.src = "./gif/kupa.gif";
  } else if (attempts >= maxAttempts) {
    if (firstGuess < secretNumber && lastGuess > secretNumber) {
      message.textContent = `😔😔😔 ${secretNumber} sayısı tahminlerde bulunduğunuz ${firstGuess} ile ${lastGuess} sayısı arasında olduğu için bu seviyeyi tekrar oynacaksınız.`;
      playAudio("./mp3/sabit.mp3", "orange");
      first.style.display = "none";
      last.style.display = "none";
      setTimeout(() => {
        window.location.href = "index2.html"; // 0 ile 1000 arasında sayı tahmin oyununa yönlendir
      }, 3000);
    } else {
      message.textContent = `Üzgünüm ki 😢😢😢 ${secretNumber} sayısını ${maxAttempts} hakkınızda bilemediniz. Seviye 2'ye düştünüz.`;
      playAudio("./mp3/seviye.mp3", "red");
      first.style.display = "none";
      last.style.display = "none";
      setTimeout(() => {
        window.location.href = "index1.html"; // 0 ile 100 arasında sayı tahmin oyununa yönlendir
      }, 4000);
    }
  }

  userGuessInput.value = "";
}

function playAudio(src, color) {
  const audio = new Audio(src);
  audio.play();
  message.style.color = color;
}

function endGame() {
  first.style.display = "none";
  last.style.display = "none";
  guessButton.disabled = true;
  userGuessInput.disabled = true;
  animationContainer.style.display = "block";
  winAnimation.src = "./gif/kupa.gif";
}

function restartGame() {
  initializeGame();
  userGuessInput.focus();
}
