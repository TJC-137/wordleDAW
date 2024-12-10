// Lista de personajes
const characters = [
    {
      name: "Artorias",
      game: "Dark Souls",
      origin: "Lordran",
      race: "Human",
      gender: "Male",
      type: "Boss",
      affiliation: "Knights of Gwyn",
    },
    {
      name: "Lady Maria",
      game: "Bloodborne",
      origin: "Cainhurst",
      race: "Vileblood",
      gender: "Female",
      type: "Boss",
      affiliation: "Hunters of Byrgenwerth",
    },
    {
      name: "Maliketh",
      game: "Elden Ring",
      origin: "Farum Azula",
      race: "Beastman",
      gender: "Male",
      type: "Boss",
      affiliation: "Golden Order",
    },
  ];
  
  // Selección aleatoria del personaje objetivo
  let target = characters[Math.floor(Math.random() * characters.length)];
  console.log("Personaje objetivo:", target); // Solo para pruebas
  
  let attempts = 0;
  
  // Función para comparar atributos y dar retroalimentación
  function compareAttributes(guess, target) {
    const feedback = [];
    for (let key in target) {
      if (guess[key]) {
        if (guess[key] === target[key]) {
          feedback.push("green");
        } else if (key === "game" && guess[key] !== target[key]) {
          feedback.push("yellow");
        } else {
          feedback.push("red");
        }
      }
    }
    return feedback;
  }
  
  // Al hacer un intento
  document.getElementById("submitGuess").addEventListener("click", () => {
    const input = document.getElementById("inputGuess").value.trim();
    if (!input) return;
  
    const guess = characters.find((char) => char.name.toLowerCase() === input.toLowerCase());
    const pistasDiv = document.getElementById("pistas");
  
    if (guess) {
      attempts++;
      const feedback = compareAttributes(guess, target);
  
      const row = document.createElement("div");
      row.classList.add("pista");
      row.innerHTML = `
        <div class="${feedback[0]}">${guess.name}</div>
        <div class="${feedback[1]}">${guess.gender}</div>
        <div class="${feedback[2]}">${guess.game}</div>
        <div class="${feedback[3]}">${guess.origin}</div>
        <div class="${feedback[4]}">${guess.race}</div>
        <div class="${feedback[5]}">${guess.type}</div>
      `;
      pistasDiv.appendChild(row);
  
      if (feedback.every((color) => color === "green")) {
        alert(`¡Correcto! Has adivinado al personaje en ${attempts} intentos.`);
        document.getElementById("submitGuess").disabled = true;
      }
    } else {
      alert("Personaje no encontrado. ¡Intenta de nuevo!");
    }
  
    document.getElementById("inputGuess").value = "";
  });
  
  // Botón de pista adicional
  document.getElementById("giveHint").addEventListener("click", () => {
    const hints = [
      `Pertenece al juego: ${target.game}`,
      `Afiliación: ${target.affiliation}`,
      `Es un: ${target.type}`,
    ];
    document.getElementById("hint").textContent = hints[attempts % hints.length];
  });