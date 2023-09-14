const startBtn = document.querySelector(".start-btn");
const guidBtn = document.querySelector(".guid-btn");
const startMenu = document.querySelector(".start-menu");
const guidMenu = document.querySelector(".guid-menu");

startBtn.addEventListener("click", function () {
  startMenu.classList.add("hide-menu");
});
guidBtn.addEventListener("click", function () {
  startMenu.classList.add("hide-menu");
  guidMenu.classList.add("show-giud");
});
