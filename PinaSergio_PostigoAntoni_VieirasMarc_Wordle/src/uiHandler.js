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

    // Verificar si la respuesta contiene datos
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

  // Espera a que se carguen los personajes y el objetivo
  await fetchTargetCharacter();
  const characters = await fetchCharacters();

  // Ahora puedes manejar la lógica de la UI
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

        <div class="${feedback[1]}">${guess.gender}</div>
        <div class="${feedback[2]}">${guess.game}</div>
        <div class="${feedback[3]}">${guess.origin}</div>
        <div class="${feedback[4]}">${guess.race}</div>
        <div class="${feedback[5]}">${guess.type}</div>
      `;

      // Insertar el nuevo intento en la parte superior
      pistasDiv.insertBefore(row, pistasDiv.firstChild);

      // Aplicar la animación fade-in al último intento
      setTimeout(() => {
        row.classList.add("fade-in");
      }, 1); // Un pequeño retraso para que la animación funcione correctamente

      if (feedback.every((color) => color === "green")) {
        // Mostrar mensaje de victoria
        const victoryMessage = document.getElementById("victoryMessage");
        const attemptsCount = document.getElementById("attemptsCount");
        attemptsCount.textContent = getAttempts();
        victoryMessage.classList.remove("hidden");

        // Obtener el usuario desde localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData) {
          // Sumar 10 monedas
          const newCoinAmount = (userData.soulsCoin || 0) + 10;

          // Actualizar las monedas en localStorage
          userData.soulsCoin = newCoinAmount;
          localStorage.setItem('userData', JSON.stringify(userData));

          // También actualizamos las monedas en la base de datos
          updateCoins(userData.userId, newCoinAmount);
        } else {
          console.error("No se encontró el usuario en localStorage");
        }

        // Deshabilitar el botón después de ganar
        document.getElementById("submitGuess").disabled = true;
        document.getElementById("giveHint").disabled = true;
      }
    } else {
      alert("Personaje no encontrado. ¡Intenta de nuevo!");
    }

    document.getElementById("inputGuess").value = "";
  });

  // Cerrar el mensaje de victoria
  document.getElementById("closeVictoryMessage").addEventListener("click", () => {
    const victoryMessage = document.getElementById("victoryMessage");
    victoryMessage.classList.add("hidden");
  });

  // Botón de pista adicional
  document.getElementById("giveHint").addEventListener("click", () => {
    const hints = [
      `Pertenece al juego: ${getTarget().game}`,
      `Afiliación: ${getTarget().affiliation}`,
      `Es un: ${getTarget().type}`,
    ];
    document.getElementById("hint").textContent = hints[getAttempts() % hints.length];
  });
});

// Función para reiniciar el juego
function resetGame() {
  document.getElementById("inputGuess").value = '';
  document.getElementById("submitGuess").disabled = false;
  document.getElementById("giveHint").disabled = false;
  document.getElementById("pistas").innerHTML = '';
  // Restablecer intentos y cualquier otro estado necesario
}
