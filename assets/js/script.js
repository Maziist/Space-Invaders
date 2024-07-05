// Éléments du DOM
let sound = new Audio("./assets/son/shoot.wav")
let soundIntro = new Audio("./assets/son/SpaceIntro.mp3")
let soundGame = new Audio("./assets/son/SpaceGame.mp3")
const container = document.getElementById('gameContainer');
const menuElement = document.getElementById('menu');
const scoreElement = document.getElementById('score');
const btnStart = document.getElementById('btnStart')
const optionBtn = document.getElementById('optionBtn');
const optionsMenu = document.getElementById('options-menu');
const soundToggle = document.getElementById('mute');
const keybindSwitch = document.getElementById('keybind-switch');
const showCredits = document.getElementById('show-credits');
const closeOptions = document.getElementById('close-options');
const volumeSlider = document.getElementById('volume-slider')
const sonResult = new Audio('./assets/son/');
let isMuted = false;
optionBtn.addEventListener('click', () => {
    optionsMenu.classList.remove('hidden');
});
closeOptions.addEventListener('click', () => {
    optionsMenu.classList.add('hidden');
});
keybindSwitch.addEventListener('click', () => {
    return ('Keybind switching not implemented yet');
});

// soundToggle.addEventListener('click', () => {
//     isMuted = !isMuted;
//     sonResult.muted = isMuted;
//     soundToggle.textContent = isMuted ? 'Sound off' : 'Sound on';
// });
volumeSlider.addEventListener('input', (event) => {
    const volume = event.target.value;
    sonResult.volume = volume / 100;
});


// Constantes du jeu
const SHIP = 1;
const BLACK_ALIEN = 2;
const BLUE_ALIEN = 3;
const RED_ALIEN = 4;
const PLATE = 5;
const VOID_CELL = 0;
const BULLET = 6;

// Variables du jeu
let shipLife = 3;
let score = 0;
let isGameRunning = false;
let shipPositionX = 8;
let alienDirection = 1;
let alienMoveCounter = 0;
let gameSpeed = 500; // Vitesse du jeu en millisecondes

// Tableau de jeu
let gameTab = [
    [0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Fonction pour créer le tableau de jeu
function createTab(tab) {
    container.innerHTML = '';
    tab.forEach((row, rowIndex) => {
        let rowEl = document.createElement('div');
        rowEl.classList.add('row');
        row.forEach((cell, columnIndex) => {
            let cellEl = document.createElement('div');
            cellEl.classList.add('cell');
            switch (cell) {
                case SHIP:
                    let shipImg = document.createElement('img');
                    shipImg.src = './assets/imgs/element/ship.png';
                    shipImg.alt = 'Ship';
                    cellEl.appendChild(shipImg);
                    break;
                case BLACK_ALIEN:
                    let blackAlienImg = document.createElement('img');
                    blackAlienImg.src = './assets/imgs/element/black.gif';
                    blackAlienImg.alt = 'Black Alien';
                    cellEl.appendChild(blackAlienImg);
                    break;
                case BLUE_ALIEN:
                    let blueAlienImg = document.createElement('img');
                    blueAlienImg.src = './assets/imgs/element/vaiseau.gif';
                    blueAlienImg.alt = 'Blue Alien';
                    cellEl.appendChild(blueAlienImg);
                    break;
                case RED_ALIEN:
                    let redAlienImg = document.createElement('img');
                    redAlienImg.src = './assets/imgs/element/red.gif';
                    redAlienImg.alt = 'Red Alien';
                    cellEl.appendChild(redAlienImg);
                    break;
                case PLATE:
                    let platetImg = document.createElement('img');
                    platetImg.src = './assets/imgs/element/plate.png';
                    cellEl.appendChild(platetImg);
                    break;
                case BULLET:
                    let bulletImg = document.createElement('img');
                    bulletImg.src = './assets/imgs/element/bullet.png';
                    cellEl.appendChild(bulletImg);
                    break;
            }
            rowEl.appendChild(cellEl);
        });
        container.appendChild(rowEl);
    });
}

// Initialisation du jeu
function initGame() {
    createTab(gameTab);
    container.style.display = 'none';
    updateScore();
    soundIntro.play();
}

// Démarrage du jeu
function startGame() {
    soundIntro.pause();
    isGameRunning = true;
    menuElement.style.display = 'none';
    container.style.display = 'block';
    score = 0;
    shipLife = 3;
    gameTab = [
        
            [0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
            [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 5, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
       
    ];
    shipPositionX = 8;
    alienDirection = 1;
    alienMoveCounter = 0;
    updateScore();
    createTab(gameTab);
    gameLoop();
    soundGame.play()
    
}

// Déplacement du vaisseau
function moveShip(direction) {
    if (isGameRunning) {
        gameTab[10][shipPositionX] = VOID_CELL;
        shipPositionX += direction;
        shipPositionX = Math.max(2, Math.min(shipPositionX, 14));
        gameTab[10][shipPositionX] = SHIP;
        createTab(gameTab);
    }
}

// Mise à jour du score
function updateScore() {
    scoreElement.textContent = `Score: ${score} | Vies: ${shipLife}`;
}

// Boucle principale du jeu
function gameLoop() {
    if (isGameRunning) {
        moveAliens();
        checkCollisions();
        createTab(gameTab);
        if (checkGameOver()) {
            endGame();
        } else {
            setTimeout(gameLoop, gameSpeed);
        }
    }
}

// Déplacement des aliens
function moveAliens() {
    let shouldMoveDown = false;
    alienMoveCounter++;

    if (alienMoveCounter % 5 === 0) {
        for (let y = 0; y < gameTab.length; y++) {
            for (let x = 0; x < gameTab[y].length; x++) {
                if (gameTab[y][x] === BLACK_ALIEN || gameTab[y][x] === BLUE_ALIEN || gameTab[y][x] === RED_ALIEN) {
                    if ((x === 1 && alienDirection === -1) || (x === 15 && alienDirection === 1)) {
                        shouldMoveDown = true;
                        break;
                    }
                }
            }
            if (shouldMoveDown) break;
        }

        if (shouldMoveDown) {
            alienDirection *= -1;
            moveAliensDown();
        } else {
            moveAliensSideways();
        }
    }
}

// Déplacement des aliens vers le bas
function moveAliensDown() {
    for (let y = gameTab.length - 1; y >= 0; y--) {
        for (let x = 0; x < gameTab[y].length; x++) {
            if (gameTab[y][x] === BLACK_ALIEN || gameTab[y][x] === BLUE_ALIEN || gameTab[y][x] === RED_ALIEN) {
                if (y < gameTab.length - 1) {
                    gameTab[y + 1][x] = gameTab[y][x];
                    gameTab[y][x] = VOID_CELL;
                }
            }
        }
    }
}

// Déplacement latéral des aliens
function moveAliensSideways() {
    for (let y = 0; y < gameTab.length; y++) {
        if (alienDirection === 1) {
            for (let x = gameTab[y].length - 1; x >= 0; x--) {
                if (gameTab[y][x] === BLACK_ALIEN || gameTab[y][x] === BLUE_ALIEN || gameTab[y][x] === RED_ALIEN) {
                    gameTab[y][x + alienDirection] = gameTab[y][x];
                    gameTab[y][x] = VOID_CELL;
                }
            }
        } else {
            for (let x = 0; x < gameTab[y].length; x++) {
                if (gameTab[y][x] === BLACK_ALIEN || gameTab[y][x] === BLUE_ALIEN || gameTab[y][x] === RED_ALIEN) {
                    gameTab[y][x + alienDirection] = gameTab[y][x];
                    gameTab[y][x] = VOID_CELL;
                }
            }
        }
    }
}

// Vérification des collisions
function checkCollisions() {
    for (let y = 0; y < gameTab.length; y++) {
        for (let x = 0; x < gameTab[y].length; x++) {
            if (gameTab[y][x] === BULLET) {
                if (y > 0 && gameTab[y - 1][x] > 1) {
                    handleCollision(y - 1, x);
                    gameTab[y][x] = VOID_CELL;
                } else if (y > 0) {
                    gameTab[y - 1][x] = BULLET;
                    gameTab[y][x] = VOID_CELL;
                } else {
                    gameTab[y][x] = VOID_CELL;
                }
            }
        }
    }
}

// Tir du vaisseau
function shoot() {
    if (isGameRunning) {
        let bulletY = 9;
        gameTab[bulletY][shipPositionX] = BULLET;
        sound.play();
    }
}

// Gestion des collisions
function handleCollision(y, x) {
    switch (gameTab[y][x]) {
        case BLACK_ALIEN:
        case BLUE_ALIEN:
            gameTab[y][x] = VOID_CELL;
            score += 10;
            break;
        case RED_ALIEN:
            gameTab[y][x] = VOID_CELL;
            score += 20;
            break;
        case PLATE:
            gameTab[y][x] = VOID_CELL;
            break;
    }
    updateScore();
}



// Vérification de fin de partie
function checkGameOver() {
    // Vérifier si les aliens ont atteint le bas
    for (let x = 0; x < gameTab[10].length; x++) {
        if (gameTab[10][x] === BLACK_ALIEN || gameTab[10][x] === BLUE_ALIEN || gameTab[10][x] === RED_ALIEN) {
            return true;
        }
    }

    // Vérifier s'il reste des aliens
    let aliensRemaining = false;
    for (let y = 0; y < gameTab.length; y++) {
        for (let x = 0; x < gameTab[y].length; x++) {
            if (gameTab[y][x] === BLACK_ALIEN || gameTab[y][x] === BLUE_ALIEN || gameTab[y][x] === RED_ALIEN) {
                aliensRemaining = true;
                break;
            }
        }
        if (aliensRemaining) break;
    }

    return !aliensRemaining;
}

// Fin de partie
function endGame() {
    isGameRunning = false;
    menuElement.style.display = 'flex';
    container.style.display = 'none';
    scoreElement.textContent = `Game Over! Score final: ${score}`;
}

// Écouteurs d'événements
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && shipPositionX > 2) {
        moveShip(-1);
    } else if (event.key === 'ArrowRight' && shipPositionX < 14) {
        moveShip(1);
    } else if (event.key === ' ') {
        shoot();
    }
});

btnStart.addEventListener('click', startGame);

// Initialisation du jeu
initGame();