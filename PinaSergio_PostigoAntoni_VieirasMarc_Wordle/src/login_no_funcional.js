document.addEventListener('DOMContentLoaded', async function() {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginMessage = document.getElementById('loginMessage');

  if (!loginForm || !emailInput || !passwordInput || !loginMessage) {
      console.error('No se encontraron elementos necesarios del formulario');
      return;
  }

  // Función para encriptar contraseña usando Web Crypto API
  async function encryptPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
      return hashHex;
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
          // Primero obtener todos los usuarios
          const getUsersResponse = await fetch('https://localhost:7249/api/User');
          if (!getUsersResponse.ok) {
              throw new Error('Error al obtener datos de usuarios');
          }

          const users = await getUsersResponse.json();
          console.log('Usuarios disponibles:', users);

          // Buscar el usuario que coincida con email
          const user = users.find(u => u.email === email);
          
          if (user) {
              console.log('Usuario encontrado:', user);
              
              // Intentar primero con contraseña sin encriptar
              let isValidPassword = password === user.password;
              
              // Si no coincide, intentar con contraseña encriptada
              if (!isValidPassword) {
                  const hashedPassword = await encryptPassword(password);
                  // Comparar solo los primeros caracteres que coincidan con la longitud de la contraseña almacenada
                  isValidPassword = hashedPassword.substring(0, user.password.length) === user.password;
                  
                  console.log('Contraseña ingresada (encriptada):', hashedPassword);
                  console.log('Contraseña almacenada:', user.password);
                  console.log('Comparando los primeros', user.password.length, 'caracteres');
                  console.log('¿Coinciden las contraseñas?', isValidPassword);
              }

              if (isValidPassword) {
                  loginMessage.textContent = `¡Bienvenido ${user.userName}!`;
                  loginMessage.classList.add('success');
                  console.log('Login exitoso. Datos del usuario:', {
                      nombre: user.userName,
                      rango: user.rankName,
                      monedas: user.soulsCoin
                  });
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