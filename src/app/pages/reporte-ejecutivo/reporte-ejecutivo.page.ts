import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../services/reporte.service';
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

  constructor(private reporteService: ReporteService) { }

  ngOnInit() {
    this.getReporteEjecutivo();
  }
  getReporteEjecutivo() {
    this.reporteService.reporteEjecutivo("MgA=").then(data => {
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
            let descripcion=dat.DescripcionRespuestaAbierta;
            if(element.identificadoPregunta==6 || element.identificadoPregunta==2){
              descripcion=descripcion.substr(2,descripcion.let);
            }
            respuest.push({ descripcion: descripcion.replace(regex, '\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0') })
          });
          this.pregunt.push({ pregunta: element.Descripcion, respuestas: respuest })
        }
      });
    }).catch(error => {
      debugger
    })
    //     0:
    // Descripcion: "ejemplo"
    // DescripcionRespuestaAbierta: "1,pipo,dfdfdf"
    // IdComunidad: "2"
    // IdPregunta: "276"
    // NombreComunidad: "Quiroga"
  }
}
