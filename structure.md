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