import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  constructor(private http: HttpClient) { }
  reporteEjecutivo(idComunidad: string) {
    const urlApi = url + `reporte/ejecutivo?_idComunidad=${idComunidad}`;
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
