import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    debugger
    let authLogin =localStorage.getItem("authService");
     if (authLogin) {
         return true;
     }
   //  this.router.navigate(['/validar-usuario']);
     return false;
  }
}
