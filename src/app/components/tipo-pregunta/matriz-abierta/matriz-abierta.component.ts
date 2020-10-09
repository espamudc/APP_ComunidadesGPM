import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { RespuestasService } from '../../../services/respuestas.service';

interface Opciones {
  idOpciones: string
  opciones: string
}
@Component({
  selector: 'app-matriz-abierta',
  templateUrl: './matriz-abierta.component.html',
  styleUrls: ['./matriz-abierta.component.scss'],
})
export class MatrizAbiertaComponent implements OnInit {
  @Input() ItemPregunta: any = {};
  @Input() ListaRespuestas: any[] = [];
  @Input() IdCabeceraRespuestaEncriptado: string;
  @Input() Identificador: string;
  filasRespuestas: any = [];
  formRespuesta: FormGroup;
  respuestas: Array<string> = new Array();
  opciones: Array<Opciones> = [];
  opcionesVista: any;
  addRow: string;
  @ViewChild('dataContainer', { static: false }) dataContainer: ElementRef;
  @ViewChild('q', { static: false }) q: ElementRef;
  @Output() preguntaBorrada = new EventEmitter<string>();
  almacenadorRespuestas: any = [];
  rows: Array<string> = new Array(1);
  constructor(private toastController: ToastController,
    private respuestasService: RespuestasService,
    private renderer: Renderer2,
    private elementRef: ElementRef) {

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
  _ver = true;
  _icon = "add";
  _ocultar() {
    if (this._ver == true) {
      this._ver = false;
      this._icon = "remove";
      this.opcionesRespuestaMatrizAbierta();
    } else {
      this._ver = true;
      this._icon = "add";
    }
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
  addRowNew() {
    this.rows.push('0');
  }
  comparar(a, b) {
    if (a.DescripcionRespuestaAbierta > b.DescripcionRespuestaAbierta) {
      return 1;
    }
    if (a.DescripcionRespuestaAbierta < b.DescripcionRespuestaAbierta) {
      return -1;
    }
    return 0;
  }
  obtenerRespustas() {
    let respuestas: Array<string> = new Array();
    let totalRespuestas = this.opcionesVista.length;
    let divid = this.opciones.length;
    let aux = (totalRespuestas / divid);
    let index: number = 0;
    for (let i = 0; i < aux; i++) {
      index = i * divid;
      respuestas.push(this.opcionesVista[index].DescripcionRespuestaAbierta);
    }
    return respuestas;
  }
  obtenerOpciones() {
    let opciones: Array<Opciones> = [];
    let cadenaUna: string;
    let aux: boolean = false;
    cadenaUna = this.opcionesVista[0].DescripcionOpcionPreguntaSeleccion;
    this.opcionesVista.forEach(function callback(currentValue, index, array) {
      if (opciones.length >= 1) {
        if (currentValue.DescripcionOpcionPreguntaSeleccion == cadenaUna) {
          aux = true;
        }
      }
      if (aux == false) {
        opciones.push({
          idOpciones: currentValue.IdOpcionPreguntaSeleccion,
          opciones: currentValue.DescripcionOpcionPreguntaSeleccion,
        })
      }
    });
    return opciones;
  }
  opcionesRespuestaMatrizAbierta() {
    this.rows = [];
    this.respuestasService.consultarRespuestaPorPreguntaSeleccion(
      this.ItemPregunta.IdPreguntaEncriptado,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
    ).then(data => {
      this.opcionesVista = data['respuesta'].sort(this.comparar);
      this.opciones = this.obtenerOpciones();
      let respuesta: Array<string> = new Array();
      respuesta = this.obtenerRespustas();
      for (let i = 0; i < respuesta.length; i++) {
        this.addRowNew();
        let txt: string = respuesta[i];
        if (txt != null) {
          var res = txt.split(",");
          for (let i = 0; i < res.length; i++) {
            let valor: string;
            if (res[i + 1] == "undefined") {
              valor = "";
            } else {
              valor = res[i + 1];
            }
            this.filasRespuestas['s' + res[0] + i] = valor
          }
        }
      };
    }).catch(error => {
      this.Toast("Error al cargar datos")
    })
  }
  totalPreguntasRestantes(idpregunta: string) {
    this.preguntaBorrada.emit(idpregunta)
  }
  respuesta_insertarpreguntaabierta(event, indice: string, index: string) {
    const bar = event.target.value.trim();
    if (event.target.value.length > 1) {
      let aux = this.opciones.length;
      let texto: string = index;
      for (let i = 0; i < aux; i++) {
        texto = texto + "," + this.filasRespuestas['s' + index + i];
      }
      let id = this.formRespuesta.get('_idCabeceraRespuestaEncriptado').value
      this.respuestasService.respuesta_insertar(
        id,
        this.formRespuesta.get('_idPreguntaEncriptado').value,
        this.ItemPregunta.PreguntaAbierta.IdPreguntaAbiertaEncriptado,
        localStorage.getItem("IdAsignarEncuestadoEncriptado"),
        this.Identificador, texto.trim()
      ).then(data => {
        if (data['http']['codigo'] == '200') {
          //  this.Toast("Petición correcta")
          this.totalPreguntasRestantes(this.ItemPregunta.IdPreguntaEncriptado);
        }
      }).catch(error => {
        this.Toast("Error la cargar datos")
      })
    }
  }
}


