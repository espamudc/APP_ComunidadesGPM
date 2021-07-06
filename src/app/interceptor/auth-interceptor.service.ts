import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router,    public usuarioService:  UsuarioService,) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem('token');

    let request = req;

    if(!req['url'].includes('ValidarCorreo') && !req['url'].includes('Login') && !req['url'].includes('token/update')){
      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${ token }`
          }
        });
      }
     }



    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        //token expirado o token no válido
        if (err.status === 401) {
          this.usuarioService._updatetoken(localStorage.getItem('_correo')) 
          this.router.navigateByUrl('/tabs/home');
        }
        return throwError( err );
      })
    );
  }

}
