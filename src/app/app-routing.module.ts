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
    path:'dashboard',component:DashboardComponent ,
  },
  {
    path:'categories' , component:CategoriesComponent ,
  },{
    path:'post', component:PostComponent ,
  },
  {
    path:'newPost' , component:PostNewComponent, 
  },
  {
    path:'',component:LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
