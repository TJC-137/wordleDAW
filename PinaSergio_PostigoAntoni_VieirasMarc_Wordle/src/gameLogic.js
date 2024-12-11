import { characters } from './characters.js';

let target = characters[Math.floor(Math.random() * characters.length)];
console.log("Personaje objetivo:", target); // Solo para pruebas

let attempts = 0;

export function compareAttributes(guess, target) {
  const feedback = [];
  const keys = ["name", "gender", "game", "origin", "race", "type"];
  keys.forEach((key) => {
    if (guess[key] === target[key]) {
      feedback.push("green"); // Coincidencia exacta
    } else {
      feedback.push("red"); // Sin coincidencia
    }
  });
  return feedback;
}

export function getTarget() {
  return target;
}

export function incrementAttempts() {
  attempts++;
}

export function getAttempts() {
  return attempts;
}
