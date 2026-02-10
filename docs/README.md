# Documentación Técnica - SPA Personal Projects Display

Este directorio contiene la documentación técnica completa del proyecto.

## 📁 Contenido

### 1. **ARCHITECTURE.md**
Descripción detallada de la arquitectura del sistema incluyendo:
- Stack tecnológico (Angular 18, Spring Boot 3, MySQL)
- Estructura de capas (Frontend, Backend, Database)
- Componentes principales del backend y frontend
- Flujos de datos (autenticación, proyectos, funnel)
- Modelo de base de datos
- Patrones de diseño implementados
- Seguridad y autenticación JWT
- Mejoras futuras recomendadas

**Ideal para:** Entender el proyecto "desde 10,000 pies de altura"

---

### 2. **DESIGN.md**
Especificaciones técnicas detalladas incluyendo:
- Estructura de servicios (responsabilidades y métodos)
- Estructura de controladores (endpoints y rutas)
- Autenticación y autorización JWT
- Arquitectura Angular 18 (Signals, Guards, etc.)
- Modelos de datos (interfaces TypeScript)
- Servicios frontend (AuthService, ProjectService, etc.)
- HTTP Interceptores y headers
- Error handling
- Performance & optimizaciones
- Consideraciones de seguridad

**Ideal para:** Desarrolladores que necesitan entender detalles técnicos específicos

---

### 3. **Diagramas Mermaid**
Se han renderizado 3 diagramas visuales:

#### 3.1 Arquitectura General
Muestra la interacción entre:
- Frontend (Angular components, services, guards)
- Network Layer (HTTP + JWT Auth)
- Backend (Spring Boot controllers, services, repositories)
- Database (MySQL)

#### 3.2 Flujo de Autenticación (Sequence Diagram)
Detalla los 3 flujos principales:
1. **Registro:** Validación → Encriptación → Almacenamiento → Auto-login
2. **Login:** Validación → Generación JWT → Decodificación → Storage
3. **Request Protegido:** Token validation → SecurityContext → Processing

#### 3.3 Diagrama de Capas
Visualiza la arquitectura por capas:
- Presentation Layer (Componentes Angular)
- Logic Layer (Servicios)
- Protection Layer (Guards de ruta)
- Data Layer (Modelos)
- Backend layers (Controllers → Services → Repositories → Entities)
- Database layer (MySQL)

---

## 🔗 Fuentes Mermaid
Los fuentes Mermaid están disponibles en la carpeta `docs/diagrams/`:

- `architecture.mmd` - [Diagrama de Arquitectura](docs/diagrams/architecture.mmd)
- `auth-flow.mmd` - [Flujo de Autenticación (secuencia)](docs/diagrams/auth-flow.mmd)
- `layers.mmd` - [Diagrama de Capas](docs/diagrams/layers.mmd)

Si tu plataforma (GitHub/GitLab) soporta Mermaid, estos archivos se renderizarán automáticamente. Si quieres archivos SVG renderizados, dime y los genero.


### Frontend (TypeScript/Angular)
- ✅ **Modelos:** UserAuth, UserPayload, LoginResponse, Project, Funnel
- ✅ **Servicios:** AuthService, ProjectService, FunnelPathService
- ✅ **Guards:** authGuard, adminGuard
- ✅ **Componentes:** App root component
- ✅ **Directivas:** TrackClickDirective


---

## 🏗️ Estructura del Proyecto

```
SPA-Personal-ProjectsDisplay/
├── docs/                          ← 📍 NUEVA CARPETA
│   ├── ARCHITECTURE.md            ← 📍 NUEVO
│   ├── DESIGN.md                  ← 📍 NUEVO
│   └── README.md                  ← 📍 Este archivo
│
├── SPA-Personal-Backend/
│   └── src/main/java/com/personalspa/personalpage/
│       ├── entities/              ✅ Comentarios agregados
│       ├── services/              ✅ Comentarios agregados
│       ├── controllers/           ✅ Comentarios agregados
│       └── ...
│
└── SPA-Personal-Frontend/
    └── src/app/
        ├── models/                ✅ Comentarios agregados
        ├── services/              ✅ Comentarios agregados
        ├── guards/                ✅ Comentarios agregados
        ├── components/            ✅ Componentes documentados
        └── directives/            ✅ Comentarios agregados
```

---

## Documentación

### Para Nuevos Desarrolladores
1. Lee [ARCHITECTURE.md](./ARCHITECTURE.md) para entender el proyecto
2. Visualiza los diagramas Mermaid para ver flujos [diagrams/](./diagrams/)
3. Lee [DESIGN.md](./DESIGN.md) para detalles técnicos
---

## 📚 Recursos Adicionales

### Backend
- Application properties: `application.properties`
- Maven config: `pom.xml`
- Security config: `SecurityConfig.java`

### Frontend
- Angular routes: `app.routes.ts`
- Proxy config: `proxy.conf.json`
- Global styles: `styles.css`

---

**¿Necesitas más detalle sobre algo?** Consulta:
- ¿Qué hace un componente específico? → Busca en [DESIGN.md](./DESIGN.md)
- ¿Cómo funciona la autenticación? → Lee el flujo en [ARCHITECTURE.md](./ARCHITECTURE.md)
- ¿Cómo está estructurado el código? → Revisa los diagramas Mermaid en [Diagramas/](./diagrams/)

**Última actualización:** 10 Febrero 2026