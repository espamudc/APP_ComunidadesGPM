import { Component, OnInit } from '@angular/core';
import { CabeceraRespuestaService } from '../../services/cabecera-respuesta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AsignarEncuestadoService } from '../../services/asignar-encuestado.service';
import { VersionamientoPreguntaService } from '../../services/versionamiento-pregunta.service';
import { PreguntasService } from '../../services/preguntas.service';
import { RespuestasService } from '../../services/respuestas.service';
import { ComponentesService } from '../../services/componentes.service';
import { ToastController } from '@ionic/angular';
import { CuestionarioPublicadoService } from '../../services/cuestionario-publicado.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PreguntasRestantesPage } from '../../pages/preguntas-restantes/preguntas-restantes.page';
import { ScreenMessengerPage } from '../../pages/screen-messenger/screen-messenger.page';

@Component({
  selector: 'app-cuestionario-respuestas',
  templateUrl: './cuestionario-respuestas.page.html',
  styleUrls: ['./cuestionario-respuestas.page.scss'],
})
export class CuestionarioRespuestasPage implements OnInit {
  fichanombre: string = "Ficha técnica para levantamiento de información en la comunidad";
  fecha: any = new Date();
  responsableCuestionario: string;
  responsableTelefono: string;
  formAsignarEncuestado: FormGroup;
  formCabeceraRespuesta: FormGroup;
  listaPreguntasRestantes:any;
  totalPreguntasObligaotiras:number=0;
  totalPreguntasOpcionales:number=0;
  listaPreguntas: any[] = [];
  listaPreguntas2: any[] = [];
  listComponents: any[] = [];
  txtCoordenadas1:boolean=true;
  idComunidad:number;
  txtCoordenadas2:boolean=true;
  _ocultar = false;
  longitud:string;
  latitud:string;
  listaRespuestas: any[] = [];
  _listaPreguntaMatriz: any[] = [];
  _listaPreguntaConfigurarMatriz: any[] = [];
  FilaOpcionUnoMatriz: any[] = [];
  ColumnsOpcionDosMatriz: any[] = [];
  _listaOpcionesPreguntaSeleccion: any[] = [];
  constructor(
    private componentesService: ComponentesService,
    private cabeceraRespuestaService: CabeceraRespuestaService,
    private asignarEncuestadoService: AsignarEncuestadoService,
    private versionamientoPreguntaService: VersionamientoPreguntaService,
    private preguntasService: PreguntasService,
    private respuestasService: RespuestasService,
    private toastController: ToastController,
    private cuestionarioPublicadoService:CuestionarioPublicadoService,
    private router:Router,
    public alertController: AlertController,
    public modalController: ModalController,
  
  ) {
    this.formAsignarEncuestado = new FormGroup({
      _idAsignarEncuestadoEncriptado: new FormControl(''),
      _idCuestionarioPublicadoEncriptado: new FormControl(''),
      _provincia: new FormControl(''),
      _canton: new FormControl(''),
      _parroquia: new FormControl(''),
      _comunidad: new FormControl(''),
      _lalitud: new FormControl(''),
      _longitud: new FormControl(''),
      _fechaInicio: new FormControl(''),
      _fechaFin: new FormControl(''),
      _representante: new FormControl(''),
      _nombreCuestionario: new FormControl(''),
    });
    this.formCabeceraRespuesta = new FormGroup({
      _idCabeceraRespuestaEncriptado: new FormControl(''),
      _idAsignarEncuestadoEncriptado: new FormControl(''),
      _fechaRegistro: new FormControl('', [Validators.required]),
      _fechaFinalizado: new FormControl('', [Validators.required]),
      _finalizado: new FormControl(''),
      _estado: new FormControl('')
    });
  }
  
  coordenadasUpdate(event: Event){
 this.cabeceraRespuestaService._updateCoordendas(this.idComunidad,this.latitud, this.longitud)
     .then(data => { 
      this.txtCoordenadas1=true;
      this.txtCoordenadas2=true;
      this.Toast("Coordenadas actualizadas");
     })
     .catch(error=> { 
      this.Toast("Error al cargar datos");
     })
  }
  async presentModal(valor:boolean) {
    var preguntas;
    preguntas= this.listaPreguntasRestantes.filter(function(preguntas){ return preguntas.Obligatorio==valor})
    const modal = await this.modalController.create({
      component: PreguntasRestantesPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps:{data:preguntas}
    });
    return await modal.present();
  }
  async presentModalMensaje() {
    const modal = await this.modalController.create({
      component: ScreenMessengerPage,
      cssClass: 'my-custom-modal-css',
      swipeToClose: true,
    });
    return await modal.present();
  }
  preguntasRestantes(idPregunta:string){
    this.listaPreguntasRestantes = this.listaPreguntasRestantes.filter(function(preguntas){ return preguntas.IdPregunta !==idPregunta})
    this.totalPreguntasOpcionales= this.listaPreguntasRestantes.filter(function(preguntas){ return preguntas.Obligatorio==false}).length
    this.totalPreguntasObligaotiras= this.listaPreguntasRestantes.filter(function(preguntas){ return preguntas.Obligatorio==true}).length
  }
  activartxtCoordenada1(){
    this.txtCoordenadas1 =! this.txtCoordenadas1;
  }
  activartxtCoordenada2(){
    this.txtCoordenadas2 =!  this.txtCoordenadas2;
  }
  ngOnInit() {
    this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').setValue(localStorage.getItem("IdAsignarEncuestadoEncriptado"));
    this._asignarencuestado_consultarporidasignarencuestado();
  }
  components(idCuestionario: string) {
    this.componentesService.componentesPorEncuesta(idCuestionario).then(data => {
      this.listComponents = data["respuesta"];
    }).catch(error => {
      this.Toast("Error al cargar datos")
    })
  }
  _asignarencuestado_consultarporidasignarencuestado() {
    let id = this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value;
    this.asignarEncuestadoService._consultarporidasignarencuestado(id)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          let _item = data['respuesta'];
          this.responsableTelefono = _item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.Telefono;
          this.responsableCuestionario = _item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.PrimerNombre + " " +
            _item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.SegundoNombre + " " +
            _item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.PrimerApellido + " " +
            _item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.SegundoApellido;
          this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').setValue(_item.IdAsignarEncuestadoEncriptado);
          this.formAsignarEncuestado.get('_idCuestionarioPublicadoEncriptado').setValue(_item.CuestionarioPublicado.IdCuestionarioPublicadoEncriptado);
          this.formAsignarEncuestado.get('_provincia').setValue(_item.Comunidad.Parroquia.Canton.Provincia.NombreProvincia);
          this.formAsignarEncuestado.get('_canton').setValue(_item.Comunidad.Parroquia.Canton.NombreCanton);
          this.formAsignarEncuestado.get('_parroquia').setValue(_item.Comunidad.Parroquia.NombreParroquia);
          this.formAsignarEncuestado.get('_comunidad').setValue(_item.Comunidad.NombreComunidad);
          this.idComunidad=_item.Comunidad.IdComunidadEncriptado;
          this.formAsignarEncuestado.get('_lalitud').setValue(_item.Comunidad.latitud);
          this.formAsignarEncuestado.get('_longitud').setValue(_item.Comunidad.longitud);
          this.formAsignarEncuestado.get('_fechaInicio').setValue(_item.FechaInicio);
          this.formAsignarEncuestado.get('_fechaFin').setValue(_item.FechaFin);
          this.formAsignarEncuestado.get('_representante').setValue('');
          this.latitud = _item.Comunidad.latitud;
          this.longitud = _item.Comunidad.longitud;
          this.formAsignarEncuestado.get('_nombreCuestionario').setValue(_item.CuestionarioPublicado.CabeceraVersionCuestionario.AsignarResponsable.CuestionarioGenerico.Nombre);
        } else {
          this.Toast(data['http']['mensaje'])
        }
      }).catch(error => {
        this.Toast("Error al cargar datos")
      })
  }
  _comenzarencuesta() {
    this._ocultar = true;
    this.components(localStorage.getItem("IdVersionCuestionario"));
    this.totalPreguntasRestantes();
  }
  mostarPreguntas(item: any) {
    let usuarioTecnico = this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value;
   this.preguntasService.PreguntasPorcomponentes(item.IdComponenteEncriptado, usuarioTecnico).then(data => {
      this.listaPreguntas2 = data["respuesta"];
    }).catch(error => {
      this.Toast("Error al cargar datos")
    })
  }
  _respuestas_consultarporidcabecerarespuesta(_IdCabeceraRespuestaEncriptado) {
    this.respuestasService.respuesta_consultarporidcabecerarespuesta(_IdCabeceraRespuestaEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this.listaRespuestas = data['respuesta'];
        } else {
          this.Toast(data['http']['mensaje'])
        }
      }).catch(error => {
        this.Toast("Error al cargar datos");
      })
  }
  _preguntas_consultarporcabeceraversionCuestionario(_idCabeceraVersionCuestionarioEncriptado) {
    this.versionamientoPreguntaService._consultarporcabeceraversionCuestionario(_idCabeceraVersionCuestionarioEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this.listaPreguntas = data['respuesta'];
        } else {
          this.Toast(data['http']['mensaje'])
        }
      }).catch(error => {
        this.Toast("Error al cargar datos");
      })
  }
  _pregunta_consultarPreguntasSeleccion(_IdPreguntaEncriptado) {
    this.preguntasService._consultarOpcionPreguntaSeleccion(
      _IdPreguntaEncriptado
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this._listaOpcionesPreguntaSeleccion = data['respuesta'];
      } else {
        this.Toast(data['http']['mensaje'])
      }
    }).catch(error => {
      this.Toast("Error al cargar datos");
    })
  }
  async finalizarCuestionario() {
    const alert = await this.alertController.create({
      cssClass: 'alertCancel',
      header: 'Confirmar',
      message: 'El finalizar el cuestionario <strong>no podrá modificarlo</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: (blah) => {
            console.log('Proceso cancelado');
          }
        }, {
          text: 'Finalizar',
          cssClass: 'alertButton',
          handler: () => {
           this. procesofinalizarCuestionario();
          }
        }
      ]
    });
    await alert.present();
  }
  totalPreguntasRestantes(){
    this.totalPreguntasObligaotiras=0;
    this.totalPreguntasOpcionales=0;
    this.preguntasService.preguntasRestantes(this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value).then(data => {
      if (data['http']['codigo'] == '200') {
        this.listaPreguntasRestantes= data['respuesta']
        data['respuesta'].forEach(element => {
          if(element.Obligatorio==true){
            this.totalPreguntasObligaotiras++;
          }else{
            this.totalPreguntasOpcionales++;
          }
        });
      } else {
        this.Toast(data['http']['mensaje'])
      }
    }).catch(error => {
      this.Toast("Error al cargar datos");
    })
  }
   procesofinalizarCuestionario() {
    let id = this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value;
    this.cuestionarioPublicadoService.finalizarCuestionario(
      id
    ).then(data => {
     if(data["respuesta"]=="0"){
      this.presentModalMensaje();
     }else{
      this.Toast("Aún faltan preguntas por responder");
     }
    }).catch(error => {
      this.Toast("Error al cargar datos");
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
