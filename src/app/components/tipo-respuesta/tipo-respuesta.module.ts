import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RespuestaAbiertaComponent } from './respuesta-abierta/respuesta-abierta.component';
import { RespuestaSeleccionUnicaComponent } from './respuesta-seleccion-unica/respuesta-seleccion-unica.component';
import { RespuestaMatrizAbiertaComponent } from './respuesta-matriz-abierta/respuesta-matriz-abierta.component';
import { RespuestaMatrizSeleccionComponent } from './respuesta-matriz-seleccion/respuesta-matriz-seleccion.component';


@NgModule({
  declarations: [
    RespuestaAbiertaComponent,
    RespuestaSeleccionUnicaComponent,
    RespuestaMatrizAbiertaComponent,RespuestaMatrizSeleccionComponent],
  imports: [ CommonModule, IonicModule, RouterModule],
  exports: [
    RespuestaAbiertaComponent,
    RespuestaSeleccionUnicaComponent,
    RespuestaMatrizAbiertaComponent,RespuestaMatrizSeleccionComponent]
})
export class TipoRespuestaModule { }
