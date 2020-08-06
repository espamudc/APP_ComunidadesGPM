import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RespuestasService } from 'src/app/services/respuestas.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-abierta',
  templateUrl: './abierta.component.html',
  styleUrls: ['./abierta.component.scss'],
})
export class AbiertaComponent implements OnInit {
  @Input() ItemPregunta: any = {};
  @Input() IdCabeceraRespuestaEncriptado: string;
  @Input() Identificador: string;
  respuetaPreguntaAbierta: any[] = [];
  constructor(
    private respuestasService: RespuestasService,
    private toastController: ToastController
  ) {
    this.formRespuesta = new FormGroup({
      _idCabeceraRespuestaEncriptado: new FormControl('', [Validators.required]),
      _idPreguntaEncriptado: new FormControl('', [Validators.required]),
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
      this._pregunta_consultarPreguntasAbierta();
    } else {
      this._ver = true;
      this._icon = "add";
    }
  }
  respuesta_insertarpreguntaabierta(event) {
    debugger
    let id = this.formRespuesta.get('_idCabeceraRespuestaEncriptado').value
    debugger
    this.respuestasService.respuesta_insertar(
      id,
      this.formRespuesta.get('_idPreguntaEncriptado').value,
      this.ItemPregunta.PreguntaAbierta.IdPreguntaAbiertaEncriptado,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
      this.Identificador, event.target.value
    ).then(data => {
      if (data['http']['codigo'] == '200') {
      //  this.Toast("Petición correcta")
      }
    }).catch(error => {
      this.Toast("Error la cargar datos")
    })
  }
  _pregunta_consultarPreguntasAbierta() {
    this.respuestasService.consultarRespuestaPorPreguntaAbierta(
      this.ItemPregunta.IdPreguntaEncriptado,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
    ).then(data => {
      this.respuetaPreguntaAbierta = data['respuesta'];
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
