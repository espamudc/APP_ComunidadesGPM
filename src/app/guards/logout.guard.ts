import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    let authLogin =localStorage.getItem("authService");
     if (authLogin) {
         this.router.navigate(['/tabs/roles']);
         return true;
     }
     return false;
 }
  
}
