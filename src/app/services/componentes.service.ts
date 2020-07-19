import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ComponentesService {
  constructor(private http: HttpClient) { }
  componentesPorEncuesta(_idCuestionarioGenerioEncriptado:string) {
    const urlApi = url + `/componente/cuestionario?_idCuestionarioGenerioEncriptado=${_idCuestionarioGenerioEncriptado}`;
    return new Promise((resolve, reject) => {
      this.http.get(urlApi)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
