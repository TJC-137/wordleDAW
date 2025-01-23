document.addEventListener('DOMContentLoaded', async function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('loginMessage');
    const loginIcon = document.querySelector('.login-container img');
    const logoutButton = document.getElementById('logoutButton');
    const loginContainer = document.querySelector('.login-container');

    // Ocultar el botón de logout inicialmente
    logoutButton.style.display = 'none';

    if (!loginForm || !emailInput || !passwordInput || !loginMessage) {
        console.error('No se encontraron elementos necesarios del formulario');
        return;
    }

    // Función para actualizar la UI basada en el estado de login
    function updateUIFromLoginState() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            console.log('Usuario encontrado en localStorage:', userData.userName);
            loginIcon.style.display = 'none';
            
            // Eliminar nombre de usuario existente si lo hay
            const existingUserName = loginContainer.querySelector('.user-name');
            if (existingUserName) {
                existingUserName.remove();
            }
            
            // Crear y mostrar el nombre de usuario
            const userNameElement = document.createElement('span');
            userNameElement.textContent = userData.userName;
            userNameElement.className = 'user-name';
            loginContainer.insertBefore(userNameElement, loginIcon);
            
            // Ocultar el formulario y mostrar el botón de logout
            if (document.querySelector('form')) {
                document.querySelector('form').style.display = 'none';
            }
            logoutButton.style.display = 'block';
        }
    }

    // Verificar estado de login al cargar la página
    updateUIFromLoginState();

    // Manejar la visibilidad del nombre de usuario cuando el menú se despliega/cierra
    loginContainer.addEventListener('click', function() {
        const userNameElement = loginContainer.querySelector('.user-name');
        if (userNameElement) {
            if (loginContainer.classList.contains('expanded')) {
                userNameElement.style.display = 'none';
            } else {
                userNameElement.style.display = 'block';
            }
        }
    });

    async function encryptPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // Función para manejar el logout
    function handleLogout() {
        console.log('Cerrando sesión...');
        
        // Limpiar localStorage
        localStorage.removeItem('userData');
        
        // Mostrar mensaje de cierre de sesión
        loginMessage.textContent = 'Sesión cerrada correctamente';
        loginMessage.className = 'message success';
        
        // Recargar la página después de un breve delay para mostrar el mensaje
        setTimeout(() => {
            location.reload();
        }, 1000);

        console.log('Sesión cerrada exitosamente');
    }

    // Agregar evento al botón de logout
    logoutButton.addEventListener('click', handleLogout);

    try {
        const testResponse = await fetch('https://localhost:7249/api/User');
        if (!testResponse.ok) {
            throw new Error(`Error al conectar con la API: ${testResponse.status}`);
        }
        const testData = await testResponse.json();
        console.log('Conexión con API exitosa:', testData);
    } catch (error) {
        console.error('Error al probar la conexión con la API:', error);
        loginMessage.textContent = 'Error de conexión con el servidor. Verifica que el servidor esté funcionando.';
        loginMessage.classList.add('error');
        return;
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        console.log('Intentando login con email:', email);

        loginMessage.textContent = '';
        loginMessage.className = 'message';

        if (!email || !password) {
            loginMessage.textContent = 'Por favor, completa todos los campos.';
            loginMessage.classList.add('error');
            return;
        }

        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Iniciando sesión...';

        try {
            const getUsersResponse = await fetch('https://localhost:7249/api/User');
            if (!getUsersResponse.ok) {
                throw new Error('Error al obtener datos de usuarios');
            }

            const users = await getUsersResponse.json();
            const user = users.find(u => u.email === email);
            
            if (user) {
                console.log('Usuario encontrado:', user);
                
                let isValidPassword = password === user.password;
                
                if (!isValidPassword) {
                    const hashedPassword = await encryptPassword(password);
                    isValidPassword = hashedPassword.substring(0, user.password.length) === user.password;
                }

                if (isValidPassword) {
                    // Guardar datos del usuario en localStorage
                    localStorage.setItem('userData', JSON.stringify({
                        userName: user.userName,
                        email: user.email
                    }));

                    // Ocultar la imagen y mostrar el nombre del usuario
                    loginIcon.style.display = 'none';
                    const userNameElement = document.createElement('span');
                    userNameElement.textContent = user.userName;
                    userNameElement.className = 'user-name';
                    loginContainer.insertBefore(userNameElement, loginIcon);
                    
                    // Ocultar el formulario de login
                    document.querySelector('form').style.display = 'none';
                    
                    // Mostrar el botón de logout
                    logoutButton.style.display = 'block';
                    
                    // Cerrar el menú desplegable
                    loginContainer.classList.remove('expanded');
                    loginForm.classList.add('hidden');
                    
                    loginMessage.textContent = `¡Bienvenido ${user.userName}!`;
                    loginMessage.classList.add('success');

                    console.log('Login exitoso para el usuario:', user.userName);
                } else {
                    loginMessage.textContent = 'Usuario o contraseña incorrectos.';
                    loginMessage.classList.add('error');
                }
            } else {
                console.log('No se encontró usuario con el email:', email);
                loginMessage.textContent = 'Usuario no encontrado.';
                loginMessage.classList.add('error');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            loginMessage.textContent = error.message || 'Error al conectar con el servidor. Por favor, intenta más tarde.';
            loginMessage.classList.add('error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});