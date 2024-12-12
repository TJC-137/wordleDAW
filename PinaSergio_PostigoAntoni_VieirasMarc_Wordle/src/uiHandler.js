import { compareAttributes, getTarget, incrementAttempts, getAttempts } from './gameLogic.js';
import { characters } from './characters.js';

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputGuess");
  const datalist = document.getElementById("characterList");

  // Escuchar los cambios en el input
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
          <img src="${guess.image}" alt="${guess.name}" class="character-icon">
          <span class="${feedback[0]}">${guess.name}</span>
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
      }, 10); // Un pequeño retraso para que la animación funcione correctamente
  
      if (feedback.every((color) => color === "green")) {
        // Mostrar mensaje de victoria
        const victoryMessage = document.getElementById("victoryMessage");
        const attemptsCount = document.getElementById("attemptsCount");
        attemptsCount.textContent = getAttempts();
        victoryMessage.classList.remove("hidden");
  
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
