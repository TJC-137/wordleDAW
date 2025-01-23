let target;
let attempts = 0;

// Recuperar datos del usuario
const userData = JSON.parse(localStorage.getItem('userData'));

// Función para actualizar las monedas del usuario en la API
async function updateCoins(userId, newCoinAmount) {
    if (!userId) {
        console.log('No hay ID de usuario para actualizar monedas');
        return false;
    }

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
    if (!userData || !userData.userId) {
        console.log('No hay usuario logueado para dar recompensa');
        return;
    }

    try {
        // Sumar 10 monedas
        const newCoinAmount = (userData.soulsCoin || 0) + 10;
        
        // Actualizar las monedas en localStorage
        userData.soulsCoin = newCoinAmount;
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Actualizar las monedas en la base de datos
        await updateCoins(userData.userId, newCoinAmount);
    } catch (error) {
        console.error('Error al dar recompensa:', error);
    }
}

export async function fetchTargetCharacter() {
    try {
        const response = await fetch('https://localhost:7003/api/Character');
        if (!response.ok) {
            throw new Error('Error fetching target character');
        }
        const characters = await response.json();
        target = characters[Math.floor(Math.random() * characters.length)];
        console.log("Personaje objetivo:", target);
    } catch (error) {
        console.error('Error:', error);
    }
}

export function compareAttributes(guess, target) {
    const feedback = [];
    const keys = ["name", "gender", "game", "origin", "race", "type"];
    keys.forEach((key) => {
        if (guess[key] === target[key]) {
            feedback.push("green");
        } else {
            feedback.push("red");
        }
    });
    return feedback;
}

export function getTarget() {
    return target;
}

export function incrementAttempts() {
    attempts++;
    return attempts;
}

export function getAttempts() {
    return attempts;
}

export async function showVictoryMessage() {
    const victoryMessage = document.getElementById('victoryMessage');
    if (victoryMessage) {
        // Crear el contenido del mensaje de victoria
        const content = document.createElement('div');
        content.innerHTML = `
            <h2>¡Correcto! Has adivinado al personaje en ${attempts} ${attempts === 1 ? 'intento' : 'intentos'}.</h2>
            <button id="closeVictoryMessage">Cerrar</button>
            ${userData ? '<p>¡Has ganado 10 almas!</p>' : ''}
        `;
        
        // Limpiar el contenido anterior y agregar el nuevo
        victoryMessage.innerHTML = '';
        victoryMessage.appendChild(content);
        
        // Mostrar el mensaje
        victoryMessage.classList.remove('hidden');
        
        // Agregar evento al botón de cerrar
        document.getElementById('closeVictoryMessage').addEventListener('click', () => {
            victoryMessage.classList.add('hidden');
        });

        // Dar la recompensa solo si hay usuario logueado
        if (userData && userData.userId) {
            await giveReward();
        }
    }
}