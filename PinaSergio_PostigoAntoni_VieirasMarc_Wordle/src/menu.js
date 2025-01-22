// Función para insertar el menú de login
function insertLoginMenu() {
    const menuHTML = `
        <div class="login-container">
            <img src="./public/icons/usuario.png" alt="Usuario">
            <form id="loginForm" class="hidden">
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="password" placeholder="Contraseña" required>
                <button type="submit">Iniciar sesión</button>
                <div id="loginMessage" class="message"></div>
            </form>
            <button id="logoutButton" style="display: none;">Cerrar sesión</button>
        </div>
    `;

    // Insertar el menú al principio del body
    document.body.insertAdjacentHTML('afterbegin', menuHTML);

    // Cargar y ejecutar el código de login.js
    const loginScript = document.createElement('script');
    loginScript.src = './login.js';
    document.head.appendChild(loginScript);

    // Agregar el comportamiento de toggle al icono de usuario
    const loginContainer = document.querySelector('.login-container');
    const loginIcon = loginContainer.querySelector('img');
    
    loginIcon.addEventListener('click', function() {
        loginContainer.classList.toggle('expanded');
        const form = loginContainer.querySelector('form');
        if (form) {
            form.classList.toggle('hidden');
        }
    });
}

// Insertar el menú cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    insertLoginMenu();
});