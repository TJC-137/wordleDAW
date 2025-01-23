// Función para obtener la ruta base según la página actual
function getBasePath() {
    // Si estamos en una página dentro de src/html, necesitamos subir dos niveles
    if (window.location.pathname.includes('/src/html/')) {
        return '../../';
    }
    // Si estamos en la página principal
    return './';
}

// Función para insertar el menú de login
function insertLoginMenu() {
    // Verificar si ya existe un menú de login en el HTML
    const existingLoginContainer = document.querySelector('.login-container');
    
    if (!existingLoginContainer) {
        const basePath = getBasePath();
        // Si no existe, crear e insertar el menú
        const menuHTML = `
            <div class="login-container">
                <span class="user-name"></span>
                <img src="${basePath}public/icons/usuario.png" alt="Usuario">
                <div id="loginForm" class="hidden">
                    <h2>Iniciar Sesión</h2>
                    <form>
                        <div class="form-group">
                            <label for="email">Correo electrónico:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña:</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button type="submit" class="form-button">Iniciar sesión</button>
                    </form>
                    <div id="loginMessage" class="message"></div>
                    <div id="userInfo"></div>
                    <button onclick="location.href='${basePath}src/html/usersForm.html'" class="form-button">Registrarse</button>
                    <button id="logoutButton" class="form-button">Cerrar sesión</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', menuHTML);
    }

    // Obtener referencias a los elementos
    const loginContainer = document.querySelector('.login-container');
    const loginForm = document.querySelector('#loginForm');
    const loginIcon = loginContainer.querySelector('img');
    const userNameSpan = loginContainer.querySelector('.user-name');

    // Actualizar el nombre de usuario si hay datos en localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userNameSpan.textContent = userData.userName;
        userNameSpan.style.display = 'block';
        const logoutButton = loginContainer.querySelector('#logoutButton');
        if (logoutButton) {
            logoutButton.style.display = 'block';
        }
        if (loginForm.querySelector('form')) {
            loginForm.querySelector('form').style.display = 'none';
        }
    } else {
        userNameSpan.style.display = 'none';
    }

    // Manejar el clic en el contenedor de login
    loginContainer.addEventListener('click', (event) => {
        if (!event.target.closest('#loginForm')) {
            const isExpanded = loginContainer.classList.contains('expanded');
            loginContainer.classList.toggle('expanded');
            loginForm.classList.toggle('hidden', isExpanded);
        }
    });

    // Evitar que el formulario se cierre al hacer clic dentro de él
    loginForm.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Cerrar el formulario al hacer clic fuera
    document.addEventListener('click', (event) => {
        if (!loginContainer.contains(event.target)) {
            loginContainer.classList.remove('expanded');
            loginForm.classList.add('hidden');
        }
    });
}

// Insertar el menú cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    insertLoginMenu();
});