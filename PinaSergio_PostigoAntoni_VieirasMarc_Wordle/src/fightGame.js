// Estado del juego
let playerHealth = 100;
let enemyHealth = 100;
let playerEnergy = 0;
let combo = 0;
let isGameOver = false;
let lastMoveTime = Date.now();
let selectedCharacter = null;
let selectedEnemy = null;
let characters = [];

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
        <h2>${isPlayer ? 'Selecciona tu personaje' : 'Selecciona tu enemigo'}</h2>
        <div class="character-grid">
            ${characters.map(char => `
                <div class="character-option" data-character-id="${char.id}">
                    <img src="${char.characterImage}" alt="${char.name}">
                    <p>${char.name}</p>
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

    console.log('Selección de personajes mostrada');
}

// Seleccionar personaje del jugador
function selectPlayerCharacter(characterId) {
    console.log('Seleccionando jugador:', characterId);

    // Verifica si se encuentra el personaje
    const character = characters.find(char => char.id == characterId); // Asegúrate de usar '==' por si characterId es un string
    if (!character) {
        console.error('Personaje no encontrado:', characterId);
        return;
    }

    selectedCharacter = character;

    // Actualizar imagen y mostrar mensaje
    const playerImg = document.querySelector('.player img');
    if (playerImg) {
        playerImg.src = character.characterImage;
        console.log('Imagen del jugador actualizada:', character.characterImage);
    } else {
        console.warn('Elemento .player img no encontrado en el DOM');
    }

    showMessage(`¡Has seleccionado a ${character.name}!`);
    console.log('Personaje seleccionado correctamente:', character);

    // Limpiar selección actual y mostrar selección del enemigo
    setTimeout(() => {
        document.querySelectorAll('.character-selection, .overlay').forEach(el => el.remove());
        console.log('Limpiando selección de jugador y mostrando selección del enemigo...');
        showCharacterSelection(false); // Mostrar selección del enemigo
    }, 500);
}



// Seleccionar personaje enemigo
function selectEnemyCharacter(characterId) {
    console.log('Seleccionando enemigo:', characterId);

    // Busca al personaje en la lista
    const character = characters.find(char => char.id == characterId); // Asegúrate de usar '==' para comparar strings con números
    if (!character) {
        console.error('Enemigo no encontrado:', characterId);
        return;
    }

    selectedEnemy = character;

    // Actualizar la imagen del enemigo
    const enemyImg = document.querySelector('.enemy img');
    if (enemyImg) {
        enemyImg.src = character.characterImage;
        console.log('Imagen del enemigo actualizada:', character.characterImage);
    } else {
        console.warn('Elemento .enemy img no encontrado en el DOM');
    }

    // Limpia la selección del enemigo y prepara el juego
    setTimeout(() => {
        document.querySelectorAll('.character-selection, .overlay').forEach(el => el.remove());
        console.log('Selección del enemigo completada. Preparando controles de juego...');
        enableGameControls();
    }, 500);

    // Mensaje de confirmación
    showMessage(`¡Tu enemigo será ${character.name}!`);
    console.log('Enemigo seleccionado correctamente:', character);
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
        gameOver('¡ENEMIGO DERROTADO!');
    }
}

// Función para el turno del enemigo
function enemyTurn() {
    if (isGameOver) return;

    console.log("Turno del enemigo...");

    // Calcular tipo de ataque del enemigo
    const attackType = Math.random() < 0.3 ? 'special' : 'normal'; // 30% de probabilidad de ataque especial
    let damage;

    if (attackType === 'special') {
        damage = Math.floor(Math.random() * 15) + 15; // Daño especial entre 15 y 30
        showMessage(`¡El enemigo usó un ataque especial e infligió ${damage} de daño!`);
    } else {
        damage = Math.floor(Math.random() * 10) + 5; // Daño normal entre 5 y 15
        showMessage(`¡El enemigo te atacó e infligió ${damage} de daño!`);
    }

    playerHealth = Math.max(0, playerHealth - damage);
    updateBars();

    // Verificar si el jugador ha sido derrotado
    if (playerHealth <= 0) {
        gameOver(false); // Jugador derrotado
        return;
    }

    // Indicar que es el turno del jugador
    setTimeout(() => showMessage("¡Es tu turno!"), 1000);
}

// Función para actualizar las barras de vida y energía
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

// Modificación en `gameOver` para mostrar imagen y mensaje final
function gameOver(playerWins) {
    isGameOver = true;

    // Mostrar mensaje y pantalla final
    const winnerMessage = playerWins ? "¡HAS GANADO!" : "¡HAS SIDO DERROTADO!";
    showMessage(winnerMessage);

    // Crear pantalla final
    const endScreen = document.createElement('div');
    endScreen.className = 'end-screen';

    const winnerImage = document.createElement('img');
    winnerImage.src = playerWins ? selectedCharacter.characterImage : selectedEnemy.characterImage;
    winnerImage.alt = playerWins ? selectedCharacter.name : selectedEnemy.name;

    const finalMessage = document.createElement('h1');
    finalMessage.textContent = winnerMessage;

    endScreen.appendChild(winnerImage);
    endScreen.appendChild(finalMessage);

    document.body.appendChild(endScreen);

    // Hacer visible el botón de reinicio
    restartBtn.classList.remove('hidden');

    // Deshabilitar los controles
    document.querySelectorAll('.controls button').forEach(btn => {
        btn.disabled = true;
    });
}

// Función para reiniciar el juego
// Restablecer juego con limpieza de la pantalla final
// Función para reiniciar el juego
function restart() {
    playerHealth = 100;
    enemyHealth = 100;
    playerEnergy = 0;
    combo = 0;
    isGameOver = false;
    selectedCharacter = null;
    selectedEnemy = null;

    // Limpiar la pantalla final
    document.querySelectorAll('.end-screen').forEach(el => el.remove()); // Solo eliminamos el final

    // Limpiar los mensajes y reiniciar las barras
    updateBars();
    updateCombo();
    showMessage('');

    // Habilitar los controles nuevamente
    document.querySelectorAll('.controls button').forEach(btn => {
        btn.disabled = false;
    });

    // Cargar personajes para una nueva ronda
    loadCharacters();
}

// Modificación en la función `performAttack` para verificar ganador
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

    // Verificar si el enemigo ha sido derrotado
    if (enemyHealth <= 0) {
        gameOver(true); // Jugador gana
        return;
    }

    // Turno del enemigo tras un breve retraso
    setTimeout(enemyTurn, 1000);
}

// Función para finalizar el juego con mensaje de derrota// Modificación en `gameOver` para mostrar imagen y mensaje final
function gameOver(playerWins) {
    isGameOver = true;

    // Mostrar mensaje final
    const winnerMessage = playerWins ? "¡HAS GANADO!" : "¡HAS SIDO DERROTADO!";
    showMessage(winnerMessage);

    // Crear pantalla final (que contiene la imagen, mensaje de ganador y el botón de reinicio)
    const endScreen = document.createElement('div');
    endScreen.className = 'end-screen';

    const winnerImage = document.createElement('img');
    winnerImage.src = playerWins ? selectedCharacter.characterImage : selectedEnemy.characterImage;
    winnerImage.alt = playerWins ? selectedCharacter.name : selectedEnemy.name;

    const finalMessage = document.createElement('h1');
    finalMessage.textContent = winnerMessage;

    // Crear el botón de reinicio
    const restartBtn = document.createElement('button');
    restartBtn.textContent = "REINICIAR";
    restartBtn.id = 'restartBtn';
    restartBtn.classList.add('form-button');
    restartBtn.onclick = restart; // Asignar la función de reinicio

    // Agregar todos los elementos a la pantalla final
    endScreen.appendChild(winnerImage);
    endScreen.appendChild(finalMessage);
    endScreen.appendChild(restartBtn);

    // Añadir la pantalla final al DOM
    document.body.appendChild(endScreen);

    // Deshabilitar los controles
    document.querySelectorAll('.controls button').forEach(btn => {
        btn.disabled = true;
    });
}

// Inicialización del juego
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando juego...');
    restartBtn.classList.add('hidden');  // Asegurarse de que el botón de reinicio esté oculto al principio
    document.querySelectorAll('.controls button').forEach(btn => {
        btn.disabled = true;
    });
    loadCharacters();
});





