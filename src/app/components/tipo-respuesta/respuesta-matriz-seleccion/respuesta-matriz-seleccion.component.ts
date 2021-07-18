import { Component, OnInit,Input } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { ToastController } from '@ionic/angular';
interface Nivel {
  idNivel: string
  nivel: string
  idConfiguracionMatriz: string,
  estado: string,
  totalrespuesta:string
}
interface Opciones {
  idOpciones: string
  opciones: string
  nivel: Array<Nivel>
  dataRespuesta: string
}
interface Respuesta {
  idRespuestaLogica: string
  descripcion: string
  dataRespuesta: string
}
interface MatrizDesing {
  leyendaLateral: string,
  leyendaSuperior: string,
  opciones: Array<Opciones>,
  respuesta: Array<Respuesta>,
  idPregunta: string;
  descripcionPregunta: string
}
@Component({
  selector: 'app-respuesta-matriz-seleccion',
  templateUrl: './respuesta-matriz-seleccion.component.html',
  styleUrls: ['./respuesta-matriz-seleccion.component.scss'],
})
export class RespuestaMatrizSeleccionComponent implements OnInit {
  @Input() Item :any ={};
  op:any;
  leyandaSuperior: string;
  leyandaLateral: string;
  totalFilas: number;
  observacion: boolean;
  _listaPreguntaConfigurarMatriz: any[] = [];
  matrizDesing: Array<MatrizDesing> = [];
  respuesta: Array<Respuesta> = [];
  loadingMatriz:boolean=false;
  constructor(private preguntasService:PreguntasService, private toastController:ToastController) { }
  ngOnInit() {
    this._consultarPreguntaConfigurarMatriz(this.Item.IdPreguntaEncriptado);
  }
  getNiveles() {
    let opciones: Array<Opciones> = [];
    let aux = false;
    for (let index = 0; index < this._listaPreguntaConfigurarMatriz.length; index++) {
      aux = false
      for (let index1 = 0; index1 < opciones.length; index1++) {
        if (this._listaPreguntaConfigurarMatriz[index].OpcionUnoMatriz.IdOpcionUnoMatrizEncriptado == opciones[index1].idOpciones && this._listaPreguntaConfigurarMatriz[index].OpcionUnoMatriz.Descripcion == opciones[index1].opciones) {
         aux = true;
        }
      }
      if (aux == false) {
        let data:string
        let tamano= this._listaPreguntaConfigurarMatriz[index].OpcionUnoMatriz.Descripcion.length;
        if(this.respuesta.length !=0){
          if(this.respuesta[0].descripcion!=null){
            var resp = this.respuesta.find(cues =>cues.descripcion.substr(0,tamano) === this._listaPreguntaConfigurarMatriz[index].OpcionUnoMatriz.Descripcion);
          }
          else{
            resp = null;
          }
        }
        if((resp == null) || (resp == undefined)){
          data=null;
       }else{
        data=resp.dataRespuesta;
       }
        opciones.push({
          idOpciones: this._listaPreguntaConfigurarMatriz[index].OpcionUnoMatriz.IdOpcionUnoMatrizEncriptado,
          opciones: this._listaPreguntaConfigurarMatriz[index].OpcionUnoMatriz.Descripcion,
          nivel: this._listaPreguntaConfigurarMatriz[index].IdConfigurarMatrizEncriptado,
          dataRespuesta: data
        })
      }
    }
    for (let j = 0; j < opciones.length; j++) {
      let niveles: Array<Nivel> = [];
      for (let i = 0; i < this._listaPreguntaConfigurarMatriz.length; i++) {
        aux = false
        if (opciones[j].idOpciones == this._listaPreguntaConfigurarMatriz[i].OpcionUnoMatriz.IdOpcionUnoMatrizEncriptado) {
          for (let index1 = 0; index1 < niveles.length; index1++) {
            if (this._listaPreguntaConfigurarMatriz[i].OpcionDosMatriz.IdOpcionDosMatrizEncriptado == niveles[index1].idNivel) {
              aux = true;
            }
          }
          if (aux == false) {
            niveles.push({
              idNivel: this._listaPreguntaConfigurarMatriz[i].OpcionDosMatriz.IdOpcionDosMatrizEncriptado,
              nivel: this._listaPreguntaConfigurarMatriz[i].OpcionDosMatriz.Descripcion,
              idConfiguracionMatriz: this._listaPreguntaConfigurarMatriz[i].IdConfigurarMatrizEncriptado,
              estado: "no",
              totalrespuesta:"0"
            })
          }
        }
      }
      opciones[j] = {
        idOpciones: opciones[j].idOpciones,
        opciones: opciones[j].opciones,
        nivel: niveles,
        dataRespuesta: opciones[j].dataRespuesta
      }
    }
    let respuesta: Array<Respuesta> = [];
    respuesta = this.getRespuesta();
    let op = opciones.length
    let bandera = 0;
    let aux12
    while (bandera < op) {
      let niveles: Array<Nivel> = [];
      for (let y = 0; y < opciones[bandera].nivel.length; y++) {
        aux12 = false
        for (let l = 0; l < respuesta.length; l++) {
          if (opciones[bandera].nivel[y].idConfiguracionMatriz == respuesta[l].idRespuestaLogica) {
            aux12 = true
          }
        }
        if (aux12 == true) {
          var opcionNivel=opciones[bandera].opciones+","+opciones[bandera].nivel[y].nivel 
          var totalvecesRespuesta= this.Item['ListaRespuestas'].find(l => l.DescripcionRespuestaAbierta==opcionNivel)
          niveles.push({
            idNivel: opciones[bandera].nivel[y].idNivel,
            nivel: opciones[bandera].nivel[y].nivel,
            idConfiguracionMatriz: opciones[bandera].nivel[y].idConfiguracionMatriz,
            estado: "chequeado",
            totalrespuesta:totalvecesRespuesta.VecesRepetidas
          })
        } else {
          niveles.push({
            idNivel: opciones[bandera].nivel[y].idNivel,
            nivel: opciones[bandera].nivel[y].nivel,
            idConfiguracionMatriz: opciones[bandera].nivel[y].idConfiguracionMatriz,
            estado: "no",
            totalrespuesta:"0"
          })
        }
      }
      opciones[bandera] = {
        idOpciones: opciones[bandera].idOpciones,
        opciones: opciones[bandera].opciones,
        nivel: niveles,
        dataRespuesta: opciones[bandera].dataRespuesta,
      }
      bandera++;
    }
    return opciones;
  }
  getRespuesta() {
    let respuesta: Array<Respuesta> = [];
    let aux = false;
    for (let index = 0; index < this._listaPreguntaConfigurarMatriz.length; index++) {
      aux = false
      for (let index1 = 0; index1 < respuesta.length; index1++) {
        if (this._listaPreguntaConfigurarMatriz[index].IdRespuestaLogica == respuesta[index1].idRespuestaLogica) {
          aux = true;
        }
      }
      if (aux == false) {
        respuesta.push({
          idRespuestaLogica: this._listaPreguntaConfigurarMatriz[index].IdRespuestaLogica,
          descripcion: this._listaPreguntaConfigurarMatriz[index].DescripcionRespuestaAbierta,
          dataRespuesta: this._listaPreguntaConfigurarMatriz[index].datoRespuestaMatriz
          
        })
      }
    }
    return respuesta;
  }
  _consultarPreguntaConfigurarMatriz(_IdPreguntaEncriptado) {
    this.preguntasService._consultarPreguntaConfigurarMatriz(_IdPreguntaEncriptado, localStorage.getItem("IdAsignarEncuestadoEncriptado"),)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this.matrizDesing.length = 0;
          this._listaPreguntaConfigurarMatriz = data['respuesta'];
          let opciones: Array<Opciones> = [];
          this.totalFilas = opciones.length + 1;
          this.respuesta=this.getRespuesta().filter(i=>i.dataRespuesta!=null);
          opciones = this.getNiveles();
          this.observacion = this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.Observacion;
          this.matrizDesing.push({
            leyendaLateral: this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.leyendaLateral,
            leyendaSuperior: this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.leyendaSuperior,
            opciones: opciones,
            respuesta: this.respuesta,
            idPregunta: this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.IdPreguntaEncriptado,
            descripcionPregunta: this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.Descripcion,
          })
        }
      }).catch(error => {
        this.Toast("Error la cargar datos")
      })
  }
  async Toast(_mensaje: string, _duracion: number = 2000) {
    const toast = await this.toastController.create({
      message: _mensaje,
      position: 'bottom',
      animated: true,
      duration: _duracion,
      color: 'dark',
      cssClass: 'toastFormato',
      buttons: [
        {
          side: 'end',
          icon: 'close-circle-outline',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }

}
