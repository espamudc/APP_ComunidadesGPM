import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
   let authLogin =localStorage.getItem("authService");
    if (!authLogin) {
        this.router.navigate(['/validar-usuario']);
        return false;
    }
    return true;
}


}
