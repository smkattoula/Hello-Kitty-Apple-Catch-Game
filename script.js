document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');
    const scoreDisplay = document.getElementById('score');

    let score = 0;
    let playerPosition = player.offsetLeft;
    let gameWidth = gameContainer.offsetWidth;
    let playerWidth = player.offsetWidth;
    const padding = 10; // Adds a small buffer to the left boundary

    function updateDimensions() {
        gameWidth = gameContainer.offsetWidth;
        playerWidth = player.offsetWidth;
    }

    window.addEventListener('resize', updateDimensions);

    // Player Movement
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            playerPosition -= 20;
        } else if (e.key === 'ArrowRight') {
            playerPosition += 20;
        }

        // Prevent player from going off-screen
        if (playerPosition < padding) {
            playerPosition = padding;
        }
        if (playerPosition > gameWidth - playerWidth) {
            playerPosition = gameWidth - playerWidth;
        }
        player.style.left = playerPosition + 'px';
    });

    // Create and Animate Falling Items
    function createItem() {
        const item = document.createElement('div');
        let itemType = Math.random() < 0.7 ? 'apple' : 'cupcake'; // 70% apple, 30% cupcake
        let fallSpeed = 5; // Default apple speed
        let points = 1; // Default apple points

        if (itemType === 'apple') {
            item.classList.add('apple-item');
        } else {
            item.classList.add('cupcake-item');
            fallSpeed = 10; // Cupcakes fall faster
            points = 5; // Cupcakes give bonus points
        }

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
                    score += points; // Use the 'points' variable
                    scoreDisplay.textContent = score;
                } else {
                    item.style.top = itemTop + fallSpeed + 'px'; // Use 'fallSpeed'
                }
            }
        }, 30);
    }

    // Start the game by creating items periodically
    setInterval(createItem, 1500);
});