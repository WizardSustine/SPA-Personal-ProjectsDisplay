/** Modelo de proyecto para visualizacion y edicion */
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isPublic: boolean;
  technology?: string[];      // Stack tecnologico utilizado
  argument?: string;           // Propuesta de valor
  attributes?: { url: string; caption: string }[];  // URLs y descripciones adicionales
  docsUrl?: string;           // URL a documentacion
  readmeUrl?: string;         // URL a archivo README
  repoUrl?: string;           // URL a repositorio Git
  liveUrl?: string | null;    // URL a demo en vivo
}
