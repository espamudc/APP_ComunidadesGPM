import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http: HttpClient) { }
  
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarOpcionPreguntaSeleccion(
    _IdPreguntaEncriptado
    
  ){
    const _body = new HttpParams()
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'opcionpreguntaseleccion_consultarporidpregunta?_idPreguntaEncriptado='+_IdPreguntaEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarOpcionUnoPreguntaMatriz(
    _IdPreguntaEncriptado
  ){
    const _body = new HttpParams()
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'opcionunomatriz_consultarporidpregunta?_idPreguntaEncriptado='+_IdPreguntaEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarPreguntaConfigurarMatriz(
    _IdPreguntaEncriptado,
  ){
    const _body = new HttpParams()
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'configurarmatriz_consultarporidpregunta?_idPreguntaEncriptado='+_IdPreguntaEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}