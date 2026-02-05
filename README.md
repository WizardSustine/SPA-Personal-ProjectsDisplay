# SPA Personal Projects Display
>Repositorio monorepo que integra tanto el Frontend como el Backend de mi aplicación SPA Personal.

La aplicación web tiene como objetivo exhibir proyectos y funcionalidades

## 📂 Estructura del Proyecto

- **/SPA-Personal-Frontend**: Aplicación cliente (Angular) con autenticación JWT.
- **/SPA-Personal-Backend**: API REST (Springboot; Spring Security; MySQL) que gestiona la lógica y seguridad.
```
/SPA-Personal-Frontend/
   ├── README.md                                # Descripción del frontend
   ├── src/                                     # Código fuente principal
   │   ├── index.html                           # Punto de entrada/ head [meta tags; title; links]
   │   ├── main.ts                              # Inicia la aplicación
   │   ├── style.css                            # Estilos globales
   │   ├── proxy.conf.json                      # Configuración para evitar bloqueos CORS
   │   └── app/                                 # Componentes
   │   │   ├── app.ts                           # Lógica inicial 
   │   │   ├── app.css                          # Estilos de la aplicación
   │   │   ├── app.html                         # Barra de navegación y router
   │   │   ├── app.routes.ts                    # Definición de rutas
   │   │   ├── app.config.ts                    # Configuración de la app
   │   │   ├── app.spec.ts                      # Configuración de testeos
   │   │   ├── components/                      # Componentes
   │   │   │   ├── mainview.component.ts        # Barra de navegación y router
   │   │   │   ├── contact.component.ts         # Formulario de contacto
   │   │   │   ├── login.component.ts           # Formulario de logueo
   │   │   │   ├── register.component.ts        # Formulario de registro
   │   │   │   ├── about-detail.component.ts    # Página de 'acerca de'
   │   │   │   ├── about-summary.component.ts   # Resumen de página 'acerca de'
   │   │   │   ├── project-card.component.ts    # Tarjeta para visualizar resumen de proyectos
   │   │   │   ├── project-detail.component.ts  # Página para visualizar con detalles los proyectos
   │   │   │   └── project-edit.component.ts    # Formulario para modificar/agregar proyectos
   │   │   ├── data/                            # Mocks para su prueba sin API
   │   │   ├── guards/                          # Componentes
   │   │   │   ├── auth.guard.ts                # Interactua con el servicio y guarda estado de autenticación
   │   │   │   └── role.guard.ts                # Interactua con el servicio y guarda estado de administrador
   │   │   ├── models/
   │   │   │   ├── project.model.ts             # Modelo de datos de proyectos
   │   │   │   └── user.model.ts                # Modelo de datos de usuario
   │   │   └── services/
   │   │       ├── auth.service.ts              # Servicio de autenticación y registro
   │   │       ├── project.service.ts           # Servicio para obtener, modificar y crear proyectos
   │   │       └── funnel-path.service.ts       # Servicio para rastrear, guardar y recuperar la interacción del visitante a la página
   ├── public/                                  
   │   └── favicon.ico                          # Icono de la app
   └── ...otros archivos de configuraciones globales
```

```
/SPA-Personal-Backend/
   ├── README.md                                       # Descripción del backend
   ├── pom.xml                                         # Dependencias
   ├── src/                                            # Código fuente principal
   │   ├── main/                                       # Código fuente principal
   │   │   ├── ../../personalspa/personalpage/         # Código fuente principal
   │   │   │   ├── DTOs/                               # Contiene páginas de error
   │   │   │   │   ├── LoginRequest.java               # Contiene páginas de error
   │   │   │   │   └── RegisterRequest.java            # Contiene páginas de error
   │   │   │   ├── config/                             # Contiene páginas de error
   │   │   │   │   └── SecurityConfig.java             # Contiene páginas de error
   │   │   │   ├── controllers/                        # Contiene páginas de error
   │   │   │   │   ├── AuthController.java             # Contiene páginas de error
   │   │   │   │   ├── ProjectController.java          # Contiene páginas de error
   │   │   │   │   └── UserAppController.java          # Contiene páginas de error
   │   │   │   ├── entities/                           # Contiene páginas de error
   │   │   │   │   ├── JWTUtil.java                    # Contiene páginas de error
   │   │   │   │   ├── Project.java                    # Contiene páginas de error
   │   │   │   │   └── UserApp.java                    # Contiene páginas de error
   │   │   │   ├── enviroments/                        # Contiene páginas de error
   │   │   │   │   └── Enviroments.java                # Contiene páginas de error
   │   │   │   ├── filters/                            # Contiene páginas de error
   │   │   │   │   └── JwtAuthFilter.java              # Contiene páginas de error
   │   │   │   ├── handlers/                           # Contiene páginas de error
   │   │   │   ├── repositories/                       # Contiene páginas de error
   │   │   │   │   ├── ProjectRepo.java                # Contiene páginas de error
   │   │   │   │   └── UserAppRepo.java                # Contiene páginas de error
   │   │   │   ├── services/                           # Contiene páginas de error
   │   │   │   │   ├── interfaces/IprojectService.java # Contiene páginas de error
   │   │   │   │   ├── CustomUserDetailsService.java   # Contiene páginas de error
   │   │   │   │   ├── ProjectService.java             # Contiene páginas de error
   │   │   │   │   └── UserAppService.java             # Contiene páginas de error
   │   │   │   └── PersonalpageApplication.java        # Contiene páginas de error
   │   │   └── resources/                              # Recursos
   │   │       ├── public/error/                       # Páginas de error
   │   │       ├── templates/                          # Páginas de prueba
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
   ```bash
   git clone [https://github.com/WizardSustine/SPA-Personal-ProjectsDisplay.git](https://github.com/WizardSustine/SPA-Personal-ProjectsDisplay.git)

   
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
