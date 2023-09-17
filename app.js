let timeSecond = 30;
const timeH = document.querySelector("h1");
const container = document.querySelector(".container");
const startBtn = document.querySelector(".start-btn");
const guidBtn = document.querySelector(".guid-btn");
const startMenu = document.querySelector(".start-menu");
const guidMenu = document.querySelector(".guid-menu");
const containerStartMenu = document.querySelector(".container-start-menu");
const myAudio = document.getElementById("myAudio");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const myBtn = document.getElementById("myBtn");
const myVoice = document.getElementById("myVoice");
const myVoiceTwo = document.getElementById("myVoiceTwo");
const round = document.querySelector(".round");
const footVoice = document.getElementById("footVoice");
const wallOne=document.querySelectorAll(".wall-one");
const allthewall =document.querySelectorAll('.wall')
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
myBtn.addEventListener("click", function () {
  displayTime(30);
  // timer
  const countDown = setInterval(() => {
    timeSecond--;
    displayTime(timeSecond);
    if (timeSecond == 0 || timeSecond < 1) {
      endCount();
      clearInterval(countDown);
    }
  }, 1000);

  function displayTime(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timeH.innerHTML = `
    ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
    `;
    if (timeSecond <= 5) {
      myVoice.play();
      timeH.style.color = "red";
    }
  }

  function endCount() {
    if ((timeH.innerHTML = "Time out")) {
      container.style.width = "150px";
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

function playAudio() {
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
    if (!isColliding(player1.offsetTop, newLeft, player1, player2,allthewall)) {
      player1.style.left = newLeft + "px";
    }
    footVoice.play();
  }
  if (keysPressedPlayer1.ArrowRight) {
    // right arrow
    const newLeft = Math.min(
      player1.offsetLeft + step,
      window.innerWidth - player1.offsetWidth
    );
    if (!isColliding(player1.offsetTop, newLeft, player1, player2,allthewall)) {
      player1.style.left = newLeft + "px";
    }
    footVoice.play();
  }
  if (keysPressedPlayer1.ArrowUp) {
    // up arrow
    const newTop = Math.max(player1.offsetTop - step, 0);
    if (!isColliding(newTop, player1.offsetLeft, player1, player2,allthewall)) {
      player1.style.top = newTop + "px";
    }
    footVoice.play();
  }
  if (keysPressedPlayer1.ArrowDown) {
    // down arrow
    const newTop = Math.min(
      player1.offsetTop + step,
      window.innerHeight - player1.offsetHeight
    );
    if (!isColliding(newTop, player1.offsetLeft, player1, player2,allthewall)) {
      player1.style.top = newTop + "px";
    }
    footVoice.play();
  }

  // Player 2 movement
  if (keysPressedPlayer2.a) {
    // 'a' key
    const newLeft = Math.max(player2.offsetLeft - step, 0);
    if (!isColliding(player2.offsetTop, newLeft, player2, player1,allthewall)) {
      player2.style.left = newLeft + "px";
    }
    footVoice.play();
  }
  if (keysPressedPlayer2.d) {
    // 'd' key
    const newLeft = Math.min(
      player2.offsetLeft + step,
      window.innerWidth - player2.offsetWidth
    );
    if (!isColliding(player2.offsetTop, newLeft, player2, player1,allthewall)) {
      player2.style.left = newLeft + "px";
    }
    footVoice.play();
  }
  if (keysPressedPlayer2.w) {
    // 'w' key
    const newTop = Math.max(player2.offsetTop - step, 0);
    if (!isColliding(newTop, player2.offsetLeft, player2, player1,allthewall)) {
      player2.style.top = newTop + "px";
    }
    footVoice.play();
  }
  if (keysPressedPlayer2.s) {
    // 's' key
    const newTop = Math.min(
      player2.offsetTop + step,
      window.innerHeight - player2.offsetHeight
    );
    if (!isColliding(newTop, player2.offsetLeft, player2, player1,allthewall)) {
      player2.style.top = newTop + "px";
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

function isColliding(top, left, player, otherPlayer, walls = []) {
  const playerRect = player.getBoundingClientRect();
  const otherPlayerRect = otherPlayer.getBoundingClientRect();

  // Check for collisions with the other player
  const playerCollision =
    top < otherPlayerRect.bottom &&
    top + playerRect.height > otherPlayerRect.top &&
    left < otherPlayerRect.right &&
    left + playerRect.width > otherPlayerRect.left &&
    // Ensure a minimum distance between players
    top + playerRect.height + minDistance > otherPlayerRect.top &&
    top - minDistance < otherPlayerRect.bottom &&
    left + playerRect.width + minDistance > otherPlayerRect.left &&
    left - minDistance < otherPlayerRect.right;

  // Check for collisions with walls
  let wallCollision = false;
  if (walls.length > 0) {
    for (const wall of walls) {
     
      const wallRect = wall.getBoundingClientRect();
      if (
        left + playerRect.width > wallRect.left &&
        left < wallRect.left + wallRect.width &&
        top + playerRect.height > wallRect.top &&
        top < wallRect.top + wallRect.height
      ) {
        wallCollision = true;
        break; // Exit the loop if a wall collision is found
      }
    }
  }

  // Return true if there is a collision with either the other player or a wall
  return playerCollision || wallCollision;
}






function isColliding(top, left, player, otherPlayer) {
  const playerRect = player.getBoundingClientRect();
  const otherPlayerRect = otherPlayer.getBoundingClientRect();
  const walls = document.querySelectorAll('.wall'); // Get all wall elements
  const playerTop = player.offsetTop;
  const playerLeft = player.offsetLeft;
  // Check for collisions with the other player
  const playerCollision =
    top < otherPlayerRect.bottom &&
    top + playerRect.height > otherPlayerRect.top &&
    left < otherPlayerRect.right &&
    left + playerRect.width > otherPlayerRect.left &&
    // Ensure a minimum distance between players
    top + playerRect.height + minDistance > otherPlayerRect.top &&
    top - minDistance < otherPlayerRect.bottom &&
    left + playerRect.width + minDistance > otherPlayerRect.left &&
    left - minDistance < otherPlayerRect.right;

  // Check for collisions with walls
  let wallCollision = false;
  walls.forEach((wall) => {
    const wallRect = wall.getBoundingClientRect();
    if (
      left + playerRect.width > wallRect.left &&
      left < wallRect.left + wallRect.width &&
      top + playerRect.height > wallRect.top &&
      top < wallRect.top + wallRect.height
    ) {
      wallCollision = true;
      return; // Exit the loop if a wall collision is found
    }
  });

  // Return true if there is a collision with either the other player or a wall
  return playerCollision || wallCollision;
}





// Add event listeners for Player 1
document.addEventListener("keydown", handleKeyDownPlayer1);
document.addEventListener("keyup", handleKeyUpPlayer1);

// Add event listeners for Player 2
document.addEventListener("keydown", handleKeyDownPlayer2);
document.addEventListener("keyup", handleKeyUpPlayer2);

setInterval(detectKeys, 10); // Call detectKeys function periodically

// charachter's can get and keep the flag[start]
// select flag
const flag = document.querySelector(".flag");
// select flag on hand of players.
const flagPlayerOne = document.querySelector(".flagPlayerOne");
const flagPlayerTwo = document.querySelector(".flagPlayerTwo");

document.addEventListener("keydown", function (e) {
  // get cordinate of player one and player two.
  const cordinatePlayerOne = player1.getBoundingClientRect();
  const cordinatePlayerTwo = player2.getBoundingClientRect();
  // get cordinate of flag.
  const flagCordinate = flag.getBoundingClientRect();
  // get cordinate of left flag.
  const flagLeftX = flagCordinate.left;
  // get cordinate of right flag.
  const flagRightX = flagCordinate.right;
  // get cordinate right of player one.
  const cordinatePlayerOneX = cordinatePlayerOne.right;
  // get cordinate left of player two.
  const cordinatePlayerTwoX = cordinatePlayerTwo.left;
  // The difference between the x coordinates of the flag and the x coordinates of the first player.
  const distanceFlagXPlayerOne = flagLeftX - cordinatePlayerOneX;
  // The difference between the x coordinates of the flag and the x coordinates of the first player.
  const distanceFlagXPlayerTwo = flagRightX - cordinatePlayerTwoX;
  // The difference between the x coordinates of the player two and the x coordinates of player one.
  const distanceOfPlayersX = cordinatePlayerTwoX - cordinatePlayerOneX;

  // modal for show final winner [start]
  const closeModal = document.querySelector(".fa-solid");
  const modalContent = document.querySelector(".modal-content");
  const winner = document.querySelector(".voice-winner");
  const modalContainer = document.querySelector(".modal-container");
  const winnerName = document.querySelector(".winner-name");

  closeModal.addEventListener("click", function () {
    modalContent.remove();
    modalContainer.style.display = "none";
  });

  window.addEventListener("load", () => {
    winner.play();
  });
  // modal for show final winner [end]

  // when difference between x cordinate of flag and player one be less than 10 , and press key "e" , player one can get the flag.
  if (distanceFlagXPlayerOne < 20 && distanceFlagXPlayerOne > -50) {
    if (e.key == "Enter") {
      flag.style.display = "none";
      flagPlayerOne.style.display = "block";
<<<<<<< HEAD
      displayTime(30);
      // timer
      const countDown = setInterval(() => {
        timeSecond--;
        displayTime(timeSecond);
        if (timeSecond == 0 || timeSecond < 1) {
          endCount();
          clearInterval(countDown);
        }
      }, 1000);

      function displayTime(second) {
        const min = Math.floor(second / 60);
        const sec = Math.floor(second % 60);
        timeH.innerHTML = `
    ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
    `;
        if (timeSecond <= 5) {
          myVoice.play();
          timeH.style.color = "red";
        }
        // when player one is winner.
        if (timeSecond <= 0 && flagPlayerOne.style.display == "block") {
          modalContainer.classList.add("show-modal-winner");
          winnerName.innerText = "Winner Player 1";
        }
        // when player two is winner.
        if (timeSecond <= 0 && flagPlayerTwo.style.display == "block") {
          modalContainer.classList.add("show-modal-winner");
          winnerName.innerText = "Winner Player 2";
        }
      }

      function endCount() {
        if ((timeH.innerHTML = "Time out")) {
          container.style.width = "150px";
          myVoiceTwo.play();
        }
      }
      getFlag.play();
=======
>>>>>>> b4e76c2f253b68d6219f3b3577b75f5c55698134
    }
  } else if (distanceFlagXPlayerTwo < 50 && distanceFlagXPlayerTwo > -20) {
    if (e.key == "e") {
      flag.style.display = "none";
      flagPlayerTwo.style.display = "block";
    }
  } else if (distanceOfPlayersX < 20 && distanceOfPlayersX > -70) {
    if (e.key == "Enter") {
      flagPlayerOne.style.display = "block";
      flagPlayerTwo.style.display = "none";
    }
  } else if (distanceOfPlayersX < 10 && distanceOfPlayersX > -100) {
    if (e.key == "e") {
      flagPlayerOne.style.display = "none";
      flagPlayerTwo.style.display = "block";
    }
  }
});
// charachter's can get and keep the flag.[end]

myBtn.addEventListener("click", function () {
  if (player1.style.display === "none") {
    player1.style.display = "none";
  } else {
    player1.style.display = "block";
  }
});
myBtn.addEventListener("click", function () {
  if (player2.style.display === "none") {
    player2.style.display = "none";
  } else {
    player2.style.display = "block";
  }
});






const element = document.querySelector('.wall-two'); // Replace 'myElement' with the ID of your element
const rect = element.getBoundingClientRect();

console.log('Top:', rect.top);
console.log('Right:', rect.right);
console.log('Bottom:', rect.bottom);
console.log('Left:', rect.left);
console.log('Width:', rect.width);
console.log('Height:', rect.height);