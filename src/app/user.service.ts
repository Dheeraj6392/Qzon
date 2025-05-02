import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { List, login, SignUp } from './data-type';
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
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  userSignUp(data: SignUp) {
    // Simulate sign-up (no POST possible on GitHub Pages)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    this.router.navigate(['home']);
  }

  reloadSeller() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('user')) {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['home']);
      }
    }
  }

  userLogin(data: login) {
    this.http.get<any>('db.json').pipe(
      map(res => res.user)
    ).subscribe((users: any[]) => {
      const matchedUser = users.find(u => u.email === data.email && u.password === data.password);
      if (matchedUser) {
        this.isLoginError.emit(false);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify(matchedUser));
        }
        this.router.navigate(['home']);
      } else {
        this.isLoginError.emit(true);
      }
    });
  }

  insertQp(data: List): Observable<any> {
    // Simulated insert (not supported on GitHub Pages)
    return of({ success: true, message: 'Saved locally (simulation)' });
  }

  getQp(): Observable<any[]> {
    return this.http.get<any>('db.json').pipe(
      map(res => res.qPapers)
    );
  }
}
