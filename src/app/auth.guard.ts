import { CanActivateFn , Router} from '@angular/router';
import {inject} from '@angular/core'

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedUser = localStorage.getItem('user');
  if(loggedUser != null){
    return true;
  }else {
    router.navigateByUrl('user-auth')
    return false;
  }
};
