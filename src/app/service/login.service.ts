import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authStatus:boolean = false ;
  islogged:boolean = false ;
  loggedIn$:Subject<boolean> = new Subject<boolean>()

  constructor ( 
    private router:Router,
     private autheticationService:AngularFireAuth, private toastr:ToastrService ) { }


  register(email:string,password:string){
    this.autheticationService.createUserWithEmailAndPassword(email,password).then(()=>{
      this.toastr.success('User Created successfully')
    }).catch(err=>{
      this.toastr.error('Failed to add user')
    })
  }
  
   async login(email:string,password:string){

    await this.autheticationService.signInWithEmailAndPassword(email,password).then((res)=>{

      
        console.log(res,'main res')
        this.loggedIn$.next(true)
        this.islogged = true;
        this.authStatus = true;
         this.loadUser()
        
        this.toastr.success('User LoggedIn successfully')
        this.router.navigate([''])
      }
    
    
    ).catch(()=>{
      this.toastr.error("Failed to Login")
    })
  }

  async loadUser(){
    await this.autheticationService.authState.subscribe(res => {
      console.log(res?.email,'res');
      // const email = res?.email;
      // const emailObject = {
      //   "email":email
      // }

      // localStorage.setItem('user',(res?.email))
      // localStorage.setItem('email',JSON.stringify(emailObject))
      // console.log( JSON.parse(JSON.stringify(res)) ,'user detail')
      localStorage.setItem('user',JSON.stringify(res))

      // localStorage.setItem('user',res)
    })
  }


  async  logout(){
    
  await this.autheticationService.signOut().then(()=>{
        this.toastr.success('Logout successfully')
        localStorage.removeItem('user')
        this.loggedIn$.next(false)
        this.islogged = false
        this.authStatus = false
        this.router.navigate(['/login'])
      })
    }

  isLoggedIn(){
    return this.loggedIn$.asObservable()  
  }
  

  

}
