# SPA Personal Projects Display
>Repositorio monorepo que integra tanto el Frontend como el Backend de mi aplicación SPA Personal.

La aplicación web tiene como objetivo exhibir proyectos y funcionalidades

## 📂 Estructura general del Proyecto 
> para ver en detalle [docs](https://github.com/WizardSustine/SPA-Personal-ProjectsDisplay/blob/main/structure.md)

```
- /SPA-Personal-Frontend:                       # Aplicación cliente (Angular) con autenticación JWT.
   ├── README.md                                # Descripción del frontend
   ├── src/                                     # Código fuente principal
   │   ├── index.html                           # Punto de entrada/ head [meta tags; title; links]
   │   ├── main.ts                              # Inicia la aplicación
   │   ├── style.css                            # Estilos globales
   │   ├── proxy.conf.json                      # Configuración para evitar bloqueos CORS
   │   └── app/                                 # Componentes
   │   │   ├── app                              # Lógica inicial 
   │   │   ├── components/                      # Componentes de visualización y edición
   │   │   ├── guards/                          # StateHolders de autorización / roles
   │   │   ├── models/                          # Modelo de datos
   │   │   ├── services/                        # Servicios de interacción con la API
   │   │   └── data/                            # Mocks para su prueba sin API
   ├── public/                                  
   │   └── favicon.ico                          # Icono de la app
   └── ...otros archivos de configuraciones globales
```
   ---
```
- /SPA-Personal-Backend/                               # API REST (Springboot; Spring Security; MySQL) que gestiona la lógica y seguridad.
   ├── README.md                                       # Descripción del backend
   ├── pom.xml                                         # Dependencias
   ├── src/                                            # Código fuente principal
   │   ├── main/                                       # Código fuente principal
   │   │   ├── ../../personalspa/personalpage/         # Código fuente principal
   │   │   │   ├── DTOs/                               # Modelos para transferencias de datos
   │   │   │   ├── config/                             # Archivo de configuración de seguridad
   │   │   │   ├── controllers/                        # Define los endpoints y asigna los métodos del servicio
   │   │   │   ├── entities/                           # Modelos de datos
   │   │   │   ├── enviroments/                        # Variables globales
   │   │   │   ├── filters/                            # Filtro de autorización por JWT
   │   │   │   ├── handlers/                           # Clases para manejo de errores
   │   │   │   ├── repositories/                       # JPA para persistencia de datos
   │   │   │   ├── services/                           # Define la interacción con la base de datos
   │   │   │   └── PersonalpageApplication.java        # Raiz que da inicio a la aplicación
   │   │   └── resources/                              # Recursos
   │   │       └── application.properties              # Configuración de base de datos
   │   └── test/                                       # Código de testeo
   └── ...otros archivos de configuraciones globales
```
## 🚀 Configuración Inicial

### Requisitos previos
* Tener instalado: Node.js, Angular, Springboot, MySQL
* Git

### Instalación

1. **Clonar el repositorio:**
   
   git clone [SPA Personal ProjectsDisplay](https://github.com/WizardSustine/SPA-Personal-ProjectsDisplay.git)

   
2. **Prueba local:**

### Development server

To start a local development server, run:

>Angular mientras tenga el archivo de configuración proxy.conf.json para evitar problemas con CORS
```bash
ng serve --proxy-config src/proxy.conf.json
```
>Springboot
```bash
./mvnw.cmd spring-boot:run
>para cmd
mvnw spring-boot:run
>para bash
```


Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```
