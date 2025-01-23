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
        
        // Mostrar mensaje de recompensa en el mensaje de victoria
        const victoryMessageContent = document.querySelector('#victoryMessage .message-content');
        if (victoryMessageContent) {
            const rewardMessage = document.createElement('p');
            rewardMessage.textContent = '¡Has ganado 10 almas!';
            victoryMessageContent.appendChild(rewardMessage);
        }
    } catch (error) {
        console.error('Error al dar recompensa:', error);
    }
}

async function startGame() {
    try {
        const response = await fetch("https://localhost:7003/api/Character");
        if (!response.ok) {
            throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        const randomCharacter = data[Math.floor(Math.random() * data.length)];
        
        console.log('Personaje a adivinar:', randomCharacter.name);

        const gameContainer = document.getElementById('game-container');
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        const imageElement = document.createElement('img');
        imageElement.src = randomCharacter.characterImage;
        imageElement.alt = 'Guess the character';
        imageElement.className = 'image-part';

        gameContainer.innerHTML = '';
        imageContainer.appendChild(imageElement);
        gameContainer.appendChild(imageContainer);

        const input = document.getElementById('inputGuess');
        const datalist = document.getElementById('characterList');
        const submitButton = document.getElementById('submitGuess');
        const victoryMessage = document.getElementById('victoryMessage');
        const restartButton = document.getElementById('restartButton');
        const changeImagePartButton = document.getElementById('changeImagePart');
        const remainingAttemptsElement = document.getElementById('remainingAttempts');
        let attempts = 0;
        let maxAttempts = 2;

        const imageParts = [
            { clip: 'polygon(0% 0%, 25% 0%, 25% 25%, 0% 25%)' },
            { clip: 'polygon(25% 0%, 50% 0%, 50% 25%, 25% 25%)' },
            { clip: 'polygon(50% 0%, 75% 0%, 75% 25%, 50% 25%)' },
            { clip: 'polygon(75% 0%, 100% 0%, 100% 25%, 75% 25%)' },
            { clip: 'polygon(0% 25%, 25% 25%, 25% 50%, 0% 50%)' },
            { clip: 'polygon(25% 25%, 50% 25%, 50% 50%, 25% 50%)' }
        ];

        let currentPart = 0;

        function changeImagePart() {
            currentPart = (currentPart + 1) % imageParts.length;
            const part = imageParts[currentPart];
            imageElement.style.clipPath = part.clip;
        }

        changeImagePartButton.addEventListener('click', changeImagePart);

        // Actualizar datalist con los nombres de los personajes
        function updateDatalist(inputValue = '') {
            datalist.innerHTML = '';
            const filteredCharacters = data
                .filter(character => 
                    character.name.toLowerCase().startsWith(inputValue.toLowerCase())
                );

            filteredCharacters.forEach(character => {
                const option = document.createElement('option');
                option.value = character.name;
                datalist.appendChild(option);
            });
        }

        // Inicializar datalist con todos los personajes
        updateDatalist();

        // Actualizar datalist cuando el usuario escribe
        input.addEventListener('input', (e) => {
            updateDatalist(e.target.value);
        });

        submitButton.addEventListener('click', async () => {
            attempts++;
            const remainingAttempts = maxAttempts - attempts;
            remainingAttemptsElement.textContent = remainingAttempts;

            const guess = input.value.trim().toLowerCase();
            if (guess === randomCharacter.name.toLowerCase()) {
                const attemptsCount = document.getElementById('attemptsCount');
                if (attemptsCount) {
                    attemptsCount.textContent = attempts;
                }
                victoryMessage.classList.remove('hidden');
                input.style.display = 'none';
                submitButton.style.display = 'none';
                restartButton.classList.remove('hidden');
                changeImagePartButton.classList.add('hidden');
                await giveReward();
            } else {
                if (remainingAttempts > 0) {
                    alert('Incorrecto. Intenta de nuevo.');
                    changeImagePartButton.classList.remove('hidden');
                } else {
                    alert('Has alcanzado el número máximo de intentos. El juego se reiniciará.');
                    location.reload();
                }
            }
            input.value = '';
        });

        document.getElementById('closeVictoryMessage').addEventListener('click', () => {
            location.reload();
        });

        restartButton.addEventListener('click', () => {
            location.reload();
        });
    } catch (error) {
        console.error("Hubo un problema con la solicitud fetch:", error);
    }
}

window.addEventListener('DOMContentLoaded', startGame);