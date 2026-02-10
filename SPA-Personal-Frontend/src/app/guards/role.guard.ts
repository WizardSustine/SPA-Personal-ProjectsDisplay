import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard que protege rutas requiriendo rol de admin o master.
 * Se utiliza para rutas de administracion.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.hasAnyRole(['admin', 'master'])) return true;
  router.navigate(['/login']);
  return false;
};
