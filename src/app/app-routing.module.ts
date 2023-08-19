import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PostComponent } from './components/post/post.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path:'',component:DashboardComponent , canActivate:[AuthGuard],
  },
  {
    path:'categories' , component:CategoriesComponent ,canActivate:[AuthGuard],
  },{
    path:'post', component:PostComponent ,canActivate:[AuthGuard],
  },
  {
    path:'newPost' , component:PostNewComponent, canActivate:[AuthGuard],
  },
  {
    path:'login',component:LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
