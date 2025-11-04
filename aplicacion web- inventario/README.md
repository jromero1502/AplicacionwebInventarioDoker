# Aplicacion web de Inventario

|                       Titulo                    |                                                                              Contenido                                                                  |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Aplicación Web de Inventario Contenerizada**  |  Descripción concisa del propósito del proyecto (Ej: Un sistema modular para la gestión de inventario, implementado con arquitectura de microservicios).|
| **Tecnologías Clave**                           |  Listado de las herramientas principales: Node.js, Nginx, Docker, Docker Compose.                                                                       |


# Arquitectura del proyecto

|   Servicio   |          Rol        | Puerto interno | Puerto host  |                         Descripción                          |
|--------------|---------------------|----------------|--------------|--------------------------------------------------------------|
| **backend**  | API Node.js/Express |     3000       |      —       | Gestiona los datos y operaciones CRUD sobre el inventario    |
| **frontend** | Servidor Nginx      |      80        |     8080     | Muestra la interfaz web y comunica las peticiones al backend |

# Estructura del proyecto
Aplicación web-inventario/
├── backend/
│ ├── Dockerfile
│ ├── package.json
│ ├── server.js
│ └── data.json
├── frontend/
│ ├── Dockerfile
│ ├── nginx.conf
│ ├── index.html
│ ├── styles.css
│ └── app.js
└── docker-compose.yml

#Configuración (Prerrequisitos)
## ⚙️ Configuración y Prerrequisitos
Para ejecutar este proyecto, necesitas tener instalados los siguientes programas en tu sistema:
* **[Git](https://git-scm.com/):** Para clonar el repositorio.
* **[Docker](https://www.docker.com/get-started):** Versión 20.10 o superior.
* **[Docker Compose](https://docs.docker.com/compose/install/):** Versión 1.29 o superior.
* **[WSL 2 habilitado] (si estás en Windows 10/11)
* **[Conexión a internet] (solo la primera vez que descargue las imágenes)

Sigue estos pasos para poner en marcha la aplicación:
1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/AndreyFCB1001/AplicacionwebInventarioDoker.git](https://github.com/AndreyFCB1001/AplicacionwebInventarioDoker.git)
    cd AplicacionwebInventarioDoker
    ```

2.  **Construir y Ejecutar Contenedores:**
    Utiliza Docker Compose para construir las imágenes (`backend` y `frontend`) y levantar los servicios.

    ```bash
    docker-compose up --build -d
    # --build: asegura que las imágenes Docker se reconstruyan con el código más reciente.
    # -d: ejecuta los contenedores en modo 'detached' (segundo plano).
    ```

3.  **Acceder a la Aplicación:**
    Una vez que los contenedores estén activos (puede tomar unos segundos):
    * **Frontend (UI):** Abre tu navegador y navega a `http://localhost:[PUERTO_FRONTEND]`.
    * **Backend (API):** La API estará accesible internamente en `http://backend:[PUERTO_BACKEND]`.
    > **NOTA:** Reemplaza `[PUERTO_FRONTEND]` y `[PUERTO_BACKEND]` con los puertos definidos en tu `docker-compose.yml`.
    > En nuestro caso accedemos a "http://localhost:8080" para visualizar la api.

4. Estructura de Servicios (Detalle Técnico)
	## 🗺️ Estructura del Proyecto
El proyecto está dividido en dos servicios principales gestionados por Docker Compose:
* **`backend/` (Servicio API):**
    * **Tecnología:** Node.js (Express).
    * **Propósito:** Lógica de negocio, gestión de la persistencia de datos y exposición de la API REST.
* **`frontend/` (Servicio UI):**
    * **Tecnología:** HTML, CSS, JavaScript (servido por Nginx).
    * **Propósito:** Interfaz de usuario, consume los endpoints del servicio `backend`.
 
5. Contribuciones y Contacto
## 🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un 'issue' o envía un 'pull request' para sugerir mejoras o reportar errores.
## ✉️ Contacto
* **Autores:** [Julian David Romero Hernandez / Jhoan Prieto Sanchez / Jeisson Camilo Lopez Bello / Miguel Ángel Roa Pinzón / Andrey Suarez Suarez]
* **Email:** [Janprietos@poligran.edu.co / mangroa@poligran.edu.co / jdavidromero@poligran.edu.co / jcamilolopez3@poligran.edu.co /  astsuarez@poligran.edu.co]
* **Subgrupo:**[6].





