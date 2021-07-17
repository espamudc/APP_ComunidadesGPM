import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-respuesta-abierta',
  templateUrl: './respuesta-abierta.component.html',
  styleUrls: ['./respuesta-abierta.component.scss'],
})
export class RespuestaAbiertaComponent implements OnInit {
  @Input() Item: any = {};
  respuestas:any=[];
  constructor() { }

  ngOnInit() {
    this.respuestas= this.Item.ListaRespuestas;
  }

}
