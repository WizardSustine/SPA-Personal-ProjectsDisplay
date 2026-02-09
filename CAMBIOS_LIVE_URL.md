# Agregación de Campo Live URL (Ver en Vivo)

## Resumen
Se ha agregado un nuevo campo `liveUrl` a los proyectos para permitir enlazar a versiones desplegadas en producción de los proyectos.

## Cambios Realizados

### Backend (SPA-Personal-Backend)

#### Project.java
- **Campo nuevo**: `private String liveUrl;`
- **Constructor actualizado**: Incluye parámetro `liveUrl`
- **Getter**: `public String getLiveUrl(){ return liveUrl; }`
- **Setter**: `public void setLiveUrl(String liveUrl){ this.liveUrl = liveUrl; }`

### Frontend (SPA-Personal-Frontend)

#### Modelos
**project.model.ts**
- Agregado campo opcional `liveUrl?: string;` a la interfaz `Project`

#### Componentes

**project-detail.component.ts**
- Nuevo botón "🚀 Ver en vivo" en la sección de links
- Mostrado solo si `project.liveUrl` está definido
- Estilos especiales:
  - Color verde con fondo claro
  - Transición suave al hover
  - Prioridad visual (aparece primero que otros links)

**project-edit.component.ts**
- Nuevo input: "URL en Vivo (proyecto desplegado)"
- Placeholder: `https://ejemplo.com`
- Campo opcional, no requerido
- Posicionado después de "Repo URL" en el formulario

#### Datos Mock
**mock-projects.ts**
- Proyecto 1 (Portfolio Web): `liveUrl: 'https://portfolio-example.com'`
- Proyecto 2 (App Mobile Fitness): `liveUrl: 'https://fitness-app-example.com'`
- Proyecto 3 (Dashboard Analytics): Sin `liveUrl` (opcional)

## Comportamiento

### En la Vista de Detalle
- Si el proyecto tiene `liveUrl`, se muestra un botón destacado
- El botón abre la URL en una nueva pestaña (`target="_blank"`)
- Se aplican estilos especiales para que destaque (verde, icono 🚀)

### En la Vista de Edición
- Campo de entrada para capturar la URL
- Totalmente opcional
- Se valida que sea una URL válida (validación opcional)

### Persistencia
- El campo se almacena en la base de datos del backend
- Se sincroniza automáticamente con el frontend
- Se preserva al editar otros campos del proyecto

## Ejemplos de Uso

```typescript
// En proyecto
project.liveUrl = 'https://mi-aplicacion.vercel.app'
// o
project.liveUrl = 'https://ejemplo.herokuapp.com'
// o para apps móviles
project.liveUrl = 'https://app-store-link-aqui'
```

## Ventajas

1. **Acceso directo**: Los visitantes pueden ver los proyectos en funcionamiento sin buscar
2. **Demostración**: Mejor para mostrar las capacidades del proyecto
3. **Portfolio profesional**: Añade credibilidad al mostrar que los proyectos están en producción
4. **Flexible**: Opcional, no es obligatorio tener URL en vivo

## Notas Técnicas

- El campo es nullable en el backend
- En el frontend se usa `*ngIf="project.liveUrl"` para renderizado condicional
- No se requiere migración de base de datos si ya existe la columna
- Compatible con cualquier tipo de URL (sitios web, aplicaciones, etc.)
