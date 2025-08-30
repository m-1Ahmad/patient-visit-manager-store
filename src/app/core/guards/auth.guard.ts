import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(!auth.isLoggedIn()){
    router.navigate(['/auth/login']);
    return false;
  }
  const allowed = route.data['roles'] as string[];
  const role = auth.getRole();
  if(allowed && role && !allowed.includes(role)){
    router.navigate(['/auth/unauthorized']);
    return false;
  }
  return true;
};
