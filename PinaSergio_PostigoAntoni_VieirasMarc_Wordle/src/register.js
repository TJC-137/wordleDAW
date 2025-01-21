document.addEventListener('DOMContentLoaded', async function() {
  const userForm = document.getElementById('userForm');
  
  // Función para encriptar contraseña usando Web Crypto API
  async function encryptPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
      console.log('Contraseña encriptada para registro:', hashHex);
      return hashHex;
  }

  userForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Obtener los valores del formulario
      const rankNum = parseInt(document.getElementById('rankNum').value);

      // Asignar el nombre del rango según el número
      const rankNames = [
          'Eterno',   // 1
          'Señor',    // 2
          'Espada',   // 3
          'Guardián', // 4
          'Cazador',  // 5
          'Vástago', // 6
          'Ceniza'    // 7
      ];
      const rankName = rankNames[rankNum - 1];

      const password = document.getElementById('password').value;
      const encryptedPassword = await encryptPassword(password);
      console.log('Contraseña original:', password);
      console.log('Contraseña que se enviará:', encryptedPassword);

      const formData = {
          userName: document.getElementById('userName').value,
          email: document.getElementById('email').value,
          password: encryptedPassword, // Contraseña encriptada
          description: document.getElementById('description').value,
          birthday: document.getElementById('birthday').value,
          rankNum: rankNum,
          rankName: rankName,
          nationality: document.getElementById('nationality').value,
          gender: document.getElementById('gender').value,
          race: document.getElementById('race').value,
      };

      // Mostrar el rango asignado en el campo correspondiente
      document.getElementById('rankName').value = rankName;

      try {
          const response = await fetch('https://localhost:7249/api/User', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || 'Error al crear el usuario');
          }

          document.getElementById('message').innerHTML = `
              <p class="success">
                  Usuario creado exitosamente.
                  <br>
                  Email: ${formData.email}
                  <br>
                  Nombre: ${formData.userName}
              </p>`;
          
          console.log('Usuario registrado exitosamente:', {
              email: formData.email,
              userName: formData.userName,
              rankName: formData.rankName
          });

          // Limpiar el formulario
          userForm.reset();
      } catch (error) {
          console.error('Error al registrar:', error);
          document.getElementById('message').innerHTML = `<p class="error">${error.message}</p>`;
      }
  });
});