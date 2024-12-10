// app.js
const characters = [
    {
      name: "Artorias the Abysswalker",
      game: "Dark Souls",
      origin: "Lordran",
      race: "Human",
      gender: "Male",
      affiliation: "Knights of Gwyn",
      type: "Boss",
      additional_info: {
        difficulty: "High",
        weapon: "Greatsword",
        notable_features: ["Corrupted by the Abyss"]
      }
    },
    {
      name: "Lady Maria of the Astral Clocktower",
      game: "Bloodborne",
      origin: "Cainhurst",
      race: "Vileblood",
      gender: "Female",
      affiliation: "Hunters of Byrgenwerth",
      type: "Boss",
      additional_info: {
        difficulty: "High",
        weapon: "Rakuyo",
        notable_features: ["Fire and blood magic"]
      }
    },
    {
      name: "Maliketh, the Black Blade",
      game: "Elden Ring",
      origin: "Farum Azula",
      race: "Beastman",
      gender: "Male",
      affiliation: "Golden Order",
      type: "Boss",
      additional_info: {
        difficulty: "Very High",
        weapon: "Black Blade",
        notable_features: ["Rune of Death wielder"]
      }
    },
    {
      name: "Genichiro Ashina",
      game: "Sekiro: Shadows Die Twice",
      origin: "Ashina",
      race: "Human",
      gender: "Male",
      affiliation: "Ashina Clan",
      type: "Boss",
      additional_info: {
        difficulty: "High",
        weapon: "Mortal Blade",
        notable_features: ["Lightning attacks"]
      }
    },
    {
      name: "Aldia, Scholar of the First Sin",
      game: "Dark Souls 2",
      origin: "Drangleic",
      race: "Human",
      gender: "Male",
      affiliation: "Independent",
      type: "Boss",
      additional_info: {
        difficulty: "Moderate",
        weapon: "Magic",
        notable_features: ["Immortal", "Surrounded by fire"]
      }
    }
  ];
  
  let currentCharacter = characters[Math.floor(Math.random() * characters.length)];
  let attempts = 0;
  
  document.getElementById('submitGuess').addEventListener('click', () => {
    const inputGuess = document.getElementById('inputGuess').value.trim();
    if (inputGuess === "") return;
  
    attempts++;
    const resultDiv = document.getElementById('result');
    const attemptsDiv = document.getElementById('attempts');
  
    if (inputGuess.toLowerCase() === currentCharacter.name.toLowerCase()) {
      resultDiv.textContent = `¡Correcto! Has adivinado el personaje: ${currentCharacter.name}`;
      resultDiv.style.color = 'green';
      document.getElementById('submitGuess').disabled = true;
    } else {
      resultDiv.textContent = `Intento incorrecto. Intenta de nuevo.`;
      resultDiv.style.color = 'red';
  
      const attemptDiv = document.createElement('div');
      attemptDiv.classList.add('attempt');
      attemptDiv.textContent = `Intento ${attempts}: ${inputGuess}`;
      attemptsDiv.appendChild(attemptDiv);
    }
  
    document.getElementById('inputGuess').value = '';
  });
  
  // Función para reiniciar el juego
  function resetGame() {
    currentCharacter = characters[Math.floor(Math.random() * characters.length)];
    attempts = 0;
    document.getElementById('inputGuess').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('attempts').innerHTML = '';
    document.getElementById('submitGuess').disabled = false;
  }
  