import { Component, OnInit,Input } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-respuesta-matriz-abierta',
  templateUrl: './respuesta-matriz-abierta.component.html',
  styleUrls: ['./respuesta-matriz-abierta.component.scss'],
})
export class RespuestaMatrizAbiertaComponent implements OnInit {
  @Input() Item: any = {};
  respuestas:any=[];
  listaOpcionesPreguntaSeleccion:any[]=[];
  constructor(private preguntasService:PreguntasService) { }

  ngOnInit() {
    this._consultarPreguntasSeleccion();
    this.estructurarRespuesta();
  }
  async _consultarPreguntasSeleccion(){
    var respuesta = await this.preguntasService._consultarOpcionPreguntaSeleccion(
      this.Item.IdPreguntaEncriptado
    );
    if (respuesta['http']['codigo']=='200') {
      this.listaOpcionesPreguntaSeleccion = respuesta['respuesta'];
    }else{
    }
  }

  estructurarRespuesta(){
    this.respuestas=[];
    this.Item['ListaRespuestas'].map(items => {
      this.respuestas.push(items['DescripcionRespuestaAbierta'].split(','));
    });
  }

}
