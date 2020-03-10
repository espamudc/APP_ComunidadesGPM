import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabeceraRespuestaService } from 'src/app/services/cabecera-respuesta.service';

@Component({
  selector: 'app-cuestionario-respuestas',
  templateUrl: './cuestionario-respuestas.page.html',
  styleUrls: ['./cuestionario-respuestas.page.scss'],
})
export class CuestionarioRespuestasPage implements OnInit {

  constructor(
              private activatedRoute:ActivatedRoute
              ,private cabeceraRespuestaService: CabeceraRespuestaService
              ) { }

  IdAsignarEncuestadoEncriptado : any ="";
  listaCabeceraRespuesta:any []=[];
  ngOnInit() {
    this.IdAsignarEncuestadoEncriptado = localStorage.getItem("IdAsignarEncuestadoEncriptado"); // = this.activatedRoute.snapshot.paramMap.get('item');
    console.log("onInit",this.IdAsignarEncuestadoEncriptado);
    this._consultarporidasignarencuestado();
  }

  _consultarporidasignarencuestado(){
    this.cabeceraRespuestaService._consultarporidasignarencuestado(this.IdAsignarEncuestadoEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this.listaCabeceraRespuesta=data['respuesta'];
          console.log("listaCabeceraRespuesta",this.listaCabeceraRespuesta);
          
        } else {
          console.log(data['http']);
          
        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{

      });
  }

}
