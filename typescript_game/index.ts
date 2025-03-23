interface FallingObject {
    x: number;
    y: number;
    color: string;
    width: number;
    height: number;
}

interface Basket {
    x: number,
    width: number,
    height: number,
}

interface DifficultyButton {
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    textColor: string;
    difficulty: string;
}

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;
const buttonWidth = 200;
const buttonHeight = 40;
const basketWidth = 80;
const basketHeight = 20;

const buttons: DifficultyButton[] = [
    {
        label: 'Easy',
        x: canvas.width / 2 - 100,
        y: canvas.height / 2,
        width: buttonWidth,
        height: buttonHeight,
        color: 'green',
        textColor: 'white',
        difficulty: 'easy'
    },
    {
        label: 'Medium',
        x: canvas.width / 2 - 100,
        y: canvas.height / 2 + 50,
        width: buttonWidth,
        height: buttonHeight,
        color: 'yellow',
        textColor: 'white',
        difficulty: 'medium'
    },
    {
        label: 'Hard',
        x: canvas.width / 2 - 100,
        y: canvas.height / 2 + 100,
        width: buttonWidth,
        height: buttonHeight,
        color: 'red',
        textColor: 'white',
        difficulty: 'hard'
    }
];

interface GameState {
    currentScore: number;
    objectFallSpeed: number;
    lives: number;
    basketSpeed: number;
    objectSize: number;
    gameOver: boolean;
    gameWon: boolean;
    fallingObjects: FallingObject[];
    basket: Basket;
    spawnInterval: number;
    difficulty: string;
    targetScore: number;
    lastSpawnTime: number;
}

const gameState: GameState = {
    currentScore: 0,
    objectFallSpeed: 1,
    lives: 0,
    basketSpeed: 20,
    objectSize: 35,
    gameOver: false,
    gameWon: false,
    fallingObjects: [],
    basket: {
        x: canvas.width / 2,
        width: basketWidth,
        height: basketHeight
    },
    spawnInterval: 2000,
    difficulty: "easy",
    targetScore: 0,
    lastSpawnTime: 0
};

const setParamsBasedOnDifficulty = (chosenDifficulty: string): void => {
    switch (chosenDifficulty) {
        case "easy":
            gameState.lives = 10;
            gameState.objectFallSpeed = 1;
            gameState.objectSize = 50;
            gameState.basketSpeed = 50;
            gameState.spawnInterval = 5000;
            gameState.targetScore = 5;
            break;
        case "medium":
            gameState.lives = 5;
            gameState.objectFallSpeed = 2;
            gameState.objectSize = 30;
            gameState.basketSpeed = 40;
            gameState.spawnInterval = 3000;
            gameState.targetScore = 10;
            break;
        case "hard":
            gameState.lives = 3;
            gameState.objectFallSpeed = 3;
            gameState.objectSize = 20;
            gameState.basketSpeed = 30;
            gameState.spawnInterval = 1000;
            gameState.targetScore = 20;
            break;
    }
};

const getRandomColor = (): string => {
    const colors = ['red', 'green', 'blue'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const spawnObject = (): void => {
    const objectColor = getRandomColor();
    const newObject: FallingObject = {
        x: Math.random() * (canvas.width - gameState.objectSize),
        y: 0,
        width: gameState.objectSize,
        height: gameState.objectSize,
        color: objectColor
    };
    gameState.fallingObjects.push(newObject);
};

const moveFallingObjects = (): void => {
    gameState.fallingObjects.forEach((obj, idx) => {
        obj.y += gameState.objectFallSpeed;
        if (obj.y >= canvas.height) {
            gameState.fallingObjects.splice(idx, 1);
            gameState.lives--;
        }
    });
};

const drawFallingObjects = (): void => {
    gameState.fallingObjects.forEach(obj => {
        context.beginPath();
        context.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
        context.fillStyle = obj.color;
        context.fill();
        context.closePath();
    });
};

const renderScreen = (): void => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawFallingObjects();
    moveFallingObjects();

    context.fillStyle = 'blue';
    context.fillRect(gameState.basket.x, canvas.height - gameState.basket.height, gameState.basket.width, gameState.basket.height);

    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText(`Score: ${gameState.currentScore}`, 10, 30);
    context.fillText(`Target score: ${gameState.targetScore}`, 10, 60);
    context.fillText(`Lives left: ${gameState.lives}`, 10, 90);

    if (gameState.gameOver) {
        context.fillStyle = 'red';
        context.font = '30px Arial';
        context.fillText('Game Over', canvas.width / 2 - 75, canvas.height / 2);
        setTimeout(() => {
            displayStartScreen();
        }, 3000);
    }

    if (gameState.gameWon) {
        context.fillStyle = 'green';
        context.font = '30px Arial';
        context.fillText('You Won. Congratulations!', canvas.width / 2 - 150, canvas.height / 2);
        setTimeout(() => {
            displayStartScreen();
        }, 3000);
    }
};

document.addEventListener('keydown', (e: KeyboardEvent): void => {
    const canvasWidth = canvas.width;
    const basketWidth = gameState.basket.width;

    if (e.key === 'ArrowLeft' || e.key === 'a') {
        gameState.basket.x = Math.max(0, gameState.basket.x - gameState.basketSpeed);
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        gameState.basket.x = Math.min(canvasWidth - basketWidth, gameState.basket.x + gameState.basketSpeed);
    }
});

const checkCollisions = (): void => {
    const fallingObjects = gameState.fallingObjects;
    const userBasket = gameState.basket;
    fallingObjects.forEach((obj, idx) => {
        const overlapsX = obj.x + obj.width > userBasket.x && obj.x < userBasket.x + userBasket.width;
        const overlapsY = obj.y + obj.height >= canvas.height - userBasket.height && obj.y + obj.height <= canvas.height;

        if (overlapsX && overlapsY) {
            gameState.currentScore++;
            gameState.fallingObjects.splice(idx, 1);
        }
    });
};

const checkGameOver = (): boolean => {
    return gameState.lives <= 0;
};

const checkGameWon = (): boolean => {
    return gameState.currentScore == gameState.targetScore;
}

const displayStartScreen = (): void => {
    gameState.gameOver = false;
    gameState.gameWon = false;
    gameState.currentScore = 0;
    gameState.lives = 0;
    gameState.fallingObjects = [];

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'black';
    context.font = '30px Arial';
    context.fillText('Choose Difficulty:', canvas.width / 2 - 100, canvas.height / 2 - 50);

    buttons.forEach((button) => {
        context.fillStyle = button.color;
        context.fillRect(button.x, button.y, button.width, button.height);

        context.fillStyle = button.textColor;
        context.fillText(button.label, button.x + (button.width / 2) - (context.measureText(button.label).width / 2), button.y + (button.height / 2) + 7);
    });
};

canvas.addEventListener('click', (e: MouseEvent): void => {
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    buttons.forEach(button => {
        if (mouseX >= button.x && mouseX <= button.x + button.width &&
            mouseY >= button.y && mouseY <= button.y + button.height) {

            setParamsBasedOnDifficulty(button.difficulty);
            gameState.gameOver = false;
            gameState.gameWon = false;
            gameLoop(0);
        }
    });
});

displayStartScreen();

const gameLoop = (timestamp: number): void => {
    const deltaTime = timestamp - gameState.lastSpawnTime;

    if (!gameState.gameOver && !gameState.gameWon) {
        if (deltaTime >= gameState.spawnInterval) {
            spawnObject();
            gameState.lastSpawnTime = timestamp;
        }

        moveFallingObjects();
        checkCollisions();

        if (checkGameOver()) {
            gameState.gameOver = true;
        }
        if (checkGameWon()) {
            gameState.gameWon = true;
        }

        renderScreen();
        requestAnimationFrame(gameLoop);
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        renderScreen();
    }
};