function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function dices(numTimes) {
  for (let i = 1; i <= numTimes; i++) {
    const firstDice = rollDie();
    const secondDice = rollDie();

    const lowDice = Math.min(firstDice, secondDice);
    const highDice = Math.max(firstDice, secondDice);

    const numberToText = ["one", "two", "three", "four", "five", "six"];

    const firstDiceText = numberToText[lowDice - 1];
    const secondDiceText = numberToText[highDice - 1];

    console.log(
      `1st dice: ${firstDice} 2nd dice: ${secondDice} output => '${firstDiceText}' - '${secondDiceText}'`
    );
  }
}
dices(10);

function intToRoman(num) {
  const romanNumerals = [
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 5, numeral: "V" },
    { value: 1, numeral: "I" },
  ];

  let romanNumeral = "";

  for (const numeral of romanNumerals) {
    while (num >= numeral.value) {
      romanNumeral += numeral.numeral;
      num -= numeral.value;
    }
  }

  return romanNumeral;
}

console.log(intToRoman(8));
console.log(intToRoman(148));
console.log(intToRoman(457));

// Rastgele bir sayı oluştur
const minNumber = 0;
const maxNumber = 100;
const secretNumber =
  Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

// Gerekli HTML öğelerini seç
const userGuessInput = document.getElementById("userGuess");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const first = document.getElementById("first");
const tahmin = document.getElementById("tahmin");
const input = document.querySelector(".input");

// window yüklendiginde input'a focuslan
window.addEventListener("load", () => {
  input.focus();
});

// Kullanıcının tahmin denemesini ve son tahminini sakla
let attempts = 0;
let lastGuess = null;

// Tahmin butonuna tıklanınca oyunu oyna
guessButton.addEventListener("click", playGame);

userGuessInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    playGame();
  }
});

function playGame() {
  const userGuess = parseInt(userGuessInput.value);

  if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
    message.textContent = `Lütfen geçerli bir sayı girin (${minNumber} ile ${maxNumber} arasında).`;
  } else {
    attempts++;
    attemptsDisplay.textContent = attempts;
    first.textContent = `Tahmin sayısı: ${attempts}  `;
    input.focus();

    // if (lastGuess !== null) {
    //   lastGuessDisplay.textContent = lastGuess;
    // }

    if (userGuess < secretNumber) {
      tahmin.textContent = "Daha büyük bir sayı deneyin.";
    } else if (userGuess > secretNumber) {
      tahmin.textContent = "Daha küçük bir sayı deneyin.";
    } else {
      tahmin.textContent = `Tebrikler! ${secretNumber} sayısını ${attempts} denemede buldunuz.`;
      guessButton.disabled = true;
    }

  
  }

  userGuessInput.value = "";
}


