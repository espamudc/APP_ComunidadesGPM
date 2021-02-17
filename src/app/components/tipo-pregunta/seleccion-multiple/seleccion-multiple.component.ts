import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { RespuestasService } from 'src/app/services/respuestas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
interface Codigo {
  codigo: string,
  descripcion: string,
  estado: string
}
@Component({
  selector: 'app-seleccion-multiple',
  templateUrl: './seleccion-multiple.component.html',
  styleUrls: ['./seleccion-multiple.component.scss'],
})
export class SeleccionMultipleComponent implements OnInit {
  @Input() ItemPregunta: any;
  @Input() IdCabeceraRespuestaEncriptado: any = '';
  @Input() Identificador: string;
  @Output() preguntaBorrada = new EventEmitter<string>();
  LasRespuestasDeEstaPregunta: any[] = [];
  ListaCheckBox: any[] = [];
  almacenRespuestas: Array<Codigo> = [];
  _listaOpcionesPreguntaSeleccion: any[] = [];
  _listaOpcionesPreguntaSeleccion1: any[] = [];
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
      this._pregunta_consultarPreguntasSeleccion();
    } else {
      this._ver = true;
      this._icon = "add";
    }
  }
  guadarRespuestas() {
    let bandera = this._listaOpcionesPreguntaSeleccion.length - 1;
    let almacen: Array<Codigo> = [];
    this._listaOpcionesPreguntaSeleccion.forEach(function callback(currentValue, index, array) {
      if (bandera >= index) {
        if (currentValue.IdOpcionPreguntaSeleccion == currentValue.IdRespuestaLogica) {
          almacen.push({
            codigo: currentValue.IdRespuestaLogica,
            descripcion: currentValue.DescripcionOpcionPreguntaSeleccion,
            estado: 'chequeado'
          });
        }
      }
    });
    return almacen;
  }
  _pregunta_consultarPreguntasSeleccion() {
    this.respuestasService.consultarRespuestaPorPreguntaSeleccion(
      this.ItemPregunta.IdPreguntaEncriptado,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
    ).then(data => {
      this._listaOpcionesPreguntaSeleccion = data['respuesta'];
      this.almacenRespuestas = this.guadarRespuestas();
      let eliminar = this._listaOpcionesPreguntaSeleccion[0].TotalOpciones;
      if (this._listaOpcionesPreguntaSeleccion.length == eliminar) {
        this._listaOpcionesPreguntaSeleccion1 = this._listaOpcionesPreguntaSeleccion;
      } else {
        this._listaOpcionesPreguntaSeleccion1 = this._listaOpcionesPreguntaSeleccion.splice(eliminar, eliminar);
      }
      let aux = false;
      for (let index = 0; index < this._listaOpcionesPreguntaSeleccion1.length; index++) {
        aux = false
        for (let index1 = 0; index1 < this.almacenRespuestas.length; index1++) {
          if (this._listaOpcionesPreguntaSeleccion1[index].IdOpcionPreguntaSeleccion == this.almacenRespuestas[index1].codigo) {
            aux = true;
          }
        }
        if (aux == false) {
          this.almacenRespuestas.push({
            codigo: this._listaOpcionesPreguntaSeleccion1[index].IdOpcionPreguntaSeleccion,
            descripcion: this._listaOpcionesPreguntaSeleccion1[index].DescripcionOpcionPreguntaSeleccion,
            estado: 'no'
          });
        }
      }
      this.almacenRespuestas.sort(this.OrdenarArray);
    }).catch(error => {
      this.Toast("Error la cargar datos")
    })
  }
  OrdenarArray(a, b) {
    if (a.codigo > b.codigo) {
      return 1;
    }
    if (a.codigo < b.codigo) {
      return -1;
    }
    return 0;
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
  _guardarOpcion(_idOpcionEncriptado, respuesta:string) {
    let id = this.formRespuesta.get('_idCabeceraRespuestaEncriptado').value
    this.respuestasService.respuesta_insertar(
      id,
      this.formRespuesta.get('_idPreguntaEncriptado').value,
      _idOpcionEncriptado,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
      this.Identificador, respuesta
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this.totalPreguntasRestantes(this.ItemPregunta.IdPreguntaEncriptado);
        //this.Toast("Datos Guardado")
      }
    }).catch(error => {
      this.Toast("Error la cargar datos")
    })
  }
  totalPreguntasRestantes(idpregunta:string){
    this.preguntaBorrada.emit(idpregunta)
  }

}
