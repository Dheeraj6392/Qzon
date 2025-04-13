import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core'

import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      return true;
    } else {
      router.navigateByUrl('user-auth');
    }
  } else {
    console.warn('localStorage is not available in SSR.');
  }

  return false;
};
