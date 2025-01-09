document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Obtener los valores del formulario
    const rankNum = parseInt(document.getElementById('rankNum').value);
  
    // Asignar el nombre del rango según el número
    const rankNames = [
      'Eterno', // 1
      'Señor',  // 2
      'Espada', // 3
      'Guardián', // 4
      'Cazador', // 5
      'Vástago', // 6
      'Ceniza'   // 7
    ];
    const rankName = rankNames[rankNum - 1]; // Ajuste por índice (el rango comienza desde 1)
  
    const formData = {
      userName: document.getElementById('userName').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
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
  
      document.getElementById('message').innerHTML = `<p class="success">Usuario creado exitosamente.</p>`;
    } catch (error) {
      document.getElementById('message').innerHTML = `<p class="error">${error.message}</p>`;
    }
  });
  