const allEmojis = ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐯","🐨","🦏"
    ,"🦁","🐮","🐷","🐸","🐵","🐧","🐦","🐥","🦆","🦅","🦉","🦇","🐺"
    ,"🐗","🐴","🐝","🦋","🐛","🐌","🐞","🐢","🐙","🦀","🦐","🐡","🐟","🦍"]; 

function getRandomEmojis(count, allEmojis) {
    const shuffled = shuffleArray(allEmojis);
    return shuffled.slice(0, count);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const INITIAL_TIME = 60;
let timeLeft = INITIAL_TIME;
let timerInterval;
let timerStarted = false; 
const timerDisplay = document.querySelector('.timer');
const gameContainer = document.querySelector('.game');
const modal = document.querySelector('.modal');
const modalMessage = document.getElementById('modal-message');
const tryAgainButton = document.getElementById('try-again');

function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.add('modal-visible');
}

function hideModal() {
    modal.classList.remove('modal-visible');
}

tryAgainButton.addEventListener('click', function () {
    hideModal();
    resetGame();
});

function resetGame() {
    timeLeft = INITIAL_TIME;
    timerDisplay.textContent = `Time: ${timeLeft} sec`;
    gameContainer.innerHTML = ''; 
    clearInterval(timerInterval);
    timerStarted = false;
    startGame();
}

function startGame() {
    const selectedEmojis = getRandomEmojis(6, allEmojis);
    const emojiPairs = [...selectedEmojis, ...selectedEmojis]; 
    const shuffledEmojiPairs = shuffleArray(emojiPairs);

    const boxesHTML = shuffledEmojiPairs.map(emoji => `<div class="item">${emoji}</div>`).join('');
    gameContainer.innerHTML = boxesHTML;
}

gameContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('item')) {
        const box = event.target;
            
        startTimer();

        const wrongBoxes = document.querySelectorAll('.wrong');
        if (wrongBoxes.length === 2) {
            wrongBoxes.forEach(box => {
                box.classList.remove('wrong','boxOpen');
            });
        }

        if (box.classList.contains('boxMatch') || box.classList.contains('boxOpen')) return;

        box.classList.add('boxOpen');

        const openBoxes = document.querySelectorAll('.boxOpen');

        if (openBoxes.length === 2) {
            const [firstBox, secondBox] = openBoxes;

            if (firstBox.innerHTML === secondBox.innerHTML) {
                firstBox.classList.add('boxMatch', 'correct');
                secondBox.classList.add('boxMatch', 'correct');
                firstBox.classList.remove('boxOpen');
                secondBox.classList.remove('boxOpen');
            } else {
                firstBox.classList.add('wrong');
                secondBox.classList.add('wrong');
            }

            if (document.querySelectorAll('.boxMatch').length === document.querySelectorAll('.item').length) {
                showModal('You win!');
                clearInterval(timerInterval);
            }            
        }
    }
});

function startTimer() {
    if (!timerStarted) {
        timerStarted = true;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft} sec`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showModal('You lose!');
            }
        }, 1000);
    }
}

startGame();