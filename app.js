let timeSecond = 30;
const timeH = document.querySelector('h1');
const container = document.querySelector('.container');
const startBtn = document.querySelector(".start-btn");
const guidBtn = document.querySelector(".guid-btn");
const startMenu = document.querySelector(".start-menu");
const guidMenu = document.querySelector(".guid-menu");
const containerStartMenu = document.querySelector(".container-start-menu");
const myAudio = document.getElementById("myAudio");
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const myBtn = document.getElementById('myBtn');
const myVoice = document.getElementById("myVoice");
const myVoiceTwo = document.getElementById("myVoiceTwo");
const round = document.querySelector(".round");
const footVoice = document.getElementById("footVoice");




const minDistance = 20; // Minimum distance between players (adjusted to 20 pixels)

// Create objects to track which keys are currently pressed for each player
const keysPressedPlayer1 = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
};
const keysPressedPlayer2 = {
    a: false,
    d: false,
    w: false,
    s: false,
};
// marjan
myBtn.addEventListener("click" , function () {
  
  displayTime(30);
  // timer
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
    if (timeSecond <= 5) {
      myVoice.play();
      timeH.style.color="red";
    }
  
  }
  
  function endCount(){
    if (timeH.innerHTML = 'Time out') {
      container.style.width="150px";
      myVoiceTwo.play();
    }
    
  }
  // end timer
});

// menu start mahsa
startBtn.addEventListener("click", function () {
  containerStartMenu.classList.add("hide-menu");
  startMenu.classList.add("hide-menu");
});
guidBtn.addEventListener("click", function () {
  startMenu.classList.add("hide-menu");
  guidMenu.classList.add("show-giud");
});

function playAudio(){
  myAudio.play();
}


// mostafa

// Function to move the character based on key presses
function detectKeys() {
  const step = 5; // Adjust the step size as needed

  // Player 1 movement
  if (keysPressedPlayer1.ArrowLeft) {
      // left arrow
      const newLeft = Math.max(player1.offsetLeft - step, 0);
      if (!isColliding(player1.offsetTop, newLeft, player1, player2)) {
          player1.style.left = newLeft + 'px';
      }
      footVoice.play();
  }
  if (keysPressedPlayer1.ArrowRight) {
      // right arrow
      const newLeft = Math.min(player1.offsetLeft + step, window.innerWidth - player1.offsetWidth);
      if (!isColliding(player1.offsetTop, newLeft, player1, player2)) {
          player1.style.left = newLeft + 'px';
      }
      footVoice.play();
  }
  if (keysPressedPlayer1.ArrowUp) {
      // up arrow
      const newTop = Math.max(player1.offsetTop - step, 0);
      if (!isColliding(newTop, player1.offsetLeft, player1, player2)) {
          player1.style.top = newTop + 'px';
      }
      footVoice.play();
  }
  if (keysPressedPlayer1.ArrowDown) {
      // down arrow
      const newTop = Math.min(player1.offsetTop + step, window.innerHeight - player1.offsetHeight);
      if (!isColliding(newTop, player1.offsetLeft, player1, player2)) {
          player1.style.top = newTop + 'px';
      }
      footVoice.play();
  }

  // Player 2 movement
  if (keysPressedPlayer2.a) {
      // 'a' key
      const newLeft = Math.max(player2.offsetLeft - step, 0);
      if (!isColliding(player2.offsetTop, newLeft, player2, player1)) {
          player2.style.left = newLeft + 'px';
      }
      footVoice.play();
  }
  if (keysPressedPlayer2.d) {
      // 'd' key
      const newLeft = Math.min(player2.offsetLeft + step, window.innerWidth - player2.offsetWidth);
      if (!isColliding(player2.offsetTop, newLeft, player2, player1)) {
          player2.style.left = newLeft + 'px';
      }
      footVoice.play();
  }
  if (keysPressedPlayer2.w) {
      // 'w' key
      const newTop = Math.max(player2.offsetTop - step, 0);
      if (!isColliding(newTop, player2.offsetLeft, player2, player1)) {
          player2.style.top = newTop + 'px';
      }
      footVoice.play();
  }
  if (keysPressedPlayer2.s) {
      // 's' key
      const newTop = Math.min(player2.offsetTop + step, window.innerHeight - player2.offsetHeight);
      if (!isColliding(newTop, player2.offsetLeft, player2, player1)) {
          player2.style.top = newTop + 'px';
      }
      footVoice.play();
  }
}

// Function to handle keydown and keyup events for Player 1
function handleKeyDownPlayer1(e) {
  if (e.key in keysPressedPlayer1) {
      keysPressedPlayer1[e.key] = true;
  }
}

function handleKeyUpPlayer1(e) {
  if (e.key in keysPressedPlayer1) {
      keysPressedPlayer1[e.key] = false;
  }
}

// Function to handle keydown and keyup events for Player 2
function handleKeyDownPlayer2(e) {
  if (e.key in keysPressedPlayer2) {
      keysPressedPlayer2[e.key] = true;
  }
}

function handleKeyUpPlayer2(e) {
  if (e.key in keysPressedPlayer2) {
      keysPressedPlayer2[e.key] = false;
  }
}

function isColliding(top, left, player, otherPlayer) {
  const playerRect = player.getBoundingClientRect();
  const otherPlayerRect = otherPlayer.getBoundingClientRect();
  return (
      top < otherPlayerRect.bottom &&
      top + playerRect.height > otherPlayerRect.top &&
      left < otherPlayerRect.right &&
      left + playerRect.width > otherPlayerRect.left &&
      // Ensure a minimum distance between players
      top + playerRect.height + minDistance > otherPlayerRect.top &&
      top - minDistance < otherPlayerRect.bottom &&
      left + playerRect.width + minDistance > otherPlayerRect.left &&
      left - minDistance < otherPlayerRect.right
  );
}

// Add event listeners for Player 1
document.addEventListener("keydown", handleKeyDownPlayer1);
document.addEventListener("keyup", handleKeyUpPlayer1);

// Add event listeners for Player 2
document.addEventListener("keydown", handleKeyDownPlayer2);
document.addEventListener("keyup", handleKeyUpPlayer2);

setInterval(detectKeys, 10); // Call detectKeys function periodically

myBtn.addEventListener("click" , function () {
  if (player1.style.display==="none"){
    player1.style.display="none"
  }else{
    player1.style.display="block";
  }
})
myBtn.addEventListener("click" , function () {
  if (player2.style.display==="none"){
    player2.style.display="none"
  }else{
    player2.style.display="block";
  }
})

