# Design Patterns & Especificaciones Técnicas

## 1. Estructura de Servicios

### 1.1 ProjectService
**Responsabilidad:** Gestión completa del ciclo de vida de proyectos

```java
Interface: IProjectService
├── findById(Long id): Optional<Project>
├── save(Project project): Project
├── findAll(): List<Project>
├── updateProject(Long id, Project project): Project
└── deleteById(Long id): void
```

**Casos de Uso:**
- Obtener todos los proyectos (GET /projects/all)
- Obtener proyecto específico (GET /projects/{id})
- Crear nuevo proyecto (POST /project/save)
- Actualizar proyecto (PUT /project/{id})
- Eliminar proyecto (DELETE /project/{id})

**Transaccionalidad:** @Transactional en clase
- Asegura que todas las operaciones sean ACID
- Rollback automático en excepciones

---

### 1.2 UserAppService
**Responsabilidad:** Gestión de usuarios y validaciones

```java
Métodos Principales:
├── findByEmail(String email): Optional<UserApp>
├── findByUsername(String username): Optional<UserApp>
├── save(UserApp user): UserApp
├── updateUser(Long id, UserApp user): UserApp
├── deleteById(Long id): void
├── existsByUsername(String username): boolean
└── existsByEmail(String email): boolean
```

**Validaciones:**
- Prevención de duplicados de username/email
- Búsquedas optimizadas por campos indexados

---

### 1.3 FunnelService
**Responsabilidad:** Análisis de patrones de navegación

```java
Métodos:
├── findAll(): List<Funnel>
├── findById(String id): Optional<Funnel>
├── save(Funnel funnel): Funnel
└── updateFunnel(String id, Funnel funnel): Funnel
```

**Campos de Funnel:**
- `id`: Identificador único de sesión de visitante
- `createdAt`: Timestamp inicio (ms)
- `endAt`: Timestamp fin (ms)
- `visitorPaths`: Array de rutas visitadas (JSON)

---

## 2. Estructura de Controladores

### 2.1 AuthController
**Path Base:** `/auth`

| Endpoint | Method | Parámetros | Respuesta | Auth |
|----------|--------|-----------|----------|------|
| `/auth/login` | POST | LoginRequest | `{token: string}` | ❌ |
| `/auth/register` | POST | RegisterRequest | `{message: string}` | ❌ |

**LoginRequest DTO:**
```java
record LoginRequest(
    String email,
    String password
) {}
```

**RegisterRequest DTO:**
```java
record RegisterRequest(
    String email,
    String password,
    String username,
    String roles // Optional, default="USER"
) {}
```

**Flujo de Login:**
1. Validar credenciales con AuthenticationManager
2. Si válido, extraer roles de Authentication
3. Generar JWT token con JWTUtil
4. Returnar en respuesta

---

### 2.2 ProjectController
**Path Base:** `/project` y `/projects`

| Endpoint | Method | Parámetros | Auth |
|----------|--------|-----------|------|
| `/projects/all` | GET | - | ❌ |
| `/projects/{id}` | GET | id | ❌ |
| `/project/save` | POST | Project | ✅ |
| `/project/{id}` | PUT | id, Project | ✅ |
| `/project/{id}` | DELETE | id | ✅ |

**Error Handling:**
- `ProjectNotFoundException` → 404 Not Found
- `ProjectNotFoundAdvice` → GlobalExceptionHandler

---

### 2.3 UserAppController
**Path Base:** `/users`

| Endpoint | Method | Auth |
|----------|--------|------|
| `/users/all` | GET | ✅ ADMIN |
| `/users/{id}` | GET | ✅ |
| `/users/save` | POST | ✅ |
| `/users/{id}` | PUT | ✅ |
| `/users/{id}` | DELETE | ✅ ADMIN |

---

## 3. Autenticación y Autorización

### 3.1 JWT Token Structure

```
Header.Payload.Signature

Payload contiene:
{
  "sub": "user@email.com",        // Asunto (usuario email)
  "roles": ["USER", "ADMIN"],     // Array de roles
  "iat": 1672531200,              // Issued at
  "exp": 1672617600               // Expiration
}
```

### 3.2 SecurityConfig
**Configuración de Spring Security:**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    // Chain de seguridad
    securityFilterChain(HttpSecurity http)
    ├── CSRF deshabilitado (para APIs REST)
    ├── Sesiones sin estado (SessionCreationPolicy.STATELESS)
    ├── AuthenticationProvider con DaoAuthenticationProvider
    ├── PasswordEncoder: BCryptPasswordEncoder
    ├── Rutas públicas: /auth/**, /, /projects/**, /funnel/**
    ├── Demás rutas: requieren autenticación
    └── JwtAuthFilter inyectado antes de UsernamePasswordAuthenticationFilter
}
```

**Orden de ejecución:**
1. JwtAuthFilter extrae y valida token
2. SecurityFilterChain verifica permisos
3. Si tiene permisos → Acceso concedido
4. Si no autenticado → 401 Unauthorized
5. Si sin permisos → 403 Forbidden

---

### 3.3 JwtAuthFilter

```java
public class JwtAuthFilter extends OncePerRequestFilter {
    
    // Excepciones: rutas /auth/** no pasan por este filtro
    
    doFilterInternal():
    ├─ Extrae header "Authorization: Bearer <token>"
    ├─ Si no presente → continúa sin autenticación
    ├─ Si presente → valida con JWTUtil
    ├─ Si válido → extrae email y roles
    ├─ Crea UsernamePasswordAuthenticationToken
    ├─ Establece en SecurityContextHolder
    └─ Continúa con filterChain
}
```

---

## 4. Arquitectura Frontend - Angular 18

### 4.1 File Structure
```
src/app/
├── app.ts                          # Root component
├── app.routes.ts                   # Routing configuration
├── app.config.ts                   # App configuration
├── app.html                        # Root template
├── app.css                         # Global styles
│
├── components/                     # Feature components
│   ├── mainview.component.ts       # Landing page
│   ├── login.component.ts          # Auth form
│   ├── project-detail.component.ts # Project detail view
│   ├── project-edit.component.ts   # Admin edit form
│   ├── user-admin.component.ts     # User management
│   └── ...
│
├── services/                       # HTTP & business logic
│   ├── auth.service.ts             # Authentication
│   ├── project.service.ts          # Project CRUD
│   ├── funnel-path.service.ts      # Navigation tracking
│   └── graphic.service.ts          # Analytics data
│
├── guards/                         # Route protection
│   ├── auth.guard.ts               # Require login
│   └── role.guard.ts               # Require admin role
│
├── models/                         # TypeScript interfaces
│   ├── user.model.ts
│   ├── project.model.ts
│   └── funnel.model.ts
│
├── directives/                     # Custom directives
│   └── trackclick.directive.ts     # Click tracking for funnel
│
└── data/                           # Mock data
    ├── mock-projects.ts
    ├── mock-about.ts
    └── mock-banner.ts
```

### 4.2 Signals (Angular 18+)

**¿Qué son?**
- Sistema de reactividad moderno en Angular
- Alternativa a RxJS observables para estado simple
- Auto-tracking de dependencias

**Ejemplos en el proyecto:**

```typescript
// En AuthService
public user = signal<UserPayload | null>(null);

// En App Component
public menuOpen = signal(false);
toggleMenu() {
  this.menuOpen.update(val => !val);
}
```

**Ventajas:**
- Mejor performance que observables
- API más simple para estado local
- Combina bien con RxJS cuando es necesario

---

### 4.3 Routing Protegido

```typescript
export const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin/project/:id/edit', 
    component: ProjectEditComponent,
    canActivate: [adminGuard]  // ← Protegido
  },
  { 
    path: 'admin/users', 
    component: UserAdminComponent,
    canActivate: [adminGuard]  // ← Protegido
  }
];
```

**adminGuard:**
- Verifica si usuario está autenticado
- Verifica si usuario tiene rol ADMIN
- Redirige a login si no cumple

---

## 5. Modelos de Datos

### 5.1 User Model (Frontend)

```typescript
interface UserAuth {
  email: string;
  password: string;
}

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
}
```

### 5.2 Project Model

```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isPublic: boolean;
  technology: string[];
  argument: string;
  attributes: Array<{ url: string; caption: string }>;
  docsUrl: string;
  readmeUrl: string;
  repoUrl: string;
  liveUrl?: string;
}
```

### 5.3 Funnel Model

```typescript
interface Funnel {
  id: string;
  createdAt: number;      // ms timestamp
  endAt: number;          // ms timestamp
  visitorPaths: string[]; // Array de rutas
}
```

---

## 6. Servicios Frontend

### 6.1 AuthService

```typescript
Key Methods:
├── login(email, password): Promise<UserPayload>
│   └── POST /api/auth/login
├── register(email, password, username): Promise<UserPayload>
│   └── POST /api/auth/register → auto-login
├── logout(): void
│   └── Limpia sessionStorage
├── isAuthenticated(): boolean
└── getUserRole(): string
```

**Token Management:**
- Almacenado en: `sessionStorage` (no localStorage por seguridad)
- Clave: `auth_token`
- Usuario decodificado: `auth_user`
- Duración: Sesión del navegador

---

### 6.2 ProjectService

```typescript
Key Methods:
├── getAll(): Observable<Project[]>
│   └── GET /api/projects/all
├── get(id: string): Observable<Project>
│   └── GET /api/projects/{id}
├── create(project): Observable<Project>
│   └── POST /api/project/save
├── update(id, project): Observable<Project>
│   └── PUT /api/project/{id}
├── delete(id): Observable<void>
│   └── DELETE /api/project/{id}
└── Fallback a mockProjects si falla API
```

**Features:**
- Mapeo automático de atributos (Map → Array)
- Error handling con fallback a datos mock
- Headers con JWT token automáticos

---

### 6.3 TrackClickDirective

```typescript
Propósito: Registrar navegación y clicks
├── Escucha clicks en elementos con [trackClick]
├── Envía a FunnelPathService
├── Registra:
│   ├── Elemento clickeado
│   ├── Timestamp
│   └── URL actual
├── Detecta cambios de página (visibilitychange)
└── Registra visitas en servidor
```

---

## 7. HTTP Interceptores & Headers

### Autenticación en Requests

```typescript
function authHeader(): Record<string, string> {
  const token = sessionStorage.getItem('auth_token');
  return token 
    ? { Authorization: `Bearer ${token}` } 
    : {};
}

private headers(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    ...authHeader()  // ← Inyecta token
  });
}
```

**Flujo:**
1. Cada petición HTTP adjunta header `Authorization: Bearer <token>`
2. Backend verifica token en JwtAuthFilter
3. Si válido → Procesa request
4. Si inválido → 401 Unauthorized

---

## 8. Error Handling

### Backend
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ProjectNotFoundException.class)
  → ResponseEntity<ErrorResponse> (404)
}
```

### Frontend
```typescript
Observable.pipe(
  catchError(err => {
    console.error('Error:', err);
    return of(mockData);  // Fallback
  })
)
```

---

## 9. Performance & Optimizaciones

### Backend
- **Transaccionalidad:** @Transactional en servicios
- **Lazy Loading:** JPA @ElementCollection(fetch = FetchType.EAGER/LAZY)
- **Indexación:** Campos username, email en UserApp
- **Connection Pooling:** HikariCP (default Spring Boot)

### Frontend
- **Signals:** Mejor performance vs Observables
- **OnPush Change Detection:** Posibilidad de implementar
- **Lazy Loading Rutas:** Implementar en app.routes.ts
- **Image Optimization:** Usar CDN para imageUrl
- **sessionStorage:** Más rápido que localStorage

---

## 10. Consideraciones de Seguridad

| Aspecto | Implementación | Estado |
|--------||-|---|
| CSRF | Deshabilitado para API REST ✅ | ✅ |
| XSS | Escape automático Angular ✅ | ✅ |
| Password Hashing | BCryptPasswordEncoder (10 rounds) ✅ | ✅ |
| JWT Secret | Almacenado en application.properties | ⚠️ Usar env vars |
| HTTPS | No implementado en dev | ⚠️ En producción |
| SQL Injection | JPA Prepared Statements ✅ | ✅ |
| Token Expiry | Configurable en JWTUtil | ⚠️ Implementar |
| CORS | No configurado explícitamente | ⚠️ Verificar |

---

**Última actualización:** Febrero 2026
