const minNumber = 0;
const maxNumber = 10;
const maxAttempts = 4; // 4 tahmin hakkı

let secretNumber;
let attempts;

const userGuessInput = document.getElementById("userGuess");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const first = document.getElementById("first");
const input = document.querySelector(".input");
const last = document.getElementById("last");
const yanlis = document.getElementById("yanlis");
const dogru = document.getElementById("dogru");

// const remainingAttemptsDisplay = document.getElementById("remainingAttempts");

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
  attempts = maxAttempts;
  attemptsDisplay.textContent = attempts;
  lastGuessDisplay.textContent = "";
  message.textContent = "";
  guessButton.disabled = false;
  userGuessInput.disabled = false;
  restartButton.style.display = "none";
  attemptsDisplay.style.display = "none";
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
    attempts--;
    attemptsDisplay.textContent = attempts;
    first.textContent = `Kalan tahmin sayısı: ${attempts}  `;
    last.textContent = `Son tahmin: ${userGuess}  `;
    input.focus();

    if (userGuess < secretNumber && attempts > 0) {
      message.textContent = "Daha büyük bir sayı deneyin.";
      const audio = new Audio("yanlis.mp3");
      audio.play();
      message.style.color = "orange";
    } else if (userGuess > secretNumber && attempts > 0) {
      message.textContent = "Daha küçük bir sayı deneyin.";
      const audio = new Audio("yanlis.mp3");
      audio.play();
      message.style.color = "crimson";
    } else {
      if (userGuess === secretNumber && attempts >= 0) {
        message.textContent = `Tebrikler 👏👏👏 ${secretNumber} sayısını ${
          maxAttempts - attempts
        } denemede buldunuz. 2. seviyeye yükseldiniz.`;
        const audio = new Audio("dogru.mp3");
        audio.play();
        first.style.display = "none";
        last.style.display = "none";
        message.style.color = "green";
        setTimeout(() => {
          window.location.href = "index1.html"; // 0 ile 100 arasında sayı tahmin oyununa yönlendir
        }, 3000);
      }
    }

    if (userGuess !== secretNumber && attempts <= 0) {
      message.textContent = `Üzgünüm ki 😢😢😢 ${secretNumber} sayısını ${maxAttempts} hakkınızda bilemediniz.  Oyunu yeniden başlatmak için 'Oyunu Yeniden Başlat' butonuna tıklayabilirsiniz.`;
      const audio = new Audio("seviye.mp3");
      audio.play();
      guessButton.disabled = true;
      userGuessInput.disabled = true;
      restartButton.style.display = "block";
      first.style.display = "none";
      last.style.display = "none";
      message.style.color = "red";
    }

    attemptsDisplay.textContent = attempts;
  }

  userGuessInput.value = "";
}

function restartGame() {
  initializeGame();
  userGuessInput.focus();
}
