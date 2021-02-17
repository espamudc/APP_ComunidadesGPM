import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  cuestionario:any=[];
  constructor( private storage: Storage) { }
  _dataCuestionarios(){
     localStorage.removeItem('IdAsignarEncuestadoEncriptado');
     this.cuestionario=[];
     this.storage.get('cuestionarios').then((val) => {  
       let valor= val[0].EstadoCuestionarios;
       this.cuestionario.push(...val[1].respuesta.filter(cues =>cues.CuestionarioFinalizado === valor));
     });
     return this.cuestionario;
   }
}
