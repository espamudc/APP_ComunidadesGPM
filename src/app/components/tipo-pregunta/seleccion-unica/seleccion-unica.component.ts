import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastController, IonRadioGroup } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RespuestasService } from 'src/app/services/respuestas.service';
@Component({
  selector: 'app-seleccion-unica',
  templateUrl: './seleccion-unica.component.html',
  styleUrls: ['./seleccion-unica.component.scss'],
})
export class SeleccionUnicaComponent implements OnInit {
  @Input() ItemPregunta: any;
  @Input() IdCabeceraRespuestaEncriptado: any = '';
  @Input() Identificador: string;
  @Output() preguntaBorrada = new EventEmitter<string>();
  _listaOpcionesPreguntaSeleccion: any[] = [];
  listRespuestas: any = [];
  isHidden: boolean = true;
  isHidden2: boolean = false;
  txtrespuestaUnica: string;
  RespuestaEncajonada: string
  formRespuesta: FormGroup;
  _ver = true;
  _icon = "add";
  constructor(
    private respuestasService: RespuestasService,
    private toastController: ToastController,
  ) {
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
  totalPreguntasRestantes(idpregunta:string){
    this.preguntaBorrada.emit(idpregunta)
  }
  _pregunta_consultarPreguntasSeleccion() {
    this.respuestasService.consultarRespuestaPorPreguntaSeleccion(
      this.ItemPregunta.IdPreguntaEncriptado,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
    ).then(data => {
      this._listaOpcionesPreguntaSeleccion = data['respuesta'];
    }).catch(error => {
      this.Toast("Error al cargar datos")
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
  _ocultar() {
    if (this._ver == true) {
      this._ver = false;
      this._icon = "remove";
      this._pregunta_consultarPreguntasSeleccion()
    } else {
      this._ver = true;
      this._icon = "add";
      if ((this.RespuestaEncajonada == null) || (this.RespuestaEncajonada == " ")) {
        this.RespuestaEncajonada = "No especificó";
      }
    }
  }
  _guardarOpcion(_idOpcionEncriptado: string, encajonado, event: any, i: number) {
    this.RespuestaEncajonada = event.target.value;
    if (encajonado == 1) {
      this.isHidden2 = false;
      this.isHidden = false;
      this.RespuestaEncajonada = this._listaOpcionesPreguntaSeleccion[i].DescripcionRespuestaAbierta
      if ((this.RespuestaEncajonada == null) || (this.RespuestaEncajonada == "")) {
        this.RespuestaEncajonada = "No especificó";
      }
    } else {
      this._listaOpcionesPreguntaSeleccion[i].DescripcionRespuestaAbierta = " ";
      this.isHidden = true;
      this.isHidden2 = true;
    }
    let id = this.formRespuesta.get('_idCabeceraRespuestaEncriptado').value
    this.respuestasService.respuesta_insertar(
      id,
      this.formRespuesta.get('_idPreguntaEncriptado').value,
      _idOpcionEncriptado,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
      this.Identificador, this.RespuestaEncajonada
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        //this.Toast("Datos Guardado")
        this.totalPreguntasRestantes(this.ItemPregunta.IdPreguntaEncriptado);
      }
    }).catch(error => {
      this.Toast("Error la cargar datos")
    })
  }
}
