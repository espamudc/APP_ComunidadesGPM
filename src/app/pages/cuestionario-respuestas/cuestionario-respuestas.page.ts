import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuestionario-respuestas',
  templateUrl: './cuestionario-respuestas.page.html',
  styleUrls: ['./cuestionario-respuestas.page.scss'],
})
export class CuestionarioRespuestasPage implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }

  IdAsignarEncuestadoEncriptado : any ="";

  ngOnInit() {
    this.IdAsignarEncuestadoEncriptado = this.activatedRoute.snapshot.paramMap.get('item');
    console.log(this.IdAsignarEncuestadoEncriptado);
    
  }

}
