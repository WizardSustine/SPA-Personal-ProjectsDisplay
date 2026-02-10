# Arquitectura - SPA Personal Projects Display

## Descripción General

**SPA Personal Projects Display** es una aplicación full-stack tipo portfolio que permite a usuarios gestionar proyectos personales, visualizar estadísticas de navegación mediante un funnel de conversión, y proporciona un sistema de administración con autenticación JWT.

**Tipo de Arquitectura:** Arquitectura de 3 capas (Client-Server) con separación clara entre frontend (Angular) y backend (Spring Boot).

---

## Stack Tecnológico

### Backend
- **Framework:** Spring Boot 3.x
- **Lenguaje:** Java 17+
- **Base de Datos:** MySQL/MariaDB
- **Autenticación:** JWT (JSON Web Tokens)
- **Seguridad:** Spring Security 6.x + BCrypt
- **Build:** Maven

### Frontend
- **Framework:** Angular 18+
- **Lenguaje:** TypeScript
- **Estilo:** CSS puro + TailwindCSS (opcional)
- **State Management:** Angular Signals
- **Build:** Angular CLI

---

## Componentes principales

### 1. Backend - Estructura de Capas

```
PersonalpageApplication (Spring Boot Main)
    ├── Controllers (REST API Endpoints)
    │   ├── AuthController - Autenticación (login/register)
    │   ├── ProjectController - CRUD de proyectos
    │   ├── FunnelController - Gestión de rutas de visitantes
    │   └── UserAppController - Gestión de usuarios
    │
    ├── Services (Lógica de Negocio)
    │   ├── ProjectService - Operaciones sobre proyectos
    │   ├── UserAppService - Operaciones sobre usuarios
    │   ├── FunnelService - Análisis de conversión
    │   └── CustomUserDetailsService - Carga de datos de usuario
    │
    ├── Repositories (Acceso a Datos)
    │   ├── ProjectRepo (JPA)
    │   ├── UserAppRepo (JPA)
    │   └── FunnelRepo (JPA)
    │
    ├── Entities (Modelos de Base de Datos)
    │   ├── UserApp - Usuario de la aplicación
    │   ├── Project - Entidad de proyecto
    │   └── Funnel - Rutas de navegación de visitantes
    │
    ├── Security
    │   ├── SecurityConfig - Configuración de Spring Security
    │   ├── JwtAuthFilter - Filtro de autenticación JWT
    │   ├── JWTUtil - Generación y validación de tokens
    │   └── OnAuthenticationSuccessHandler - Manejador post-autenticación
    │
    ├── DTOs (Data Transfer Objects)
    │   ├── LoginRequest
    │   ├── RegisterRequest
    │   └── Others
    │
    ├── Handlers (Exception Handling)
    │   ├── ProjectNotFoundException
    │   ├── ProjectNotFoundAdvice
    │   └── UsernameNotFoundException
    │
    └── Config
        ├── SecurityConfig
        └── Enviroments (Variables de entorno)
```

### 2. Frontend - Estructura de Componentes

```
App Component (Root)
    ├── Services
    │   ├── AuthService - Manejo de autenticación
    │   ├── ProjectService - Operaciones CRUD de proyectos
    │   ├── FunnelPathService - Seguimiento de rutas
    │   └── GraphicService - Datos para gráficos
    │
    ├── Guards (Protección de rutas)
    │   ├── authGuard - Requiere autenticación
    │   └── roleGuard (adminGuard) - Requiere rol específico
    │
    ├── Models
    │   ├── User
    │   ├── Project
    │   ├── Funnel
    │   └── Others
    │
    ├── Components
    │   ├── MainViewComponent - Página inicial
    │   ├── LoginComponent - Formulario de login
    │   ├── RegisterComponent - Formulario de registro
    │   ├── ProjectDetailComponent - Detalle de un proyecto
    │   ├── ProjectEditComponent - Edición de proyecto (admin)
    │   ├── ProjectCardComponent - Tarjeta visual de proyecto
    │   ├── UserAdminComponent - Panel de administración de usuarios
    │   ├── AboutDetailComponent - Sección Acerca de
    │   ├── ContactComponent - Contacto
    │   └── Graphics - Visualización de estadísticas
    │
    ├── Directives
    │   └── TrackClickDirective - Seguimiento de clicks y navegación
    │
    ├── Guards
    │   ├── authGuard
    │   └── roleGuard
    │
    └── Routes
        └── app.routes - Definición de rutas de aplicación
```

---

## Flujo de Autenticación

### 1. Registro
```
Usuario → RegisterForm → AuthService.register()
  → HTTP POST /auth/register (RegisterRequest)
    → AuthController.register()
      → Validar username/email duplicados
      → Encriptar password con BCrypt
      → Guardar UserApp en DB
      → Auto-login automático
```

### 2. Login
```
Usuario → LoginForm → AuthService.login()
  → HTTP POST /auth/login (LoginRequest)
    → AuthController.login()
      → AuthenticationManager.authenticate()
      → JWTUtil.generateToken()
      → Retornar JWT Token
  → Guardar token en sessionStorage
  → Decodificar JWT para obtener información de usuario
```

### 3. Solicitudes Autenticadas
```
Cliente
  → Adjunta Header: Authorization: Bearer <JWT_TOKEN>
    → JwtAuthFilter (OncePerRequestFilter)
      → Extrae token del header
      → Valida con JWTUtil.getClaims()
      → Extrae roles de claims
      → Crea UsernamePasswordAuthenticationToken
      → Establece en SecurityContextHolder
    → Permite acceso a recurso protegido
```

---

## Flujo de Datos - Proyectos

### Crear Proyecto
```
Admin → ProjectEditForm → ProjectService.create()
  → HTTP POST /api/project/save
    → ProjectController.save()
      → ProjectService.save()
        → ProjectRepo.save() → DB
      → Retorna Project guardado
```

### Obtener Proyectos
```
Frontend → ProjectService.getAll()
  → HTTP GET /api/projects/all
    → ProjectController.getAll()
      → ProjectService.findAll()
        → ProjectRepo.findAll() → DB
      → Transforma a Project DTO con attributes mapeados
```

### Actualizar Proyecto
```
Admin → ProjectEditForm → ProjectService.update()
  → HTTP PUT /api/project/{id}
    → ProjectController.update()
      → ProjectService.updateProject()
        → Encuentra proyecto en DB
        → Actualiza campos
        → Guarda cambios
```

---

## Modelo de Base de Datos

### Tabla: UserApp
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT (PK) | ID único |
| username | VARCHAR | Nombre de usuario único |
| email | VARCHAR | Email único |
| password | VARCHAR | Password hasheado con BCrypt |
| roles | VARCHAR | Roles separados por comas (ej: USER,ADMIN) |

### Tabla: Project
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT (PK) | ID único |
| title | VARCHAR | Título del proyecto |
| description | TEXT | Descripción larga |
| imageUrl | VARCHAR | URL de imagen |
| isPublic | BOOLEAN | Visibilidad pública |
| technology | JSON/LIST | Array de tecnologías |
| argument | TEXT | Propuesta de valor |
| attributes | MAP | Atributos clave-valor adicionales |
| docsUrl | VARCHAR | URL a documentación |
| readmeUrl | VARCHAR | URL a README |
| repoUrl | VARCHAR | URL a repositorio |
| liveUrl | VARCHAR | URL a demo en vivo |

### Tabla: Funnel
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | VARCHAR (PK) | ID único de sesión |
| createdAt | BIGINT | Timestamp de inicio |
| endAt | BIGINT | Timestamp de finalización |
| visitorPaths | MEDIUMTEXT | Array de rutas visitadas |

---

## Patrones de Diseño Implementados

### 1. **Service Pattern**
- Servicios encapsulan lógica de negocio
- Controllers delegan a servicios
- Facilita testing y mantenimiento

### 2. **DTO Pattern**
- `RegisterRequest`, `LoginRequest` para transferencia de datos
- Separación entre entidades DB y API

### 3. **Repository Pattern**
- JPA Repositories para abstracción de acceso a datos
- Spring Data maneja query generation

### 4. **Filter Pattern**
- `JwtAuthFilter` valida tokens en cada request
- Desacoplado de la lógica de control

### 5. **Signal Pattern (Angular)**
- Estado reactivo con `signal()` 
- Auto-tracking de dependencias
- Mejor performance que RxJS

### 6. **Guard Pattern (Angular)**
- `authGuard` para proteger rutas requiere autenticación
- `roleGuard` (adminGuard) para proteger rutas por rol

---

## Flujo de Seguridad

```
Request → JwtAuthFilter
  ├─ ¿Ruta excluida (/auth)? → Permitir
  ├─ ¿Header Authorization presentes? 
  │   ├─ Sí → Validar token JWT
  │   │   ├─ Token válido → Extractar email y roles
  │   │   └─ Token inválido → Limpiar SecurityContext
  │   └─ No → Continuar sin autenticación
  └─ SecurityFilterChain valida permisos de endpoint
```

### Endpoints Públicos
- `POST /auth/login` - Login
- `POST /auth/register` - Registro
- `GET /projects/**` - Ver proyectos públicos
- `GET /funnel/**` - Estadísticas de funnel

### Endpoints Protegidos
- `PUT /project/**` - Actualizar proyecto
- `DELETE /project/**` - Eliminar proyecto
- `GET /admin/**` - Panel de administración

---

## Proxy Configuration

El frontend usa proxy para comunicarse con el backend local:
- **Archivo:** `src/proxy.conf.json`
- **Redirección:** Rutas `/api/*` → `http://localhost:8080`
- **Comando:** `ng serve --proxy-config src/proxy.conf.json`

---

## Variables de Entorno

### Backend (`application.properties`)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dbname
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
server.port=8080
jwt.secret=your_secret_key
```

### Frontend
- API URL base: `/api` (proxiado a localhost:8080)
- Token storage: sessionStorage (auth_token, auth_user)

---

## Resumen de Dependencias Clave

**Backend:**
- `spring-boot-starter-web` - REST controllers
- `spring-boot-starter-data-jpa` - Persistencia
- `spring-boot-starter-security` - Autenticación/Autorización
- `mysql-connector-java` - Driver MySQL
- `jjwt` - JWT token generation/validation
- `jakarta.persistence` - JPA annotations

**Frontend:**
- `@angular/core` - Framework core
- `@angular/common/http` - HTTP client
- `@angular/router` - Routing
- `rxjs` - Reactive programming

---

## Mejoras Futuras Recomendadas

1. **Logging Centralizado:** Agregar SLF4J + Logback
2. **Caché:** Implementar Redis para proyectos accedidos frecuentemente
3. **Validación:** Agregar Bean Validation (@Valid) en DTOs
4. **Testing:** Unit tests + Integration tests
5. **API Documentation:** OpenAPI/Swagger
6. **Error Handling Uniforme:** Standardizar respuestas de error
7. **Audit Trail:** Registrar cambios en proyectos
8. **Rate Limiting:** Protección contra abuso
9. **CORS:** Configuración explícita de CORS
10. **Database Migrations:** Flyway o Liquibase

---

**Última actualización:** Febrero 2026
