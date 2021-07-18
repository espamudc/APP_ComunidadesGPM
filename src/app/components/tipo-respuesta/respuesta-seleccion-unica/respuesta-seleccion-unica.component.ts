import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-respuesta-seleccion-unica',
  templateUrl: './respuesta-seleccion-unica.component.html',
  styleUrls: ['./respuesta-seleccion-unica.component.scss'],
})
export class RespuestaSeleccionUnicaComponent implements OnInit {
  @Input() Item: any = {};
  respuestas:any=[];
  loadingMatriz:boolean=true;
  constructor() { }

  ngOnInit() {
    this.respuestas= this.Item.ListaRespuestas;
    this.loadingMatriz=false;
  }

}
