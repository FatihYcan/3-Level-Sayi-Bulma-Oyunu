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
const yanlis = document.getElementById("yanlis");
const dogru = document.getElementById("dogru");
const seviye = document.getElementById("seviye");
const sabit = document.getElementById("sabit");
const lastGuessDisplay = document.getElementById("lastGuess");
const restartButton = document.getElementById("restartButton");
const animationContainer = document.getElementById("animation-container");
const winAnimation = document.getElementById("winAnimation");
// const remainingAttemptsDisplay = document.getElementById("remainingAttempts");

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
  window.addEventListener("load", () => {
    input.focus();
  });

  const userGuess = parseInt(userGuessInput.value);

  if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
    alert(
      `Lütfen geçerli bir sayı girin (${minNumber} ile ${maxNumber} arasında).`
    );
  } else {
    first.style.display = "block";
    last.style.display = "block";
    attemptsDisplay.textContent = attempts;
    attempts++;
    first.textContent = `Kalan tahmin sayısı: ${maxAttempts - attempts}  `;

    lastGuess = userGuess;
    last.textContent = `Son tahmin: ${userGuess}  `;
    input.focus();

    if (attempts === 1) {
      firstGuess = userGuess;
    }

    if (userGuess < secretNumber && maxAttempts - attempts > 0) {
      message.textContent = "Daha büyük bir sayı deneyin.";
      const audio = new Audio("yanlis.mp3");
      audio.play();
      message.style.color = "orange";
    } else if (userGuess > secretNumber && maxAttempts - attempts > 0) {
      message.textContent = "Daha küçük bir sayı deneyin.";
      const audio = new Audio("yanlis.mp3");
      audio.play();
      message.style.color = "crimson";
    } else {
      if (userGuess === secretNumber && maxAttempts - (attempts - 1) >= 0) {
        message.textContent = `Tebrikler 👏👏👏 ${secretNumber} sayısını ${attempts} denemede buldunuz ve oyunu kazandınız.`;
        const audio = new Audio("sampiyon.mp3");
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
        winAnimation.src = "kupa.gif";
      }
    }

    if (userGuess !== secretNumber && maxAttempts - attempts <= 0) {
      message.textContent = `Üzgünüm ki 😢😢😢 ${secretNumber} sayısını ${maxAttempts} hakkınızda bilemediniz. Seviye 2'e düştünüz`;
      const audio = new Audio("seviye.mp3");
      audio.play();
      gerilim.pause();
      first.style.display = "none";
      last.style.display = "none";
      guessButton.disabled = true;
      userGuessInput.disabled = true;
      message.style.color = "red";
      setTimeout(() => {
        window.location.href = "index1.html"; // 0 ile 10 arasında sayı tahmin oyununa yönlendir
      }, 4000);
    }

    if (
      firstGuess < secretNumber &&
      lastGuess > secretNumber &&
      maxAttempts - attempts <= 0
    ) {
      message.textContent = `😔😔😔 ${secretNumber} sayısı tahminlerde bulunduğunuz ${firstGuess} ile ${lastGuess} sayısı arasında olduğu için bu seviyeyi tekrar oynacaksınız. `;
      const audio = new Audio("seviye.mp3");
      audio.play();
      first.style.display = "none";
      last.style.display = "none";
      guessButton.disabled = true;
      userGuessInput.disabled = true;
      message.style.color = "orange";
      setTimeout(() => {
        window.location.href = "index2.html"; //
      }, 3000);
    }

    attemptsDisplay.textContent = attempts;
  }

  userGuessInput.value = "";
}
