import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AsignarEncuestadoService {
  constructor(private http: HttpClient) { }
  
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
 
  _consultarporidasignarusuariotipousuariotecnico(_idAsignarUsuarioTipoUsuarioTecnicoEncriptado){
    const _body = new HttpParams();
    // debugger
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarencuestado_consultarporidasignarusuariotipousuariotecnico?_idAsignarUsuarioTipoUsuarioTecnicoEncriptado='+_idAsignarUsuarioTipoUsuarioTecnicoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
