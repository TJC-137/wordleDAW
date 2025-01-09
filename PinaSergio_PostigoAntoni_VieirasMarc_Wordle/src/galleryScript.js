document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Obtener los datos desde la API (suponiendo que ya estás usando la API para obtener estos personajes)
    const response = await fetch("https://localhost:7003/api/Character");

    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    const data = await response.json(); // Asumiendo que la API devuelve un JSON

    const gallery = document.getElementById("gallery"); // Asegúrate de que este ID exista en tu HTML

    data.forEach((item) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.style.border = "1px solid white";
      galleryItem.style.padding = "10px";
      galleryItem.style.margin = "10px";
      galleryItem.style.borderRadius = "10px";
      galleryItem.style.backgroundColor = "rgba(255, 255, 255, 0.1)";

      const title = document.createElement("h3");
      title.textContent = item.name;
      title.style.color = "#d4af37"; // Mantener el color dorado
      title.style.fontSize = "24px"; // Ajusta el tamaño de la fuente (puedes aumentar este valor según sea necesario)

      const game = document.createElement("p");
      game.textContent = `Game: ${item.game}`;

      const origin = document.createElement("p");
      origin.textContent = `Origin: ${item.origin}`;

      const race = document.createElement("p");
      race.textContent = `Race: ${item.race}`;

      const gender = document.createElement("p");
      gender.textContent = `Gender: ${item.gender}`;

      const type = document.createElement("p");
      type.textContent = `Type: ${item.type}`;

      const affiliation = document.createElement("p");
      affiliation.textContent = `Affiliation: ${item.affiliation}`;

      // Comprobar si la URL de la imagen es válida
      if (item.characterImage) {
        const img = document.createElement("img");
        img.src = item.characterImage; // Usar characterImage si está disponible
        img.alt = item.name;

        // Establecer un tamaño uniforme para todas las imágenes
        img.style.width = "200px"; // Ajusta el ancho según tus necesidades
        img.style.height = "300px"; // Ajusta la altura para que todas tengan la misma altura

        // Establecer el estilo CSS para que las imágenes no se deformen
        img.style.objectFit = "cover"; // Esto mantiene la relación de aspecto y recorta la imagen si es necesario

        // Agregar borde dorado y esquinas redondeadas
        img.style.border = "5px solid #d4af37"; // Borde dorado
        img.style.borderRadius = "15px"; // Esquinas redondeadas

        // Agregar la clase para el estilo de imagen (opcional)
        img.classList.add("character-image"); // Añadir clase para el estilo de imagen

        // Agregar la imagen al galleryItem
        galleryItem.appendChild(img);
      }

      // Agregar los detalles del personaje
      galleryItem.appendChild(title);
      galleryItem.appendChild(game);
      galleryItem.appendChild(origin);
      galleryItem.appendChild(race);
      galleryItem.appendChild(gender);
      galleryItem.appendChild(type);
      galleryItem.appendChild(affiliation);

      // Agregar el galleryItem al contenedor de la galería
      gallery.appendChild(galleryItem);
    });
  } catch (error) {
    console.error("Hubo un problema con la solicitud fetch:", error);
    // Manejar el error
  }
});
