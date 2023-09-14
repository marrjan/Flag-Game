const startBtn = document.querySelector(".start-btn");
const guidBtn = document.querySelector(".guid-btn");
const startMenu = document.querySelector(".start-menu");
const guidMenu = document.querySelector(".guid-menu");
const containerStartMenu = document.querySelector(".container-start-menu");

startBtn.addEventListener("click", function () {
  containerStartMenu.classList.add("hide-menu");
  startMenu.classList.add("hide-menu");
});
guidBtn.addEventListener("click", function () {
  startMenu.classList.add("hide-menu");
  guidMenu.classList.add("show-giud");
});
