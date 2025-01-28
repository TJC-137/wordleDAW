### Instrucciones para descargar el proyecto

Desarrollado por Tomeu J. Colom, Sergio Pina, Toni Postigo, Ramon Riera y Marc Vieiras.
Este proyecto es un juego tipo "Wordle" basado en las obras de Hidetaka Miyazaki y ha sido desarrollado con fines académicos, bajo ningún concepto pretendemos lucrarnos con esta aplicación.


Vamos a detallar aquí instrucciones para descargar y desplegar el proyecto en local.

-----------------------------------------------------------------------------------------

Asegurarse de crear la base de datos, llamarla 'elden_ring_db' e importar el .sql

```
https://github.com/MarcVieirasMartorell/wordleDAW.git

cd PinaSergio_PostigoAntoni_VieirasMarc_Wordle
```

-----------------------------------------------------------------------------------------

### Backend

Para preparar el backend neceistarás ejecutar XAMPP, crea dos bases de datos (pjsouls y userssouls) y importa los archivos .sql que están en el root del proyecto.

En la carpeta se encuentran dos soluciones de Visual Studio Community, ambas deben de ser ejecutadas por separado posteriormente a la creación de las bases de datos

Asegúrate de tener instalados los siguientes paquetes NuGet en Visual Studio Community: AspNetCore, EntityFrameworkCore, y sus tools, importante que las versiones de .NET y los NuGet sean 8.0.11

-------------------------------------------------------------------------------------

### Frontend

Abrir terminal interna en Visual Studio Code 

```
cd PinaSergio_PostigoAntoni_VieirasMarc_Wordle
```
Ahora usar 'npm i' o 'npm install'

```
npm i
```
Ejecutar servidor
Ahora usar 'npm run dev' o 'npm start'

```
npm run dev
```
-------------------------------------------------------------------------------------

Dirigete a tu localhost, la aplicación ya debería funcionar
