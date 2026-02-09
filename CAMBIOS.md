# Cambios en Autenticación y Gestión de Usuarios

## Resumen de Cambios

Implementé cambios en los sistemas de login, registro y gestión de usuarios para soportar tres roles: `user`, `admin` y `master`.

Además agregué un nuevo campo `liveUrl` a los proyectos para permitir enlazar a versiones desplegadas en producción de los proyectos.

## Backend (SPA-Personal-Backend)

### Cambios en Entidades
- **UserApp.java**: Añadí getters y setters para el ID que estaban faltando

### Cambios en Controllers
- **AuthController.java**: Implementé correctamente:
  - Login con autenticación y generación de JWT con roles
  - Registro con asignación de rol por defecto `USER` (solo `user` en registro público)
  
### Cambios en UserAppController.java
- Endpoints disponibles en `/manage`:
  - `GET /manage/users/all` - Listar todos los usuarios
  - `GET /manage/users/{email}` - Obtener usuario por email
  - `PUT /manage/users/update/{id}` - Actualizar usuario (rol)
  - `POST /manage/users/delete/{id}` - Eliminar usuario
  - `POST /manage/users/save` - Guardar nuevo usuario

## Frontend (SPA-Personal-Frontend)

### 1. Modelos Actualizados
**src/app/models/user.model.ts**
- `UserAuth`: Interface para credenciales de login/registro
- `UserPayload`: Información del usuario autenticado con rol
- `LoginResponse`: Respuesta del servidor con token
- `AuthResponse`: Respuesta genérica de autenticación

### 2. AuthService Completamente Refactorizado
**src/app/services/auth.service.ts**
- Integración real con API REST (no más mocks)
- Métodos:
  - `login(email, password)`: Autenticación contra API
  - `register(email, password, username)`: Registro de nuevo usuario (siempre con rol `user`)
  - `logout()`: Cierre de sesión
  - `isAuthenticated()`: Verificar si usuario está logueado
  - `hasRole(role)`: Verificar si tiene un rol específico
  - `hasAnyRole(roles[])`: Verificar si tiene alguno de los roles
  - `getAllUsers()`: Obtener lista de usuarios (admin/master)
  - `updateUserRole(userId, role)`: Cambiar rol de usuario (admin/master)
  - `deleteUser(userId)`: Eliminar usuario (admin/master)
- Decodificación automática de JWT para extraer información del usuario
- Manejo robusto de errores

### 3. Componente Login Actualizado
**src/app/components/login.component.ts**
- Interfaz mejorada con indicadores de carga
- Mensajes de error claros
- Disabled de inputs durante autenticación
- Validación de campos

### 4. Componente Register Actualizado
**src/app/components/register.component.ts**
- Nuevo campo: `username`
- Interfaz mejorada con indicadores de carga
- Mensajes de error claros
- **Importante**: Siempre registra con rol `user` (sin opción para seleccionar otros roles)
- Validación de campos

### 5. Nuevo Componente: User Admin
**src/app/components/user-admin.component.ts**
- Acceso exclusivo para usuarios con rol `admin` o `master`
- Funcionalidades:
  - Listar todos los usuarios
  - Cambiar rol de usuarios (user → admin → master)
  - Eliminar usuarios
  - Protección: no permite eliminarse a sí mismo
  - Interfaz con tabla responsive
  - Mensajes de éxito/error

### 6. Rutas Actualizadas
**src/app/app.routes.ts**
- Nueva ruta: `/admin/users` → `UserAdminComponent` (protegida con `adminGuard`)
- Importado `UserAdminComponent`

### 7. Guard de Roles Actualizado
**src/app/guards/role.guard.ts**
- Modificado `adminGuard` para aceptar tanto `admin` como `master`
- Usa nuevo método `hasAnyRole(['admin', 'master'])`

### 8. Navegación Principal Actualizada
**src/app/app.html**
- Mostrar rol del usuario (ADMIN/MASTER) cuando está autenticado
- Link directo a `/admin/users` para admin/master

## Flujos de Uso

### Registro de Nuevo Usuario
1. Usuario accede a `/register`
2. Ingresa: usuario, email, contraseña
3. Se envía a `POST /api/auth/register`
4. Se registra automáticamente con rol `USER`
5. Se hace login automático
6. Se redirige a inicio

### Login
1. Usuario accede a `/login`
2. Ingresa: email, contraseña
3. Se envía a `POST /api/auth/login`
4. Se recibe JWT con roles
5. Se extrae rol del JWT
6. Se almacena en sessionStorage
7. Se redirige a inicio

### Gestión de Usuarios (Admin/Master)
1. Usuario logueado como `admin` o `master` accede a `/admin/users`
2. Se carga lista de usuarios desde `GET /api/manage/users/all`
3. Puede:
   - Cambiar rol de usuario: `PUT /api/manage/users/update/{id}`
   - Eliminar usuario: `POST /api/manage/users/delete/{id}`
4. Cambios se aplican inmediatamente

## Restricciones de Seguridad

- **Registro público**: Solo asigna rol `USER`
- **Panel de usuarios**: Solo accesible para `admin` o `master`
- **Cambio de rol**: Solo pueden realizarlo `admin` o `master`
- **Eliminación de usuarios**: Solo pueden realizarla `admin` o `master`
- **Autoeliminación**: Un usuario no puede eliminarse a sí mismo
- **JWT**: Se valida en cada petición protegida

## Próximas Mejoras Sugeridas

1. Agregar autenticación bidireccional en el backend (validar JWT)
2. Implementar roles más granulares con permisos específicos
3. Agregar auditoría de cambios en usuarios
4. Implementar reseteo de contraseña
5. Agregar dos factores de autenticación (2FA)
6. Implementar refresh tokens
