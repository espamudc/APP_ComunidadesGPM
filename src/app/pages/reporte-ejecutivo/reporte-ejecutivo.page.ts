import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteService } from '../../services/reporte.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapaService } from '../../services/mapa.service';
import { CabeceraRespuestaService } from '../../services/cabecera-respuesta.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
interface Preguntas {
  pregunta: string
  respuestas: Array<Respuestas>
}
interface Respuestas {
  descripcion: string
}
@Component({
  selector: 'app-reporte-ejecutivo',
  templateUrl: './reporte-ejecutivo.page.html',
  styleUrls: ['./reporte-ejecutivo.page.scss'],
})
export class ReporteEjecutivoPage implements OnInit {
  public preguntas: any;
  htmlStr: any;
  prueba: boolean;
  comunidad: any;
  cuestionrio:string ="No hay cuestionario";
  pregunt: Array<Preguntas> = [];
  latitud: number;
  longitud: number;
  datos: any;
  errorMsg: string = "No encontrada";
  keyword = 'NombreComunidad';
  data: any;
  isLoadingResult: boolean;
  @ViewChild('auto', { static: true }) auto: any;
  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }
  constructor(private reporteService: ReporteService,
    private geolocation: Geolocation,
    private mapaService: MapaService,
    private cabeceraRespuestaService: CabeceraRespuestaService,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router,
    private alertController: AlertController) {
  }
  onFocused(e) {
    this.auto.close();
  }
  searchCleared() {
    this.auto.close();
  }
  onChangeSearch(e) {
    if (!this.auto.searchInput.nativeElement.value) {
      this.auto.close();
    } else {
      this.auto.open();
    }
  }
  ngOnInit() {
    this.getCoordenadas()
    this.getData();
  }
  llamarReporteEjecutivo(item: any) {
    this.auto.searchInput.nativeElement.value = item.NombreComunidad;
    this.getReporteEjecutivo(item.idComunidad);
  }
  getData(): void {
    this.isLoadingResult = true;
    this.reporteService.getAllComunidades().subscribe(data => {
      this.data = data["respuesta"];
      this.isLoadingResult = false;
    });
  }
  selectEvent(item) {
    this.getReporteEjecutivo(item.IdComunidad);
  }
  cargarParroquiaMapa() {
    this.cabeceraRespuestaService._comunidadesPorCoordendasDeParroquia(this.latitud, this.longitud)
      .then(data => {
        if(data['respuesta'].length>0){
        this.datos = data['respuesta']
        this.getReporteEjecutivo(this.datos[0].idComunidad);
        this.auto.searchInput.nativeElement.value = this.datos[0].NombreComunidad;
             this.cuestionrio =" ";
             this.prueba = false;
         }else{
             this.cuestionrio ="No hay comunidades cercanas";
             this.prueba = true;
         }
      })
      .catch(error => {
        this.Toast("No se pueden cargar las comunidades");
      })
  }
  getReporteEjecutivo(idComunidad?: string) {
    this.reporteService.reporteEjecutivo(idComunidad).then(data => {
      this.preguntas = [];
      this.pregunt = [];
      this.preguntas = data["respuesta"]
      data["respuesta"].forEach(element => {
        let aux = this.pregunt.find(el => el.pregunta == element.Descripcion)
        if ((aux == null) || (aux == undefined)) {
          let respuest: Array<Respuestas> = [];
          var resp;
          let id = element.IdPregunta;
          this.comunidad = element.NombreComunidad;
          resp = this.preguntas = data["respuesta"].filter(elemt => elemt.IdPregunta == id)
          const regex = /,/gi;
          resp.forEach(dat => {
            let descripcion = dat.DescripcionRespuestaAbierta;
            if (element.identificadoPregunta == 6 || element.identificadoPregunta == 2) {
              descripcion = descripcion.substr(2, descripcion.let);
            }
            respuest.push({ descripcion: descripcion.replace(regex, '\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0') })
          });
          this.pregunt.push({ pregunta: element.Descripcion, respuestas: respuest })
        }
      });
      if (this.pregunt.length > 0) {
        this.prueba = false;
      } else {
        this.prueba = true;
      }
    }).catch(error => {
      this.Toast("Error al mostrar datos");
    })

  }
  getCoordenadas() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude; 
      this.cargarParroquiaMapa();
    }).catch((error) => {
      this.Toast("Error al obtener las coordenadas");
    });
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
