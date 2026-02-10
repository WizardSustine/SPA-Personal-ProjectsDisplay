
/** Modelo de funnel que registra rutas de navegacion de visitantes */
export interface Funnel{
    id?: string;               // ID unico de sesion
    createdAt?: number;        // Timestamp (ms) de inicio
    endAt?: number;            // Timestamp (ms) de fin de sesion
    visitorPaths: string[];    // Array de rutas visitadas
}