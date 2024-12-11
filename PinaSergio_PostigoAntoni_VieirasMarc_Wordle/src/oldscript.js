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
  {
    name: "Gwyn",
    game: "Dark Souls",
    origin: "Lordran",
    race: "God",
    gender: "Male",
    type: "Boss",
    affiliation: "Lord of Sunlight",
  },
  {
    name: "The Witch of Izalith",
    game: "Dark Souls",
    origin: "Lordran",
    race: "Human",
    gender: "Female",
    type: "Boss",
    affiliation: "Witches of Izalith",
  },
  {
    name: "Nito",
    game: "Dark Souls",
    origin: "The Tomb of the Giants",
    race: "Human/Undead",
    gender: "Male",
    type: "Boss",
    affiliation: "The Gravelord Servants",
  },
  {
    name: "Solaire of Astora",
    game: "Dark Souls",
    origin: "Astora",
    race: "Human",
    gender: "Male",
    type: "NPC",
    affiliation: "Warrior of Sunlight",
  },
  {
    name: "Seigmeyer of Catarina",
    game: "Dark Souls",
    origin: "Catarina",
    race: "Human",
    gender: "Male",
    type: "NPC",
    affiliation: "Knights of Catarina",
  },
  {
    name: "Eileen the Crow",
    game: "Bloodborne",
    origin: "Yharnam",
    race: "Human",
    gender: "Female",
    type: "NPC",
    affiliation: "Crow Hunters",
  },
  {
    name: "Father Gascoigne",
    game: "Bloodborne",
    origin: "Yharnam",
    race: "Human",
    gender: "Male",
    type: "Boss",
    affiliation: "Hunters",
  },
  {
    name: "Vicar Amelia",
    game: "Bloodborne",
    origin: "Yharnam",
    race: "Beast",
    gender: "Female",
    type: "Boss",
    affiliation: "The Healing Church",
  },
  {
    name: "Gehrman",
    game: "Bloodborne",
    origin: "The Dream",
    race: "Human",
    gender: "Male",
    type: "Boss",
    affiliation: "Hunter",
  },
  {
    name: "Micolash",
    game: "Bloodborne",
    origin: "Mergo's Loft",
    race: "Human",
    gender: "Male",
    type: "Boss",
    affiliation: "Mensis",
  },
  {
    name: "Radahn",
    game: "Elden Ring",
    origin: "Caelid",
    race: "Demigod",
    gender: "Male",
    type: "Boss",
    affiliation: "Redmane",
  },
  {
    name: "Rykard",
    game: "Elden Ring",
    origin: "Volcano Manor",
    race: "Demigod",
    gender: "Male",
    type: "Boss",
    affiliation: "Volcano Manor",
  },
  {
    name: "Mohg",
    game: "Elden Ring",
    origin: "Subterranean Shunning-Grounds",
    race: "Demigod",
    gender: "Male",
    type: "Boss",
    affiliation: "Moghwyn Dynasty",
  },
  {
    name: "Godrick the Grafted",
    game: "Elden Ring",
    origin: "Stormveil Castle",
    race: "Human/Demigod",
    gender: "Male",
    type: "Boss",
    affiliation: "House Godrick",
  },
  {
    name: "Fia",
    game: "Elden Ring",
    origin: "Roundtable Hold",
    race: "Human",
    gender: "Female",
    type: "NPC",
    affiliation: "The Deathbed Companion",
  },
  {
    name: "Blaidd",
    game: "Elden Ring",
    origin: "Siofra River",
    race: "Wolfman",
    gender: "Male",
    type: "NPC",
    affiliation: "The Three Fingers",
  },
  {
    name: "Patches",
    game: "Elden Ring",
    origin: "Liurnia of the Lakes",
    race: "Human",
    gender: "Male",
    type: "NPC",
    affiliation: "None",
  },
  {
    name: "Vare",
    game: "Elden Ring",
    origin: "Liurnia of the Lakes",
    race: "Human",
    gender: "Male",
    type: "NPC",
    affiliation: "Moor",
  },
  {
    name: "Yuria of Londor",
    game: "Dark Souls 3",
    origin: "Londor",
    race: "Hollow",
    gender: "Female",
    type: "NPC",
    affiliation: "The Hollowed",
  },
  {
    name: "Ludleth of Courland",
    game: "Dark Souls 3",
    origin: "Courland",
    race: "Hollow",
    gender: "Male",
    type: "NPC",
    affiliation: "The Firekeepers",
  },
  {
    name: "Gael",
    game: "Dark Souls 3",
    origin: "The Painted World of Ariandel",
    race: "Human",
    gender: "Male",
    type: "Boss",
    affiliation: "The Painted World",
  },
  {
    name: "Nameless King",
    game: "Dark Souls 3",
    origin: "Archdragon Peak",
    race: "God/Dragon",
    gender: "Male",
    type: "Boss",
    affiliation: "The Ancient Dragons",
  },
  {
    name: "Pontiff Sulyvahn",
    game: "Dark Souls 3",
    origin: "Irithyll of the Boreal Valley",
    race: "Human",
    gender: "Male",
    type: "Boss",
    affiliation: "Boreal Knights",
  },
  {
    name: "Anri of Astora",
    game: "Dark Souls 3",
    origin: "Astora",
    race: "Human",
    gender: "Female",
    type: "NPC",
    affiliation: "Fledgling Knight",
  },
  {
    name: "Siegward of Catarina",
    game: "Dark Souls 3",
    origin: "Catarina",
    race: "Human",
    gender: "Male",
    type: "NPC",
    affiliation: "Knights of Catarina",
  },
  {
    name: "Shura",
    game: "Sekiro",
    origin: "Ashina Castle",
    race: "Human",
    gender: "Male",
    type: "Boss",
    affiliation: "Ashina",
  },
  {
    name: "Isshin Ashina",
    game: "Sekiro",
    origin: "Ashina Castle",
    race: "Human",
    gender: "Male",
    type: "Boss",
    affiliation: "Ashina Clan",
  },
  {
    name: "Genichiro Ashina",
    game: "Sekiro",
    origin: "Ashina Castle",
    race: "Human",
    gender: "Male",
    type: "Boss",
    affiliation: "Ashina Clan",
  },
  {
    name: "Emma",
    game: "Sekiro",
    origin: "Ashina Castle",
    race: "Human",
    gender: "Female",
    type: "NPC",
    affiliation: "Heir to the Dragon",
  },
  {
    name: "Sekiro",
    game: "Sekiro",
    origin: "Ashina",
    race: "Human",
    gender: "Male",
    type: "NPC",
    affiliation: "Shinobi",
  },
  {
    name: "Bloodborne Hunter",
    game: "Bloodborne",
    origin: "Yharnam",
    race: "Human",
    gender: "Male",
    type: "NPC",
    affiliation: "Hunters",
  },
  {
    name: "Godo",
    game: "Sekiro",
    origin: "Senpou Temple",
    race: "Human",
    gender: "Male",
    type: "NPC",
    affiliation: "Senpou Temple",
  },
  {
    name: "Kuro",
    game: "Sekiro",
    origin: "Ashina Castle",
    race: "Human",
    gender: "Male",
    type: "NPC",
    affiliation: "Shinobi",
  },
  {
    name: "Oda Nobunaga",
    game: "Sekiro",
    origin: "Sengoku Japan",
    race: "Human",
    gender: "Male",
    type: "Boss",
    affiliation: "Warlord",
  },
  {
    name: "Tarnished",
    game: "Elden Ring",
    origin: "Unknown",
    race: "Human",
    gender: "Varies",
    type: "NPC",
    affiliation: "Varies",
  }
];

  
  // Selección aleatoria del personaje objetivo
  let target = characters[Math.floor(Math.random() * characters.length)];
  console.log("Personaje objetivo:", target); // Solo para pruebas
  
  let attempts = 0;
  
  // Función para comparar atributos y dar retroalimentación
  // Función para comparar atributos y dar retroalimentación
function compareAttributes(guess, target) {
  const feedback = [];

  // Comparar cada clave relevante en un orden específico
  const keys = ["name", "gender", "game", "origin", "race", "type"];
  keys.forEach((key) => {
    if (guess[key] === target[key]) {
      feedback.push("green"); // Coincidencia exacta
    //} else if (key === "game" && guess[key] !== target[key]) {
   //   feedback.push("yellow"); // Comparación especial para "game"
    } else {
      feedback.push("red"); // Sin coincidencia
    }
  });

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

// Al cargar la página, preparar el datalist pero mantenerlo vacío inicialmente
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputGuess");
  const datalist = document.getElementById("characterList");

  // Mantener el datalist vacío inicialmente
  datalist.innerHTML = "";

  // Escuchar los cambios en el input
  input.addEventListener("input", () => {
    const inputValue = input.value.trim().toLowerCase();

    // Limpiar las opciones previas
    datalist.innerHTML = "";

    // Mostrar opciones solo si hay al menos un carácter
    if (inputValue.length > 0) {
      const filteredCharacters = characters.filter((char) =>
        char.name.toLowerCase().startsWith(inputValue)
      );

      // Agregar las opciones al datalist
      filteredCharacters.forEach((char) => {
        const option = document.createElement("option");
        option.value = char.name;
        datalist.appendChild(option);
      });
    }
  });
});
