let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
let flippedCards = [];
let matchedCards = [];
let startTime;
let timerInterval;

document.addEventListener('DOMContentLoaded', createBoard);

function createBoard() {
    numbers = shuffleArray(numbers);
    const cardContainer = document.getElementById('card-container');
    startTime = new Date();

    for (let number of numbers) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.number = number;
        card.textContent = '';
        card.addEventListener('click', flipCard);
        cardContainer.appendChild(card);
    }

    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this)) {
        this.textContent = this.dataset.number;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.number === card2.dataset.number) {
        matchedCards.push(card1, card2);
        if (matchedCards.length === numbers.length) {
            // Stop the timer when all cards are matched
            clearInterval(timerInterval);
            const endTime = new Date();
            const timeTaken = (endTime - startTime) / 1000; // in seconds
            alert(`Congratulations! You matched all the numbers. Time taken: ${timeTaken} seconds.`);
        }
    } else {
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function resetGame() {
    flippedCards = [];
    matchedCards = [];
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    clearInterval(timerInterval); // Clear the timer interval
    createBoard();
}

function changeColors() {
    const body = document.body;
    const cards = document.querySelectorAll('.card');
    const backcolor = getRandomColor();
    // Change background color
    body.style.background = backcolor;

    // Generate a single color for cards
    const cardColor = getRandomColor();

    // Change card colors
    cards.forEach(card => {
        card.style.backgroundColor = cardColor;
        card.style.color = backcolor; // You can also set the font color separately
    });
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000; // in seconds
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Time: ${elapsedTime.toFixed(0)}s`;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function pauseGame() {
    clearInterval(timerInterval);
}

function resumeGame() {
    timerInterval = setInterval(updateTimer, 1000);
}
