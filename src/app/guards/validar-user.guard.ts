import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ValidarUserGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    let authLogin =localStorage.getItem("validarUser");
     if (!authLogin) {
         this.router.navigate(['/validar-usuario']);
         return false;
     }
     return true;
 }
  
}
