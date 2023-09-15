let timeSecond = 30;
const timeH = document.querySelector('h1');
const container = document.querySelector('.container');
const startBtn = document.querySelector(".start-btn");
const guidBtn = document.querySelector(".guid-btn");
const startMenu = document.querySelector(".start-menu");
const guidMenu = document.querySelector(".guid-menu");
const containerStartMenu = document.querySelector(".container-start-menu");

displayTime(30);

const countDown = setInterval(()=>{
  timeSecond--;
  displayTime(timeSecond);
  if(timeSecond == 0 || timeSecond < 1){
    endCount();
    clearInterval(countDown);
  }
}, 1000);

function displayTime(second){
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `
  ${(min < 10) ? '0' : ''}${min}:${(sec < 10) ? '0' : ''}${sec}
  `; 

}

function endCount(){
  if (timeH.innerHTML = 'Time out') {
    container.style.width="150px"
  }
}


startBtn.addEventListener("click", function () {
  containerStartMenu.classList.add("hide-menu");
  startMenu.classList.add("hide-menu");
});
guidBtn.addEventListener("click", function () {
  startMenu.classList.add("hide-menu");
  guidMenu.classList.add("show-giud");
});

