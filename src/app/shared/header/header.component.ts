import { JsonPipe } from '@angular/common';
import { Component, DoCheck, LOCALE_ID, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { loadBundle } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  logStatus:boolean = false ;
  email!:any;
  isloggedIn$!:Observable<boolean>;

  constructor(private router : Router, private authenticationService:LoginService ){

    this.authenticationService.isLoggedIn().subscribe((res)=>{
      this.logStatus = res;
      console.log(this.logStatus)
    } )
  }
  ngOnInit(): void {

    console.log('header is called ')
    
 

    
    // console.log(localStorage.getItem('user'),'uuuuu');
     const usrs =  JSON.stringify(localStorage.getItem('user'))
   
    console.log(this.logStatus,'authstatus' )

   
     this.email =  JSON.parse (JSON.parse( JSON.stringify( localStorage.getItem('user'))))?.email

    
    
    // this.isloggedIn$ =
    console.log('before authservice')
     this.authenticationService.isLoggedIn().subscribe((res)=>{
      this.logStatus = res;
      console.log(res,'lgoin')
      this.router.navigate([''])
    } )
    console.log('after authservice')
  }


  ngDoCheck(){
    this.email =  JSON.parse (JSON.parse( JSON.stringify( localStorage.getItem('user'))))?.email
    this.authenticationService.isLoggedIn().subscribe((res)=>{
      this.logStatus = res;
      console.log(res,'lgoin')
      this.router.navigate([''])
    } )
    
  }

  logout(){
    // localStorage.removeItem('email')
    // this.router.navigate(['/login'])
    this.authenticationService.logout()
  }

}
