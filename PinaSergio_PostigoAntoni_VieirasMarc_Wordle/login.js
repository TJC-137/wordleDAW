document.addEventListener('DOMContentLoaded', async function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('loginMessage');
    const loginIcon = document.querySelector('.login-container img');
    const loginContainer = document.querySelector('.login-container');
    const logoutButton = document.getElementById('logoutButton');

    if (!loginForm || !emailInput || !passwordInput || !loginMessage || !loginContainer || !loginIcon) {
        console.error('No se encontraron elementos necesarios del formulario');
        return;
    }

    // Función para actualizar la UI basada en el estado del login
    function updateUIFromLoginState() {
        const userDataStr = localStorage.getItem('userData');
        
        // Si no hay usuario logueado, ocultar el botón de cerrar sesión
        if (!userDataStr) {
            if (logoutButton) {
                logoutButton.style.display = 'none';
            }
            loginIcon.style.display = 'block';
            return;
        }

        // Si hay usuario logueado
        const userData = JSON.parse(userDataStr);
        console.log('Datos del usuario:', userData);
        
        loginIcon.style.display = 'none';
        
        const existingUserName = loginContainer.querySelector('.user-name');
        if (existingUserName) {
            existingUserName.remove();
        }
        
        const userNameElement = document.createElement('span');
        userNameElement.textContent = `${userData.userName} (${userData.soulsCoin} 🪙)`;
        userNameElement.className = 'user-name';
        loginContainer.insertBefore(userNameElement, loginIcon);
        
        loginForm.classList.add('hidden');
        if (logoutButton) {
            logoutButton.style.display = 'block';
        }
    }

    updateUIFromLoginState();

    // Función para encriptar contraseña usando Web Crypto API
    async function encryptPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    function handleLogout() {
        localStorage.removeItem('userData');
        loginMessage.textContent = 'Sesión cerrada correctamente';
        loginMessage.className = 'message success';
        setTimeout(() => location.reload(), 1000);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
        // Ocultar el botón de cerrar sesión inicialmente si no hay sesión
        if (!localStorage.getItem('userData')) {
            logoutButton.style.display = 'none';
        }
    }

    // Probar la conexión con la API al cargar
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

        // Limpiar mensajes anteriores
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
            // Obtener todos los usuarios
            const getUsersResponse = await fetch('https://localhost:7249/api/User');
            if (!getUsersResponse.ok) {
                throw new Error('Error al obtener datos de usuarios');
            }

            const users = await getUsersResponse.json();
            console.log('Usuarios disponibles:', users);

            // Buscar el usuario que coincida con email
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (user) {
                console.log('Usuario encontrado:', user);
                
                // Intentar primero con contraseña sin encriptar
                let isValidPassword = password === user.password;
                
                // Si no coincide, intentar con contraseña encriptada
                if (!isValidPassword) {
                    const hashedPassword = await encryptPassword(password);
                    isValidPassword = hashedPassword.substring(0, user.password.length) === user.password;
                }

                if (isValidPassword) {
                    const userData = {
                        userId: user.userId,
                        userName: user.userName,
                        email: user.email,
                        soulsCoin: user.soulsCoin || 0
                    };
                    
                    console.log('Guardando datos de usuario:', userData);
                    localStorage.setItem('userData', JSON.stringify(userData));
                    
                    loginMessage.textContent = `¡Bienvenido ${user.userName}!`;
                    loginMessage.classList.add('success');
                    
                    // Actualizar UI
                    updateUIFromLoginState();
                    loginContainer.classList.remove('expanded');
                    loginForm.classList.add('hidden');
                    
                    console.log('Login exitoso. Datos del usuario:', {
                        nombre: user.userName,
                        rango: user.rankName,
                        monedas: user.soulsCoin
                    });
                } else {
                    loginMessage.textContent = 'Contraseña incorrecta.';
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

    // Manejar el clic en el icono de login
    loginIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        loginContainer.classList.toggle('expanded');
        if (loginContainer.classList.contains('expanded')) {
            loginForm.classList.remove('hidden');
            if (logoutButton) {
                logoutButton.style.display = 'none';
            }
            loginIcon.style.display = 'none';
        } else {
            loginForm.classList.add('hidden');
            const userDataStr = localStorage.getItem('userData');
            if (userDataStr && logoutButton) {
                logoutButton.style.display = 'block';
            }
        }
    });

    // Evitar que los clics dentro del formulario cierren el contenedor
    loginForm.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Cerrar el formulario cuando se hace clic fuera
    document.addEventListener('click', function(e) {
        if (!loginContainer.contains(e.target)) {
            loginContainer.classList.remove('expanded');
            loginForm.classList.add('hidden');
            const userDataStr = localStorage.getItem('userData');
            if (userDataStr && logoutButton) {
                logoutButton.style.display = 'block';
            }
        }
    });
});