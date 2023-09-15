const PLUS1 = document.querySelector("#plusplayerone");
const PLUS2 = document.querySelector("#plusplayertwo");
const scorePlayerOne = document.querySelector(".scoreplayerone");
const scorePlayerTwo = document.querySelector(".scoreplayertwo");

let scorePlayer1 = 0;
PLUS1.addEventListener("click", () => {
  scorePlayer1++;
  scorePlayerOne.innerHTML = scorePlayer1;
});
let scorePlayer2 = 0;
PLUS2.addEventListener("click", () => {
  scorePlayer2++;
  scorePlayerTwo.innerHTML = scorePlayer2;
});
