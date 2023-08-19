import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private logService:LoginService, private router:Router ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
       if(localStorage.getItem('user')){
        
        console.log(localStorage.getItem('user'),'hello')
        return true
       }
       else{
        return false
       }
      // if(!this.logService.authStatus){
      //   return false

      // }
      // else{
      //   return true
      // }


  }
  
}
