import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CabeceraRespuestaService {
  constructor(private http: HttpClient) { }
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
  _updateCoordendas(id, latitud, longitud) {
    const _body = new HttpParams()
    .set('id', id)
    .set('latitud', latitud)
    .set('longitud', longitud)
    return new Promise((resolve, reject) => {
      this.http.post(url + '/update/coordenadas', _body.toString(), { headers: this._header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  _consultarporidasignarencuestado(_idAsignarEncuestadoEncriptado) {
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url + 'cabecerarespuesta_consultarporidasignarencuestado?_idAsignarEncuestadoEncriptado=' + _idAsignarEncuestadoEncriptado, _body.toString(), { headers: this._header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  insertarcabecerarespuesta(
    _idAsignarEncuestadoEncriptado
  ) {
    const _body = new HttpParams()
      .set('AsignarEncuestado.IdAsignarEncuestadoEncriptado', _idAsignarEncuestadoEncriptado);
    return new Promise((resolve, reject) => {
      this.http.post(url + 'cabecerarespuesta_insertar', _body.toString(), { headers: this._header })
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
