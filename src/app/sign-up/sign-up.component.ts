import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { login, SignUp } from '../data-type';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  showLogin = false;
  authError: string = '';
  isLoginError= new EventEmitter<boolean>(false)
  constructor(private user: UserService , private router: Router) { }
  ngOnInit() : void{
    this.user.reloadSeller();
  }
  signUp(data: SignUp): void {
    this.user.userSignUp(data);
  }


  LogIn(data: login): void {
    this.authError = " ";
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((isError)=>{
      if(isError){
      this.authError = "Email or password is not correct";
      }
    })
  }

  openLogin() {
    this.showLogin = !this.showLogin;
  }
}
