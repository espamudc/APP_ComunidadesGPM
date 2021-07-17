import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AsignarEncuestadoService {
  constructor(private http: HttpClient) { }
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  _consultarporidasignarencuestado(_idAsignarEncuestadoEncriptado) {
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url + 'asignarencuestado_consultar?_idAsignarEncuestadoEncriptado=' + _idAsignarEncuestadoEncriptado, _body.toString(), { headers: this._header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  _consultarporidasignarusuariotipousuariotecnico(_idAsignarUsuarioTipoUsuarioTecnicoEncriptado) {
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url + 'asignarencuestado_consultarporidasignarusuariotipousuariotecnico?_idAsignarUsuarioTipoUsuarioTecnicoEncriptado=' + _idAsignarUsuarioTipoUsuarioTecnicoEncriptado, _body.toString(), { headers: this._header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  mostrarEncuestasPorTecnico(_idTipoUsuarioTecnico:string) {
    const urlApi = url + `cuestionarios/nuevos/tecnico?idUsuarioTipoUsuarioTecnico=${_idTipoUsuarioTecnico}`;
    return new Promise((resolve, reject) => {
      this.http.get(urlApi)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  
  _consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
    _IdAsignarUsuarioTipoUsuarioEncriptado:any
  ){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarresponsable_consultarporidasignarusuariotipousuario?_idAsignarUsuarioTipoUsuarioEncriptado='+_IdAsignarUsuarioTipoUsuarioEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _consultarCabeceraVersionCuestionario(
    _IdCuestionarioGenericoEncriptado
  ){
    const _body = new HttpParams()
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraversioncuestionario_consultarporidcuestionariogenerico?_idCuestionarioGenericoEncriptado='+_IdCuestionarioGenericoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _consultarComunidadesPorVersion(
    _CodigoCuestionarioEncriptado:any,
    _CodigoVersionEncriptado:any,
  ){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'comunidad_consultarporversion?_idCuestionarioEncriptado='+_CodigoCuestionarioEncriptado+'&_idCabeceraVersionCuestionarioEncriptado='+_CodigoVersionEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _cuestionariogenerico_consultarporpreguntaRandom(IdCuestionarioGenericoEncriptado, IdCabeceraVersionCuestionarioEncriptado, IdComunidadEncriptado)
  {
    const _body = new HttpParams();
     return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariogenerico_consultarporpreguntasRandom?_idCuestionarioGenericoEncriptado='+IdCuestionarioGenericoEncriptado+'&_idCabeceraVersionCuestionarioEncriptado='+IdCabeceraVersionCuestionarioEncriptado+'&_idComunidadEncriptado='+IdComunidadEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
