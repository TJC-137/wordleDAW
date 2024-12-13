document.addEventListener('DOMContentLoaded', function() {
    const data = characters; // characters es la variable definida en characters.js
    const gallery = document.getElementById('gallery');

    data.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.border = "1px solid white";
        galleryItem.style.padding = "10px";
        galleryItem.style.margin = "10px";
        galleryItem.style.borderRadius = "10px";
        galleryItem.style.backgroundColor = "rgba(255, 255, 255, 0.1)";

        const title = document.createElement('h3');
        title.textContent = item.name;
        title.style.color = "#d4af37";

        const game = document.createElement('p');
        game.textContent = `Game: ${item.game}`;

        const origin = document.createElement('p');
        origin.textContent = `Origin: ${item.origin}`;

        const race = document.createElement('p');
        race.textContent = `Race: ${item.race}`;

        const gender = document.createElement('p');
        gender.textContent = `Gender: ${item.gender}`;

        const type = document.createElement('p');
        type.textContent = `Type: ${item.type}`;

        const affiliation = document.createElement('p');
        affiliation.textContent = `Affiliation: ${item.affiliation}`;

        galleryItem.appendChild(title);
        galleryItem.appendChild(game);
        galleryItem.appendChild(origin);
        galleryItem.appendChild(race);
        galleryItem.appendChild(gender);
        galleryItem.appendChild(type);
        galleryItem.appendChild(affiliation);

        gallery.appendChild(galleryItem);
    });
});

