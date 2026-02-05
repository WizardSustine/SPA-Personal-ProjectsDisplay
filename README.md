# SPA Personal Projects Display

Este es un repositorio monorepo que integra tanto el Frontend como el Backend de mi aplicación SPA.

## 📂 Estructura del Proyecto

- **/SPA-Personal-Frontend**: Aplicación cliente (Angular) con autenticación JWT.
- **/SPA-Personal-Backend**: API REST (Springboot; Spring Security; MySQL) que gestiona la lógica y seguridad.

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