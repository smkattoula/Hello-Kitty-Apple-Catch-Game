# Gemini Workspace

### Goal
Create a simple and cute web-based game where the player controls a character to catch falling objects, all within the charming theme of Hello Kitty.

### Core Technologies
*   **HTML:** For the basic structure of the game.
*   **CSS:** For styling the game to give it a "cute" Hello Kitty aesthetic.
*   **JavaScript:** For the game logic, including player movement, falling objects, and scorekeeping.

### Step-by-Step Guide

**Step 1: Project Setup**

First, create the necessary files for the project:
*   `index.html`: The main file that holds the structure of your game.
*   `style.css`: Where you'll add all the visual styles.
*   `script.js`: Where the game's logic will live.

**Step 2: Building the HTML (`index.html`)**

This file will contain the basic elements for our game, like the game area, the player, and the score display.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Kitty's Apple Catch</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello Kitty's Apple Catch</h1>
    <div id="game-container">
        <div id="player"></div>
    </div>
    <div id="score-board">Score: <span id="score">0</span></div>

    <script src="script.js"></script>
</body>
</html>
```

**Step 3: Styling with CSS (`style.css`)**

This is where we bring the "cute" factor. We'll use soft colors, rounded corners, and add placeholders for our characters. You can find Hello Kitty images online to use for the player and the falling items.

```css
body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fdeff2; /* Light pink background */
    color: #d15a89;
}

#game-container {
    width: 800px;
    height: 600px;
    border: 3px solid #ffb3c6;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
}

#player {
    width: 80px;
    height: 80px;
    /* Use a Hello Kitty image as the background */
    /* background-image: url('path/to/hello-kitty.png'); */
    background-color: #ffb3c6; /* Placeholder color */
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 10px;
    left: 360px; /* Start in the middle */
    border-radius: 50%;
}

.item {
    width: 40px;
    height: 40px;
    /* Use an apple or bow image as the background */
    /* background-image: url('path/to/apple.png'); */
    background-color: #ff6961; /* Placeholder color */
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    border-radius: 50%;
}

#score-board {
    margin-top: 20px;
    font-size: 24px;
}
```

**Step 4: Game Logic with JavaScript (`script.js`)**

This is the heart of the game. We'll make the player move, create falling items, detect when the player catches an item, and keep score.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');
    const scoreDisplay = document.getElementById('score');

    let score = 0;
    let playerPosition = player.offsetLeft;
    const gameWidth = gameContainer.offsetWidth;
    const playerWidth = player.offsetWidth;

    // Player Movement
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            playerPosition -= 20;
        } else if (e.key === 'ArrowRight') {
            playerPosition += 20;
        }

        // Prevent player from going off-screen
        if (playerPosition < 0) {
            playerPosition = 0;
        }
        if (playerPosition > gameWidth - playerWidth) {
            playerPosition = gameWidth - playerWidth;
        }
        player.style.left = playerPosition + 'px';
    });

    // Create and Animate Falling Items
    function createItem() {
        const item = document.createElement('div');
        item.classList.add('item');
        item.style.left = Math.random() * (gameWidth - 40) + 'px';
        item.style.top = '0px';
        gameContainer.appendChild(item);

        let itemFallInterval = setInterval(() => {
            const itemTop = parseInt(item.style.top);
            if (itemTop > gameContainer.offsetHeight) {
                item.remove();
                clearInterval(itemFallInterval);
            } else {
                // Collision Detection
                if (
                    item.offsetTop + item.offsetHeight >= player.offsetTop &&
                    item.offsetLeft + item.offsetWidth >= player.offsetLeft &&
                    item.offsetLeft <= player.offsetLeft + player.offsetWidth
                ) {
                    item.remove();
                    clearInterval(itemFallInterval);
                    score++;
                    scoreDisplay.textContent = score;
                } else {
                    item.style.top = itemTop + 5 + 'px';
                }
            }
        }, 30);
    }

    // Start the game by creating items periodically
    setInterval(createItem, 1500);
});
```
