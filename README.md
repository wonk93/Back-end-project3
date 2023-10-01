# Back-end-project3

Configuración

El archivo de configuración principal se encuentra en config/config.js. Aquí puedes ajustar la configuración del servidor, la base de datos y otros parámetros.
Endpoints de la API
La API proporciona varios endpoints para interactuar con la aplicación:

GET /recipes: Obtiene la lista de todas las recetas.

GET /recipes/:id: Obtiene una receta por su ID.

POST /recipes: Crea una nueva receta.

PUT /recipes/:id: Actualiza una receta existente.

DELETE /recipes/:id: Elimina una receta por su ID.

GET /ingredients: Obtiene la lista de todos los ingredientes.

GET /ingredients/:id: Obtiene un ingrediente por su ID.

POST /ingredients: Crea un nuevo ingrediente.

PUT /ingredients/:id: Actualiza un ingrediente existente.

DELETE /ingredients/:id: Elimina un ingrediente por su ID.

GET /userIngredients: Obtiene la lista de ingredientes del usuario autenticado.

Consulta el código fuente y la documentación para obtener información detallada sobre los endpoints y sus usos.

Estructura del Proyecto
config: Contiene archivos de configuración.
controllers: Manejadores de rutas que contienen la lógica de control de las solicitudes.
middlewares: Middleware personalizado, como la verificación de token.
models: Definiciones de los modelos de datos.
routes: Definiciones de las rutas de la API.
services: Lógica del negocio y llamadas a la base de datos.
app.js: Archivo principal de la aplicación.
server.js: Inicia el servidor.
Contribución
Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama para tu característica (git checkout -b feature/nueva-caracteristica).
Realiza los cambios y haz commit de ellos (git commit -am 'Añade nueva característica').
Sube tus cambios (git push origin feature/nueva-caracteristica).
Abre un Pull Request.
