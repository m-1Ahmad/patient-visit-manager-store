import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth/auth.state';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  const isLoggedIn = store.selectSnapshot(AuthState.isLoggedIn);
  if (!isLoggedIn) {
    router.navigate(['/auth/login']);
    return false;
  }

  const allowed = route.data['roles'] as string[] | undefined;
  const role = store.selectSnapshot(AuthState.role);
  if (allowed && role && !allowed.includes(role)) {
    router.navigate(['/auth/unauthorized']);
    return false;
  }

  return true;
};
