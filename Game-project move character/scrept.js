
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

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
    }
    if (keysPressedPlayer1.ArrowRight) {
        // right arrow
        const newLeft = Math.min(player1.offsetLeft + step, window.innerWidth - player1.offsetWidth);
        if (!isColliding(player1.offsetTop, newLeft, player1, player2)) {
            player1.style.left = newLeft + 'px';
        }
    }
    if (keysPressedPlayer1.ArrowUp) {
        // up arrow
        const newTop = Math.max(player1.offsetTop - step, 0);
        if (!isColliding(newTop, player1.offsetLeft, player1, player2)) {
            player1.style.top = newTop + 'px';
        }
    }
    if (keysPressedPlayer1.ArrowDown) {
        // down arrow
        const newTop = Math.min(player1.offsetTop + step, window.innerHeight - player1.offsetHeight);
        if (!isColliding(newTop, player1.offsetLeft, player1, player2)) {
            player1.style.top = newTop + 'px';
        }
    }

    // Player 2 movement
    if (keysPressedPlayer2.a) {
        // 'a' key
        const newLeft = Math.max(player2.offsetLeft - step, 0);
        if (!isColliding(player2.offsetTop, newLeft, player2, player1)) {
            player2.style.left = newLeft + 'px';
        }
    }
    if (keysPressedPlayer2.d) {
        // 'd' key
        const newLeft = Math.min(player2.offsetLeft + step, window.innerWidth - player2.offsetWidth);
        if (!isColliding(player2.offsetTop, newLeft, player2, player1)) {
            player2.style.left = newLeft + 'px';
        }
    }
    if (keysPressedPlayer2.w) {
        // 'w' key
        const newTop = Math.max(player2.offsetTop - step, 0);
        if (!isColliding(newTop, player2.offsetLeft, player2, player1)) {
            player2.style.top = newTop + 'px';
        }
    }
    if (keysPressedPlayer2.s) {
        // 's' key
        const newTop = Math.min(player2.offsetTop + step, window.innerHeight - player2.offsetHeight);
        if (!isColliding(newTop, player2.offsetLeft, player2, player1)) {
            player2.style.top = newTop + 'px';
        }
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


