import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RespuestaAbiertaComponent } from './respuesta-abierta/respuesta-abierta.component';
import { RespuestaSeleccionUnicaComponent } from './respuesta-seleccion-unica/respuesta-seleccion-unica.component';


@NgModule({
  declarations: [RespuestaAbiertaComponent,RespuestaSeleccionUnicaComponent],
  imports: [ CommonModule, IonicModule, RouterModule],
  exports: [RespuestaAbiertaComponent,RespuestaSeleccionUnicaComponent]
})
export class TipoRespuestaModule { }
