document.addEventListener('DOMContentLoaded', async function () {
    const rankingTableBody = document.getElementById('rankingTable').querySelector('tbody');
    const loginMessage = document.getElementById('loginMessage');

    async function encryptPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    try {
        // Conexión con la API
        const response = await fetch('https://localhost:7249/api/User');
        if (!response.ok) {
            throw new Error(`Error al conectar con la API: ${response.status}`);
        }

        const users = await response.json();
        console.log('Datos de la API:', users);

        // Ordenar los usuarios por monedas (`soulsCoin`) en orden descendente
        const topUsers = users
            .filter(user => typeof user.soulsCoin === 'number') // Filtrar por usuarios válidos
            .sort((a, b) => b.soulsCoin - a.soulsCoin)
            .slice(0, 10); // Obtener los 10 mejores

        // Mostrar los datos en la tabla
        if (topUsers.length === 0) {
            rankingTableBody.innerHTML = `<tr><td colspan="3">No hay datos disponibles para el ranking.</td></tr>`;
            return;
        }

        topUsers.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.userName}</td>
                <td>${user.soulsCoin}</td>
            `;
            rankingTableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error al cargar el ranking:', error);
        rankingTableBody.innerHTML = `<tr><td colspan="3">Error al cargar los datos.</td></tr>`;
        if (loginMessage) {
            loginMessage.textContent = 'Error de conexión con el servidor.';
            loginMessage.classList.add('error');
        }
    }
});
