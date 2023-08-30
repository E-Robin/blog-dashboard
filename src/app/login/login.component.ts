import { Component, ViewChild } from '@angular/core';
import { LoginService } from '../service/login.service';
import { NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm!: NgForm;   
  @ViewChild('registerForm') registerFormss!:NgForm
  loginStatus:boolean = true;

  constructor(private _loginService:LoginService,private router:Router ){

    // if(localStorage.getItem('user')){
    //   this.router.navigate(['/dashboard'])
    // }
    const email =  JSON.parse (JSON.parse( JSON.stringify( localStorage.getItem('user'))))?.email
    if(email){
      this.router.navigate(['/dashboard'])
    }

  }

  isLogin(){
    this.loginStatus = !this.loginStatus
    console.log(this.loginStatus)
  }

  register(registerForm:any){

    const email = registerForm.value.email
    const password  = registerForm.value.password
    const user = {
      email : email,
      password:password
    }
    console.log(user)
   
    this._loginService.register(email,password)
    // registerForm.form.reset()
    // this.loginForm.reset()
    this.registerFormss.reset()
    
  }

  login(loginForm:any){
    const email = loginForm.value.email
    const password  = loginForm.value.password
    this._loginService.login(email,password)
    
    // .then( (res)=>{
    //   console.log(res,'hhhh')
    // })

    // two way to reset form by viewChild method and loginForm parameter reset method
    // loginForm.form.reset()
    this.loginForm.reset()
  }

}
