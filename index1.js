const minNumber = 0;
const maxNumber = 100;
const maxAttempts = 7; // 7 tahmin hakkı

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
    message.textContent = `Tebrikler 👏👏👏 ${secretNumber} sayısını ${attempts} denemede buldunuz. 3. seviyeye yükseldiniz.`;
    playAudio("./mp3/dogru.mp3", "green");
    endGame();
    setTimeout(() => {
      window.location.href = "index2.html"; // 0 ile 1000 arasında sayı tahmin oyununa yönlendir
    }, 3000);
  } else if (attempts >= maxAttempts) {
    if (firstGuess < secretNumber && lastGuess > secretNumber) {
      message.textContent = `😔😔😔 ${secretNumber} sayısı tahminlerde bulunduğunuz ${firstGuess} ile ${lastGuess} sayısı arasında olduğu için bu seviyeyi tekrar oynacaksınız.`;
      playAudio("./mp3/sabit.mp3", "orange");
      setTimeout(() => {
        window.location.href = "index1.html"; // 0 ile 100 arasında sayı tahmin oyununa yönlendir
      }, 3000);
    } else {
      message.textContent = `Üzgünüm ki 😢😢😢 ${secretNumber} sayısını ${maxAttempts} hakkınızda bilemediniz. Seviye 1'e düştünüz.`;
      playAudio("./mp3/seviye.mp3", "red");
      setTimeout(() => {
        window.location.href = "index.html"; // 0 ile 10 arasında sayı tahmin oyununa yönlendir
      }, 4000);
    }
    endGame();
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
}

function restartGame() {
  initializeGame();
  userGuessInput.focus();
}
