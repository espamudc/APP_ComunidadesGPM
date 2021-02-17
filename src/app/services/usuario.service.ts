import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  _validarCorreo(correo: string, token: string = '') {
    const body = new HttpParams()
      .set('Correo', correo)
      .set('Token', token);
    return new Promise((resolve, reject) => {
      this.http.post(url + 'ValidarCorreo', body.toString(), { headers: this._header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  _login(correo: string, clave: string, token: string = '') {
    const body = new HttpParams()
      .set('Correo', correo)
      .set('Clave', clave)
      .set('Token', token);
    return new Promise((resolve, reject) => {
      this.http.post(url + 'Login', body.toString(), { headers: this._header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
