document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Capturar los datos del formulario
    const loginData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
  
    try {
      // Enviar solicitud al servidor
      const response = await fetch('https://localhost:7249/api/User/login', { // Cambia el endpoint si es necesario
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      // Procesar la respuesta
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
  
      // Mostrar mensaje de éxito
      document.getElementById('loginMessage').innerHTML = 
        `<p class="success">¡Inicio de sesión exitoso! Bienvenido, ${data.userName || 'Usuario'}.</p>`;
  
      // Aquí puedes almacenar el token o información del usuario (si aplica)
       localStorage.setItem('authToken', data.token);
  
      // Redirigir o ejecutar acciones adicionales
       window.location.href = "index.html"; 
  
    } catch (error) {
      // Mostrar mensaje de error
      document.getElementById('loginMessage').innerHTML = 
        `<p class="error">${error.message}</p>`;
    }
  });
  