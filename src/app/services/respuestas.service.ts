import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  respuesta_insertarpreguntaabierta(
    _IdCabeceraRespuestaEncriptado,
    _IdPreguntaEncriptado,
    _DescripcionRespuestaAbierta,
  ){

    const _body = new HttpParams()
      .set('CabeceraRespuesta.IdCabeceraRespuestaEncriptado',_IdCabeceraRespuestaEncriptado)
      .set('Pregunta.IdPreguntaEncriptado',_IdPreguntaEncriptado)
      .set('DescripcionRespuestaAbierta',_DescripcionRespuestaAbierta)
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'respuesta_insertarpreguntaabierta',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  respuesta_insertaropcionseleccionunica(
    _IdCabeceraRespuestaEncriptado,
    _IdPreguntaEncriptado,
    _IdRespuestaLogicaEncriptado,
  ){

    const _body = new HttpParams()
      .set('CabeceraRespuesta.IdCabeceraRespuestaEncriptado',_IdCabeceraRespuestaEncriptado)
      .set('Pregunta.IdPreguntaEncriptado',_IdPreguntaEncriptado)
      .set('IdRespuestaLogicaEncriptado',_IdRespuestaLogicaEncriptado)
    ;
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'respuesta_insertaropcionseleccionunica',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  respuesta_insertaropcionseleccionmultiple(
    _IdCabeceraRespuestaEncriptado,
    _IdPreguntaEncriptado,
    _IdRespuestaLogicaEncriptado,
  ){

    const _body = new HttpParams()
      .set('CabeceraRespuesta.IdCabeceraRespuestaEncriptado',_IdCabeceraRespuestaEncriptado)
      .set('Pregunta.IdPreguntaEncriptado',_IdPreguntaEncriptado)
      .set('IdRespuestaLogicaEncriptado',_IdRespuestaLogicaEncriptado)
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'respuesta_insertaropcionseleccionmultiple',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  respuesta_insertarconfigurarmatriz(
    _IdCabeceraRespuestaEncriptado,
    _IdPreguntaEncriptado,
    _IdRespuestaLogicaEncriptado, // _idConfigurarMatriz
  ){

    const _body = new HttpParams()
      .set('CabeceraRespuesta.IdCabeceraRespuestaEncriptado',_IdCabeceraRespuestaEncriptado)
      .set('Pregunta.IdPreguntaEncriptado',_IdPreguntaEncriptado)
      .set('IdRespuestaLogicaEncriptado',_IdRespuestaLogicaEncriptado)
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'respuesta_insertarconfigurarmatriz',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  respuesta_consultarporidcabecerarespuesta(_IdCabeceraRespuestaEncriptado){
    const _body = new HttpParams();

    return new Promise((resolve,reject)=>{
      this.http.post(url+'respuesta_consultarporidcabecerarespuesta?_idCabeceraRespuestaEncriptado='+_IdCabeceraRespuestaEncriptado,_body.toString(),{headers:this._header})
                .subscribe((res)=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }


}
