import { Component, OnInit } from '@angular/core';
import { CabeceraRespuestaService } from 'src/app/services/cabecera-respuesta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
import { VersionamientoPreguntaService } from 'src/app/services/versionamiento-pregunta.service';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { RespuestasService } from 'src/app/services/respuestas.service';
import { ComponentesService } from 'src/app/services/componentes.service';
import { ToastController } from '@ionic/angular';
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
  listaPreguntas: any[] = [];
  listaPreguntas2: any[] = [];
  listComponents: any[] = [];
  _ocultar = false;
  listaRespuestas: any[] = [];
  _listaPreguntaMatriz: any[] = [];
  _listaPreguntaConfigurarMatriz: any[] = [];
  FilaOpcionUnoMatriz: any[] = [];
  ColumnsOpcionDosMatriz: any[] = [];
  _listaOpcionesPreguntaSeleccion: any[] = [];
  constructor(
    private componentesService: ComponentesService,
    private cabeceraRespuestaService: CabeceraRespuestaService
    , private asignarEncuestadoService: AsignarEncuestadoService
    , private versionamientoPreguntaService: VersionamientoPreguntaService
    , private preguntasService: PreguntasService
    , private respuestasService: RespuestasService,
    private toastController: ToastController,
  ) {
    this.formAsignarEncuestado = new FormGroup({
      _idAsignarEncuestadoEncriptado: new FormControl(''),
      _idCuestionarioPublicadoEncriptado: new FormControl(''),
      _provincia: new FormControl(''),
      _canton: new FormControl(''),
      _parroquia: new FormControl(''),
      _comunidad: new FormControl(''),
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
          debugger
          console.log("asignarEncuestadoService.data", data['respuesta']);
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
          this.formAsignarEncuestado.get('_fechaInicio').setValue(_item.FechaInicio);
          this.formAsignarEncuestado.get('_fechaFin').setValue(_item.FechaFin);
          this.formAsignarEncuestado.get('_representante').setValue('');
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
    this._cabecerarespuesta_consultarporidasignarencuestadoDesdeCabeceraRespuesta();
  }

  _cabecerarespuesta_consultarporidasignarencuestadoDesdeCabeceraRespuesta() {
    let id = this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value;
    this.cabeceraRespuestaService._consultarporidasignarencuestado(id)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          let _item = data['respuesta'];
          this.formCabeceraRespuesta.get("_idCabeceraRespuestaEncriptado").setValue(_item.IdCabeceraRespuestaEncriptado);
          this.formCabeceraRespuesta.get("_idAsignarEncuestadoEncriptado").setValue(_item.AsignarEncuestado.IdAsignarEncuestadoEncriptado);
          this.formCabeceraRespuesta.get("_fechaRegistro").setValue(_item.FechaRegistro);
          this.formCabeceraRespuesta.get("_fechaFinalizado").setValue(_item.FechaFinalizado);
          this.formCabeceraRespuesta.get("_finalizado").setValue(_item.Finalizado);
          this.formCabeceraRespuesta.get("_estado").setValue(_item.Estado);
          this._respuestas_consultarporidcabecerarespuesta(_item.IdCabeceraRespuestaEncriptado);
          this._preguntas_consultarporcabeceraversionCuestionario(_item.AsignarEncuestado.CuestionarioPublicado.CabeceraVersionCuestionario.IdCabeceraVersionCuestionarioEncriptado);
        } else {
          this.Toast(data['http']['mensaje'])
        }
      }).catch(error => {
        this.Toast("Error al cargar datos")
      })
  }
  mostarPreguntas(item: any) {
    let usuarioTecnico = localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    this.preguntasService.PreguntasPorcomponentes(item.IdComponenteEncriptado, usuarioTecnico).then(data => {
      this.listaPreguntas2 = data["respuesta"];
    }).catch(error => {
      this.Toast("Error al cargar datos")
    })
  }
  _respuestas_consultarporidcabecerarespuesta(_IdCabeceraRespuestaEncriptado) {
    this.respuestasService.respuesta_consultarporidcabecerarespuesta(_IdCabeceraRespuestaEncriptado)
      .then(data => {
        debugger
        if (data['http']['codigo'] == '200') {
          console.log('respuestasdd:', data['respuesta']);
          this.listaRespuestas = data['respuesta'];
        } else {
          this.Toast(data['http']['mensaje'])
        }
      }).catch(error => {
        this.Toast("Error al cargar datos");
      })
  }
  _preguntas_consultarporcabeceraversionCuestionario(_idCabeceraVersionCuestionarioEncriptado) {
    console.log("_idCabeceraVersionCuestionarioEncriptado", _idCabeceraVersionCuestionarioEncriptado);
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
