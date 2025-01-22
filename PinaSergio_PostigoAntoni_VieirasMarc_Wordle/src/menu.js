// Función para insertar el menú de login
function insertLoginMenu() {
    // Verificar si ya existe un menú de login en el HTML
    const existingLoginContainer = document.querySelector('.login-container');
    
    if (!existingLoginContainer) {
        // Si no existe, crear e insertar el menú
        const menuHTML = `
            <div class="login-container">
                <img src="../../public/icons/usuario.png" alt="Usuario">
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
                    <button onclick="location.href='./usersForm.html'" class="form-button">Registrarse</button>
                    <button id="logoutButton" class="form-button">Cerrar sesión</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', menuHTML);
    }

    // Obtener referencias a los elementos (ya sea los existentes o los recién creados)
    const loginContainer = document.querySelector('.login-container');
    const loginForm = document.querySelector('#loginForm');
    const loginIcon = loginContainer.querySelector('img');

    // Manejar el clic en el icono de usuario
    loginIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        const isExpanded = loginContainer.classList.contains('expanded');
        loginContainer.classList.toggle('expanded');
        loginForm.classList.toggle('hidden', isExpanded);
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