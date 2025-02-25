import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { login, SignUp } from './data-type';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(
    private http: HttpClient, 
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: object  // ✅ Inject PLATFORM_ID
  ) { }

  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          if (isPlatformBrowser(this.platformId)) {  // ✅ Ensure it's running in browser
            localStorage.setItem('user', JSON.stringify(result.body));
          }
          this.router.navigate(['home']);
        }
      });
  }

  reloadSeller() {
    if (isPlatformBrowser(this.platformId)) {  // ✅ Check before accessing localStorage
      if (localStorage.getItem('user')) {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['home']);
      }
    } else {
      console.warn("localStorage is not available in SSR.");
    }
  }

  userLogin(data: login) {
    this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, 
      { observe: 'response' })
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length === 1) {
          this.isLoginError.emit(false);
          if (isPlatformBrowser(this.platformId)) {  // ✅ Ensure it's running in browser
            localStorage.setItem('user', JSON.stringify(result.body));
          }
          this.router.navigate(['home']);
        } else {
          console.warn("Login failed");
          this.isLoginError.emit(true);
        }
      });
  }
}
