// Variables del juego
let playerHealth = 100;
let enemyHealth = 100;
let playerEnergy = 0;
let combo = 0;
let isGameOver = false;
let lastMoveTime = Date.now();
let selectedCharacter = null;
let selectedEnemy = null;
let characters = [];

// Recuperar datos del usuario
const userData = JSON.parse(localStorage.getItem('userData'));

// Función para actualizar las monedas del usuario en la API
async function updateCoins(userId, newCoinAmount) {
    try {
        const response = await fetch(`https://localhost:7249/api/User/${userId}/updateCoins?newCoinAmount=${newCoinAmount}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error actualizando las monedas');
        }

        const responseData = await response.json();
        if (responseData && responseData.userId && responseData.soulsCoin !== undefined) {
            console.log('Monedas actualizadas correctamente:', responseData);
            return true;
        } else {
            throw new Error('Respuesta inesperada de la API');
        }
    } catch (error) {
        console.error('Error al actualizar las monedas:', error);
        return false;
    }
}

// Función para dar recompensa al ganar
async function giveReward() {
    if (userData) {
        // Sumar 10 monedas
        const newCoinAmount = (userData.soulsCoin || 0) + 10;
        
        // Actualizar las monedas en localStorage
        userData.soulsCoin = newCoinAmount;
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Actualizar las monedas en la base de datos
        const updated = await updateCoins(userData.userId, newCoinAmount);
        
        // Mostrar mensaje de recompensa
        showMessage('¡Victoria! Has ganado 10 almas.', 'success');
        
        return updated;
    }
    return false;
}

// Elementos del DOM
const playerHealthBar = document.getElementById('playerHealthBar');
const playerHealthText = document.getElementById('playerHealthText');
const playerEnergyBar = document.getElementById('playerEnergyBar');
const playerEnergyText = document.getElementById('playerEnergyText');
const enemyHealthBar = document.getElementById('enemyHealthBar');
const enemyHealthText = document.getElementById('enemyHealthText');
const messageArea = document.getElementById('messageArea');
const comboCounter = document.getElementById('comboCounter');
const restartBtn = document.getElementById('restartBtn');
const specialAttackBtn = document.getElementById('specialAttack');
const ultraAttackBtn = document.getElementById('ultraAttack');

// Inicializar iconos de Lucide
lucide.createIcons();

// Cargar personajes desde la API
async function loadCharacters() {
    try {
        console.log('Cargando personajes...');
        const response = await fetch("https://localhost:7003/api/Character");
        if (!response.ok) {
            throw new Error("Error al obtener los personajes");
        }
        characters = await response.json();
        console.log('Personajes cargados:', characters);
        showCharacterSelection(true);
    } catch (error) {
        console.error("Error al cargar los personajes:", error);
        messageArea.textContent = "Error al cargar los personajes. Por favor, recarga la página.";
    }
}

// Mostrar selección de personajes
function showCharacterSelection(isPlayer) {
    console.log('Mostrando selección de personajes, isPlayer:', isPlayer);

    // Limpiar selecciones anteriores
    document.querySelectorAll('.character-selection, .overlay').forEach(el => el.remove());

    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Crear el div de selección
    const selectionDiv = document.createElement('div');
    selectionDiv.className = 'character-selection';

    // Crear el contenido
    selectionDiv.innerHTML = `
        <button onclick="location.href='/index.html'" class="back-button">Volver a Inicio</button>
        <h2 class="text-white">${isPlayer ? 'Selecciona tu personaje' : 'Selecciona tu enemigo'}</h2>
        <div class="character-grid">
            ${characters.map(char => `
                <div class="character-option" data-character-id="${char.id}">
                    <img src="${char.characterImage}" alt="${char.name}">
                    <p class="text-white">${char.name}</p>
                </div>
            `).join('')}
        </div>
    `;

    document.body.appendChild(selectionDiv);

    // Agregar event listeners
    const options = selectionDiv.querySelectorAll('.character-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const characterId = option.dataset.characterId;
            console.log('Click en personaje:', characterId);
            if (isPlayer) {
                selectPlayerCharacter(characterId);
            } else {
                selectEnemyCharacter(characterId);
            }
        });
    });
}

// Seleccionar personaje del jugador
function selectPlayerCharacter(characterId) {
    const character = characters.find(char => char.id == characterId);
    if (!character) return;

    selectedCharacter = character;
    const playerImg = document.querySelector('.player img');
    if (playerImg) {
        playerImg.src = character.characterImage;
    }

    showMessage(`¡Has seleccionado a ${character.name}!`);
    
    setTimeout(() => {
        document.querySelectorAll('.character-selection, .overlay').forEach(el => el.remove());
        showCharacterSelection(false);
    }, 500);
}

// Seleccionar personaje enemigo
function selectEnemyCharacter(characterId) {
    const character = characters.find(char => char.id == characterId);
    if (!character) return;

    selectedEnemy = character;
    const enemyImg = document.querySelector('.enemy img');
    if (enemyImg) {
        enemyImg.src = character.characterImage;
    }

    setTimeout(() => {
        document.querySelectorAll('.character-selection, .overlay').forEach(el => el.remove());
        enableGameControls();
    }, 500);

    showMessage(`¡Tu enemigo será ${character.name}!`);
}

// Habilitar controles de juego
function enableGameControls() {
    document.querySelectorAll('.controls button').forEach(btn => {
        btn.disabled = false;
    });
    updateBars();
}

// Actualizar barras de estado
function updateBars() {
    playerHealthBar.style.width = `${playerHealth}%`;
    playerHealthText.textContent = Math.round(playerHealth);
    playerEnergyBar.style.width = `${playerEnergy}%`;
    playerEnergyText.textContent = Math.round(playerEnergy);
    enemyHealthBar.style.width = `${enemyHealth}%`;
    enemyHealthText.textContent = Math.round(enemyHealth);

    specialAttackBtn.disabled = playerEnergy < 30;
    ultraAttackBtn.disabled = playerEnergy < 100;
}

// Mostrar mensaje
function showMessage(text) {
    messageArea.textContent = text;
    messageArea.classList.add('fade-in');
    setTimeout(() => messageArea.classList.remove('fade-in'), 500);
}

// Actualizar combo
function updateCombo() {
    if (combo > 0) {
        comboCounter.textContent = `COMBO x${combo + 1}`;
        comboCounter.classList.remove('hidden');
    } else {
        comboCounter.classList.add('hidden');
    }
}

// Realizar ataque
function performAttack(type) {
    if (isGameOver || !selectedCharacter || !selectedEnemy) return;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastMoveTime;
    lastMoveTime = currentTime;

    if (timeDiff < 1000) {
        combo++;
    } else {
        combo = 0;
    }
    updateCombo();

    let damage = 0;
    let energyGain = 10;
    let moveMessage = '';

    switch (type) {
        case 'normal':
            damage = Math.floor(Math.random() * 10) + 5;
            moveMessage = '¡Estocada!';
            break;
        case 'special':
            if (playerEnergy >= 30) {
                damage = Math.floor(Math.random() * 15) + 15;
                playerEnergy -= 30;
                moveMessage = '¡Golpe de Alma!';
            } else {
                showMessage('¡No tienes suficiente energía!');
                return;
            }
            break;
        case 'ultra':
            if (playerEnergy >= 100) {
                damage = Math.floor(Math.random() * 25) + 35;
                playerEnergy = 0;
                moveMessage = '¡IRA DE LOS DIOSES!';
            } else {
                showMessage('¡Necesitas energía máxima!');
                return;
            }
            break;
    }

    if (combo > 0) {
        damage = Math.floor(damage * (1 + combo * 0.1));
        energyGain += combo * 5;
    }

    enemyHealth = Math.max(0, enemyHealth - damage);
    playerEnergy = Math.min(100, playerEnergy + energyGain);

    showMessage(`${moveMessage} ¡${damage} de daño! ${combo > 0 ? `¡Combo x${combo + 1}!` : ''}`);
    updateBars();

    if (enemyHealth <= 0) {
        gameOver(true);
        return;
    }

    setTimeout(enemyTurn, 1000);
}

// Turno del enemigo
function enemyTurn() {
    if (isGameOver) return;

    const attackType = Math.random() < 0.3 ? 'special' : 'normal';
    let damage;

    if (attackType === 'special') {
        damage = Math.floor(Math.random() * 15) + 15;
        showMessage(`¡El enemigo usó un ataque especial e infligió ${damage} de daño!`);
    } else {
        damage = Math.floor(Math.random() * 10) + 5;
        showMessage(`¡El enemigo te atacó e infligió ${damage} de daño!`);
    }

    playerHealth = Math.max(0, playerHealth - damage);
    updateBars();

    if (playerHealth <= 0) {
        gameOver(false);
        return;
    }

    setTimeout(() => showMessage("¡Es tu turno!"), 1000);
}

// Función para finalizar el juego
async function gameOver(playerWins) {
    isGameOver = true;

    const winnerMessage = playerWins ? "¡HAS GANADO!" : "¡HAS SIDO DERROTADO!";
    showMessage(winnerMessage);

    if (playerWins) {
        await giveReward();
    }

    const endScreen = document.createElement('div');
    endScreen.className = 'end-screen';

    const winnerImage = document.createElement('img');
    winnerImage.src = playerWins ? selectedCharacter.characterImage : selectedEnemy.characterImage;
    winnerImage.alt = playerWins ? selectedCharacter.name : selectedEnemy.name;

    const finalMessage = document.createElement('h1');
    finalMessage.textContent = winnerMessage;
    finalMessage.className = 'text-white';

    const restartBtn = document.createElement('button');
    restartBtn.textContent = "REINICIAR";
    restartBtn.id = 'restartBtn';
    restartBtn.classList.add('form-button');
    restartBtn.onclick = () => {
        location.reload();
    };

    endScreen.appendChild(winnerImage);
    endScreen.appendChild(finalMessage);
    endScreen.appendChild(restartBtn);

    document.body.appendChild(endScreen);

    document.querySelectorAll('.controls button').forEach(btn => {
        btn.disabled = true;
    });
}

// Inicialización del juego
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando juego...');
    restartBtn.classList.add('hidden');
    document.querySelectorAll('.controls button').forEach(btn => {
        btn.disabled = true;
    });
    loadCharacters();
});

// Exponer funciones necesarias globalmente
window.performAttack = performAttack;