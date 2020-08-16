import { Component, OnInit, Input } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { RespuestasService } from 'src/app/services/respuestas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
interface Nivel {
  idNivel: string
  nivel: string
  idConfiguracionMatriz: string,
  estado: string
}
interface Opciones {
  idOpciones: string
  opciones: string
  nivel: Array<Nivel>
}
interface Respuesta {
  idRespuestaLogica: string
  descripcion: string
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
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.scss'],
})
export class MatrizComponent implements OnInit {
  @Input() ItemPregunta: any = {};
  @Input() ListaRespuestas: any[] = [];
  @Input() IdCabeceraRespuestaEncriptado: string;
  @Input() Identificador: string;
  leyandaSuperior: string;
  leyandaLateral: string;
  totalFilas: number;
  observacion: boolean;
  _listaPreguntaConfigurarMatriz: any[] = [];
  matrizDesing: Array<MatrizDesing> = [];
  constructor(private preguntasService: PreguntasService,
    private respuestasService: RespuestasService,
    private toastController: ToastController) {
    this.formRespuesta = new FormGroup({
      _idCabeceraRespuestaEncriptado: new FormControl('', [Validators.required]),
      _idPreguntaEncriptado: new FormControl('', [Validators.required]),
      _idRespuestaLogicaEncriptado: new FormControl('', [Validators.required]),
      _descripcion: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
    this.formRespuesta.get('_idCabeceraRespuestaEncriptado').setValue(this.IdCabeceraRespuestaEncriptado);
    this.formRespuesta.get('_idPreguntaEncriptado').setValue(this.ItemPregunta.IdPreguntaEncriptado);
  }
  formRespuesta: FormGroup;
  _ver = true;
  _icon = "add";
  _ocultar() {
    if (this._ver == true) {
      this._ver = false;
      this._icon = "remove";
      this._consultarPreguntaConfigurarMatriz(this.ItemPregunta.IdPreguntaEncriptado);
    } else {
      this._ver = true;
      this._icon = "add";
    }
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
        opciones.push({
          idOpciones: this._listaPreguntaConfigurarMatriz[index].OpcionUnoMatriz.IdOpcionUnoMatrizEncriptado,
          opciones: this._listaPreguntaConfigurarMatriz[index].OpcionUnoMatriz.Descripcion,
          nivel: this._listaPreguntaConfigurarMatriz[index].IdConfigurarMatrizEncriptado

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
              estado: "no"
            })
          }
        }
      }
      opciones[j] = {
        idOpciones: opciones[j].idOpciones,
        opciones: opciones[j].opciones,
        nivel: niveles
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
          niveles.push({
            idNivel: opciones[bandera].nivel[y].idNivel,
            nivel: opciones[bandera].nivel[y].nivel,
            idConfiguracionMatriz: opciones[bandera].nivel[y].idConfiguracionMatriz,
            estado: "chequeado"
          })
        } else {
          niveles.push({
            idNivel: opciones[bandera].nivel[y].idNivel,
            nivel: opciones[bandera].nivel[y].nivel,
            idConfiguracionMatriz: opciones[bandera].nivel[y].idConfiguracionMatriz,
            estado: "no"
          })
        }
      }
      opciones[bandera] = {
        idOpciones: opciones[bandera].idOpciones,
        opciones: opciones[bandera].opciones,
        nivel: niveles
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
          descripcion: this._listaPreguntaConfigurarMatriz[index].DescripcionRespuestaAbierta
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
          debugger
          let respuesta: Array<Respuesta> = [];
          let opciones: Array<Opciones> = [];
          this.totalFilas = opciones.length + 1;
          respuesta = this.getRespuesta();
          opciones = this.getNiveles();
          this.observacion = this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.Observacion;
          this.matrizDesing.push({
            leyendaLateral: this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.leyendaLateral,
            leyendaSuperior: this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.leyendaSuperior,
            opciones: opciones,
            respuesta: respuesta,
            idPregunta: this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.IdPreguntaEncriptado,
            descripcionPregunta: this._listaPreguntaConfigurarMatriz[0].OpcionUnoMatriz.Pregunta.Descripcion,
          })
        }
      }).catch(error => {
        this.Toast("Error la cargar datos")
      })
  }

  _guardarOpcion(_idOpcionEncriptado) {
    debugger
    console.log("seleccionada", _idOpcionEncriptado);
    let id = this.formRespuesta.get('_idCabeceraRespuestaEncriptado').value
    this.respuestasService.respuesta_insertar(
      id,
      this.formRespuesta.get('_idPreguntaEncriptado').value,
      _idOpcionEncriptado,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
      this.Identificador, null
    ).then(data => {
      if (data['http']['codigo'] == '200') {
      }
    }).catch(error => {
      this.Toast("Error la cargar datos")
    })
  }

  insertarpreguntaabierta(event, opcion: string) {
    this.respuestasService.insertar_DatosRespuesta(
      event.target.value,
      opcion,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
      this.formRespuesta.get('_idPreguntaEncriptado').value)
      .then(data => {
        if (data['respuesta'] == 'Error al guardar') {
          this.Toast("Error, seleccione primero una opción")
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
