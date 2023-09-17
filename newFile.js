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

  // l
  const closeModal = document.querySelector(".fa-solid");
  const modalContent = document.querySelector(".modal-content");
  const winner = document.querySelector(".voice-winner");

  closeModal.addEventListener("click", function () {
    modalContent.remove();
  });

  window.addEventListener("load", () => {
    winner.play();
  });

  // when difference between x cordinate of flag and player one be less than 10 , and press key "e" , player one can get the flag.
  if (distanceFlagXPlayerOne < 20 && distanceFlagXPlayerOne > -50) {
    if (e.key == "Enter") {
      flag.style.display = "none";
      flagPlayerOne.style.display = "block";
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
        }
        // when player two is winner.
        if (timeSecond <= 0 && flagPlayerTwo.style.display == "block") {
          alert("m");
        }
      }

      function endCount() {
        if ((timeH.innerHTML = "Time out")) {
          container.style.width = "150px";
          myVoiceTwo.play();
        }
      }
      getFlag.play();
    }
  } else if (distanceFlagXPlayerTwo < 50 && distanceFlagXPlayerTwo > -20) {
    if (e.key == "e") {
      flag.style.display = "none";
      flagPlayerTwo.style.display = "block";
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
      getFlag.play();
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
