const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const resetButton = document.querySelector('#reset');
const squares = document.querySelectorAll('.square');
const title = document.querySelector('#title');
const modeButtons = document.querySelectorAll('.mode');

let colors = [];
let colorToGuess = null;
let numberOfSquares = 6;

const pickColorToGuess = () => {
    const randomNumber = Math.floor(Math.random() * numberOfSquares);

    return colors[randomNumber];
}

const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

const generateRandomColors = (number) => {
    const generatedColors = [];

    for (let i = 0; i < number; i += 1) {
        generatedColors.push(randomColor());
    };

    return generatedColors;
}

const reset = () => {
    colors = generateRandomColors(numberOfSquares);
    colorToGuess = pickColorToGuess();
    colorDisplay.textContent = colorToGuess.toUpperCase();
    messageDisplay.textContent = "";

    for (let i = 0; i < squares.length; i += 1) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i]
        } else {
            squares[i].style.display = "none";
        }
    };

    title.style.background = "steelblue";
}

resetButton.addEventListener('click', () => reset());

const changeColors = () => {
    for (let i = 0; i < squares.length; i += 1) {
        squares[i].style.background = colorToGuess;
    };
};

for (let i = 0; i < squares.length; i += 1) {
    const square = squares[i];

    square.addEventListener('click', () => {
        const clickedColor = square.style.background;

        if (clickedColor === colorToGuess) {
            changeColors();
            messageDisplay.textContent = 'Correct!';
            resetButton.textContent = 'Play Again?';
            title.style.background = colorToGuess;
        } else {
            square.style.background = "#232323";
            messageDisplay.textContent = "Try Again"
        }
    });
};

for (let i = 0; i < modeButtons.length; i += 1) {
    const modeButton = modeButtons[i];

    modeButton.addEventListener('click', () => {
        if (modeButton.textContent === 'Easy') {
            modeButtons[0].classList.add("selected");
            modeButtons[1].classList.remove("selected");
            numberOfSquares = 3;
        } else {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.add("selected");
            numberOfSquares = 6;
        }

        reset();
    });
}

reset();

