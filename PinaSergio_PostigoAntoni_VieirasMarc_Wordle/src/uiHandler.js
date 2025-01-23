import { fetchTargetCharacter, compareAttributes, getTarget, incrementAttempts, getAttempts } from './gameLogic.js';

// Recuperar el usuario de localStorage
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
    } else {
      throw new Error('Respuesta inesperada de la API');
    }

  } catch (error) {
    console.error('Error al actualizar las monedas:', error);
  }
}

async function fetchCharacters() {
  try {
    const response = await fetch('https://localhost:7003/api/Character');
    if (!response.ok) {
      throw new Error('Error fetching characters');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("inputGuess");
  const datalist = document.getElementById("characterList");

  await fetchTargetCharacter();
  const characters = await fetchCharacters();

  input.addEventListener("input", () => {
    const inputValue = input.value.trim().toLowerCase();
    datalist.innerHTML = "";

    if (inputValue.length > 0) {
      const filteredCharacters = characters.filter((char) =>
        char.name.toLowerCase().startsWith(inputValue)
      );

      filteredCharacters.forEach((char) => {
        const option = document.createElement("option");
        option.value = char.name;
        datalist.appendChild(option);
      });
    }
  });

  document.getElementById("submitGuess").addEventListener("click", () => {
    const input = document.getElementById("inputGuess").value.trim();
    if (!input) return;

    const guess = characters.find((char) => char.name.toLowerCase() === input.toLowerCase());
    const pistasDiv = document.getElementById("pistas");

    if (guess) {
      incrementAttempts();
      const feedback = compareAttributes(guess, getTarget());

      const row = document.createElement("div");
      row.classList.add("pista");
      row.innerHTML = `
        <div class="pista-item">
          <img src="${guess.characterIcon}" alt="${guess.name}" class="character-icon">
        </div>
        <div class="${feedback[1]} text-white">${guess.gender}</div>
        <div class="${feedback[2]} text-white">${guess.game}</div>
        <div class="${feedback[3]} text-white">${guess.origin}</div>
        <div class="${feedback[4]} text-white">${guess.race}</div>
        <div class="${feedback[5]} text-white">${guess.type}</div>
      `;

      pistasDiv.insertBefore(row, pistasDiv.firstChild);

      setTimeout(() => {
        row.classList.add("fade-in");
      }, 1);

      if (feedback.every((color) => color === "green")) {
        const victoryMessage = document.getElementById("victoryMessage");
        const messageContent = document.createElement('div');
        messageContent.classList.add('text-white'); // Añadir clase text-white al contenedor
        messageContent.innerHTML = `
          <h2 style="color: white !important;">¡Correcto! Has adivinado al personaje en ${getAttempts()} ${getAttempts() === 1 ? 'intento' : 'intentos'}.</h2>
          <button id="closeVictoryMessage" class="close-button text-white">Cerrar</button>
          <p style="color: white !important;">¡Has ganado 10 almas!</p>
        `;
        
        // Limpiar contenido anterior y agregar el nuevo
        victoryMessage.innerHTML = '';
        victoryMessage.appendChild(messageContent);
        victoryMessage.classList.remove("hidden");

        // Agregar el evento de cierre después de crear el botón
        document.getElementById("closeVictoryMessage").addEventListener("click", () => {
          victoryMessage.classList.add("hidden");
          // Recargar la página después de cerrar el mensaje
          location.reload();
        });

        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData) {
          const newCoinAmount = (userData.soulsCoin || 0) + 10;
          userData.soulsCoin = newCoinAmount;
          localStorage.setItem('userData', JSON.stringify(userData));
          updateCoins(userData.userId, newCoinAmount);
        } else {
          console.error("No se encontró el usuario en localStorage");
        }

        document.getElementById("submitGuess").disabled = true;
        document.getElementById("giveHint").disabled = true;
      }
    } else {
      alert("Personaje no encontrado. ¡Intenta de nuevo!");
    }

    document.getElementById("inputGuess").value = "";
  });

  document.getElementById("giveHint").addEventListener("click", () => {
    const hints = [
      `Pertenece al juego: ${getTarget().game}`,
      `Afiliación: ${getTarget().affiliation}`,
      `Es un: ${getTarget().type}`,
    ];
    document.getElementById("hint").textContent = hints[getAttempts() % hints.length];
  });
});

function resetGame() {
  document.getElementById("inputGuess").value = '';
  document.getElementById("submitGuess").disabled = false;
  document.getElementById("giveHint").disabled = false;
  document.getElementById("pistas").innerHTML = '';
}