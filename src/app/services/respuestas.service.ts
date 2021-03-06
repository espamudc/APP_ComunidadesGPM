import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
  constructor(private http: HttpClient) { }
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  respuesta_insertar(
    _IdCabeceraRespuestaEncriptado,
    _IdPreguntaEncriptado,
    _IdRespuestaLogicaEncriptado,
    _IdAsignarEncuestadoEncriptado,
    _Identificador,
    _descripcion,
  ) {
    const _body = new HttpParams()
      .set('CabeceraRespuesta.IdCabeceraRespuestaEncriptado', _IdCabeceraRespuestaEncriptado)
      .set('Pregunta.IdPreguntaEncriptado', _IdPreguntaEncriptado)
      .set('IdRespuestaLogicaEncriptado', _IdRespuestaLogicaEncriptado)
      .set('CabeceraRespuesta.AsignarEncuestado.IdAsignarEncuestadoEncriptado', _IdAsignarEncuestadoEncriptado)
      .set('Pregunta.TipoPregunta.Identificador', _Identificador,)
      .set('DescripcionRespuestaAbierta', _descripcion);
    return new Promise((resolve, reject) => {
      this.http.post(url + 'respuesta_insertaropcionseleccionunica', _body.toString(), { headers: this._header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  insertar_DatosRespuesta(
    _datos,
    _DescripcionRespuestaAbierta,
    _IdAsignarEncuestado,
    _IdPregunta
  ) {
    const _body = new HttpParams()
      .set('datos', _datos)
      .set('DescripcionRespuestaAbierta', _DescripcionRespuestaAbierta)
      .set('IdAsignarEncuestado', _IdAsignarEncuestado)
      .set('IdPregunta', _IdPregunta);
    return new Promise((resolve, reject) => {
      this.http.post(url + 'datosrespuesta', _body.toString(), { headers: this._header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  consultarRespuestaPorPreguna(_IdAsignarEncuestado: string, _IdPregunta: string) {
    const urlApi = url + `/respuestas/pregunta?_IdAsignarEncuestado=${_IdAsignarEncuestado}&_IdPregunta=${_IdPregunta}`;
    return new Promise((resolve, reject) => {
      this.http.get(urlApi)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);

        });
    });
  }
  consultarRespuestaPorPreguntaSeleccion(_IdPregunta: string, _IdAsignarEncuestado: string,) {
    const urlApi = url + `/respuestas/pregunta/seleccion?_IdPregunta=${_IdPregunta}&_IdAsignarEncuestado=${_IdAsignarEncuestado}`;
    return new Promise((resolve, reject) => {
      this.http.get(urlApi)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  consultarRespuestaPorPreguntaAbierta(_IdPregunta: string, _IdAsignarEncuestado: string,) {
    const urlApi = url + `/respuestas/pregunta/abierta?_IdPregunta=${_IdPregunta}&_IdAsignarEncuestado=${_IdAsignarEncuestado}`;
    return new Promise((resolve, reject) => {
      this.http.get(urlApi)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  consultarPreguntaEncajonada(IdOpcionPreguntaSeleccion: string) {
    const urlApi = url + `/respuestas/pregunta?IdOpcionPreguntaSeleccion=${IdOpcionPreguntaSeleccion}`;
    return new Promise((resolve, reject) => {
      this.http.get(urlApi)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  respuesta_consultarporidcabecerarespuesta(_IdCabeceraRespuestaEncriptado) {
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url + 'respuesta_consultarporidcabecerarespuesta?_idCabeceraRespuestaEncriptado=' + _IdCabeceraRespuestaEncriptado, _body.toString(), { headers: this._header })
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
