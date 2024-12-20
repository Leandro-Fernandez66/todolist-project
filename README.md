PROYECTO TO-DO LIST

Esta es una aplicacion de un to-do list, desarrollada utilizando React con Vite en el frontend, y Node.js,
Express, y MongoDB en el backend. Esta agrega, borra, marca como completada y edita tareas. Ademas muestra las 
tareas que estan completadas y las tareas incompletas, también implementa un sistema de autenticación con JWT.

Principales Tecnologías Utilizadas

Frontend: React, Vite, SASS (para los estilos)
Backend: Node.js, Express, Mongoose, bcrypt (para la encriptación de contraseñas)
Base de Datos: MongoDB
Autenticación: JWT (JSON Web Token)

Instrucciones de Instalación:

1)clonar el repositorio:
   - git clone url del repositorio
   - cd url del repositorio

2)Configuración del Backend (Node.js + MongoDB)
  1.instalar dependencias del backend:
   - cd backend
   - npm install      

  2.Configuración de la Base de Datos:
   - asegurarse de que MongoDB esté funcionando y accesible.
   - crear el archivo .env y configurar las variables necesarias.
   - agregar la linea: MONGODB_URI=[url-del-servidor-de-base-de-datos]
   - agregar la linea: JWT_SECRET_KEY=[tu-secret-key-aqui]
   - agregar la linea: PORT=[tu-puerto]

  3.Iniciar el Servidor Backend:
   - npm run dev

3)Configuración del Frontend (React con Vite)
 1.Instalar Dependencias del Frontend:
  - cd frontend
  - npm install

 2.Configuración de la URL Base: En el frontend, asegurarse de que la variable que define la URL base apunte al backend correcto:
  - crear un archivo .env
  - agregar la linea: [url-de-tu-Api]

 3.Iniciar el Servidor Frontend
  - npm run dev     

Pruebas de Integración

Probar los Endpoints del Backend se puede utilizar herramientas como Postman para probar los endpoints del backend.
Probar la Aplicación en el Frontend: Una vez que ambos servidores estén en funcionamiento, abre el navegador y navega por ejemplo: http://localhost:5173 (por defecto de vite) para interactuar con la aplicación.

Funciones Adicionales

Autenticación con JWT

El backend está protegido con un sistema de autenticación basado en JSON Web Tokens (JWT).
Las rutas CRUD requieren que el usuario esté autenticado para realizar las operaciones.
El frontend incluye formularios de registro e inicio de sesión que manejan los tokens JWT, tambien incluye un boton para cierre de sesion.

Filtrado de Tareas

El backend permite filtrar las tareas por usuario y por tareas completadas y no completadas, por lo que
el frontend incluye el envio de solicitudes con parámetros de URL para obtener tareas filtradas.

