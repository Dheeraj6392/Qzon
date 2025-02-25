import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { SearchComponent } from './search/search.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ImgCapture',
    component: ImageCaptureComponent,
    canActivate : [authGuard]
  },
  {
    path: 'user-auth',
    component: SignUpComponent
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate : [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
