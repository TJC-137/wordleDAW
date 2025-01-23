document.addEventListener('DOMContentLoaded', async function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('loginMessage');
    const loginIcon = document.querySelector('.login-container img');
    const logoutButton = document.getElementById('logoutButton');
    const loginContainer = document.querySelector('.login-container');

    logoutButton.style.display = 'none';

    function updateUIFromLoginState() {
        const userDataStr = localStorage.getItem('userData');
        if (!userDataStr) return;

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
        
        if (document.querySelector('form')) {
            document.querySelector('form').style.display = 'none';
        }
        logoutButton.style.display = 'block';
    }

    updateUIFromLoginState();

    async function encryptPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    function handleLogout() {
        localStorage.removeItem('userData');
        loginMessage.textContent = 'Sesión cerrada correctamente';
        loginMessage.className = 'message success';
        setTimeout(() => location.reload(), 1000);
    }

    logoutButton.addEventListener('click', handleLogout);

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            loginMessage.textContent = 'Por favor, completa todos los campos.';
            loginMessage.classList.add('error');
            return;
        }

        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Iniciando sesión...';

        try {
            const response = await fetch('https://localhost:7249/api/User');
            if (!response.ok) {
                throw new Error('Error al obtener datos de usuarios');
            }

            const users = await response.json();
            const user = users.find(u => u.email === email);
            
            if (user && password === user.password) {
                // Debug para ver la estructura completa del usuario
                console.log('Usuario encontrado:', user);
                
                // Asegurarse de que estamos usando la propiedad correcta para el ID
                const userId = user.id || user.Id || user.userId || user.UserId;
                
                if (!userId) {
                    console.error('No se pudo encontrar el ID del usuario en:', user);
                    throw new Error('ID de usuario no encontrado en la respuesta');
                }

                const userData = {
                    userId: userId,
                    userName: user.userName || user.UserName,
                    email: user.email || user.Email,
                    soulsCoin: user.soulsCoin || user.SoulsCoin || 0
                };
                
                console.log('Guardando datos de usuario:', userData);
                localStorage.setItem('userData', JSON.stringify(userData));
                updateUIFromLoginState();
                
                loginContainer.classList.remove('expanded');
                loginForm.classList.add('hidden');
                
                loginMessage.textContent = `¡Bienvenido ${userData.userName}!`;
                loginMessage.classList.add('success');
            } else {
                loginMessage.textContent = 'Usuario o contraseña incorrectos.';
                loginMessage.classList.add('error');
            }
        } catch (error) {
            console.error('Error en el login:', error);
            loginMessage.textContent = error.message || 'Error al conectar con el servidor';
            loginMessage.classList.add('error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Iniciar sesión';
        }
    });
});