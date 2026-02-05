import { Project } from '../models/project.model';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Web',
    description: 'Sitio web personal con galería de proyectos y blog integrado',
    imageUrl: 'https://st.depositphotos.com/2935381/4189/i/950/depositphotos_41897159-stock-photo-example-concept.jpg',
    isPublic: true,
    technology: ['Angular', 'TypeScript', 'CSS'],
    argument: 'Creé este portfolio para mostrar mi trabajo y practicar buenas prácticas de UI/UX.',
    attributes: [
      { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop', caption: 'Pantalla principal con galería de proyectos' },
      { url: 'https://st.depositphotos.com/2935381/4189/i/950/depositphotos_41897159-stock-photo-example-concept.jpg', caption: 'Versión móvil responsiva' },
      { url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop', caption: 'Detalle de proyecto con imágenes y descripciones' }
    ],
    docsUrl: 'https://example.com/docs/portfolio',
    readmeUrl: 'https://example.com/readme/portfolio',
    repoUrl: 'https://github.com/example/portfolio'
  },
  {
    id: '2',
    title: 'App Mobile Fitness',
    description: 'Aplicación de seguimiento de ejercicios con análisis de progreso',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    isPublic: true,
    technology: ['Ionic', 'Angular', 'Capacitor'],
    argument: 'Desarrollé esta app para ayudar a los usuarios a mantener hábitos saludables y medir progreso.',
    attributes: [
      { url: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800&h=500&fit=crop', caption: 'Pantalla de seguimiento de entrenos' },
      { url: 'https://st.depositphotos.com/2935381/4189/i/950/depositphotos_41897159-stock-photo-example-concept.jpg', caption: 'Estadísticas y análisis' },
      { url: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=500&fit=crop', caption: 'Integración con sensores' }
    ],
    docsUrl: 'https://example.com/docs/fitness',
    readmeUrl: 'https://example.com/readme/fitness',
    repoUrl: 'https://github.com/example/fitness-app'
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Sistema de análisis de datos en tiempo real con visualizaciones avanzadas',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    isPublic: true,
    technology: ['D3', 'Node.js', 'WebSocket'],
    argument: 'Proyecto para explorar visualizaciones en tiempo real y rendimiento.',
    attributes: [
      { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop', caption: 'Gráficas interactivas' },
      { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop', caption: 'Panel con filtros y export' },
      { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop', caption: 'Monitoreo en tiempo real' }
    ],
    docsUrl: 'https://example.com/docs/dashboard',
    readmeUrl: 'https://example.com/readme/dashboard',
    repoUrl: 'https://github.com/example/dashboard'
  }
];
