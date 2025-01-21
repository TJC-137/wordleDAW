document.addEventListener('DOMContentLoaded', async function() {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginMessage = document.getElementById('loginMessage');

  if (!loginForm || !emailInput || !passwordInput || !loginMessage) {
      console.error('No se encontraron elementos necesarios del formulario');
      return;
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
          // Primero obtener todos los usuarios
          const getUsersResponse = await fetch('https://localhost:7249/api/User');
          if (!getUsersResponse.ok) {
              throw new Error('Error al obtener datos de usuarios');
          }

          const users = await getUsersResponse.json();
          console.log('Usuarios disponibles:', users);

          // Buscar el usuario que coincida
          const user = users.find(u => u.email === email && u.password === password);

          if (user) {
              loginMessage.textContent = `¡Bienvenido ${user.userName}!`;
              loginMessage.classList.add('success');
              console.log('Datos del usuario:', {
                  nombre: user.userName,
                  rango: user.rankName,
                  monedas: user.soulsCoin
              });
          } else {
              loginMessage.textContent = 'Usuario o contraseña incorrectos.';
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