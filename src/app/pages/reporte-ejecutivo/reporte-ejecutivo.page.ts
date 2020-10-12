import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../services/reporte.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapaService } from '../../services/mapa.service';
import { CabeceraRespuestaService } from '../../services/cabecera-respuesta.service';
import { ToastController } from '@ionic/angular';
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
  preguntas: any;
  htmlStr: any;
  comunidad: any;
  pregunt: Array<Preguntas> = [];
  latitud: number;
  longitud: number;
  datos: any;
  constructor(private reporteService: ReporteService,
    private geolocation: Geolocation,
    private mapaService: MapaService,
    private cabeceraRespuestaService: CabeceraRespuestaService,
    private toastController: ToastController) { }
  ngOnInit() {
    this.getCoordenadas()
    this.getReporteEjecutivo("MgA=");
  }
  llamarReporteEjecutivo(idComunidad: string) {
    this.getReporteEjecutivo(idComunidad);
  }
  cargarParroquiaMapa() {
    this.mapaService._obtenerParroquia(this.latitud, this.longitud).then(data => {
      let parroquia = data['results'][0].address_components[1].short_name;
      this.cabeceraRespuestaService._comunidadesPorCoordendasDeParroquia(parroquia)
        .then(data => {
          this.datos = data['respuesta']
        })
        .catch(error => {
          this.Toast("No se pueden cargar las comunidades");
        })
    }).catch(error => {
      this.Toast("Error al obetner la parroquia");
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
    }).catch(error => {
      this.Toast("Error al mostrar datos");
    })

  }
  getCoordenadas() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // this.latitud = resp.coords.latitude;
      //  this.longitud = resp.coords.longitude;
      this.latitud = -0.848592;
      this.longitud = -80.161615;;
      console.log("Latitud", this.latitud);
      console.log("Longitud", this.longitud);
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
