import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RespuestaAbiertaComponent } from './respuesta-abierta/respuesta-abierta.component';


@NgModule({
  declarations: [RespuestaAbiertaComponent],
  imports: [ CommonModule, IonicModule, RouterModule],
  exports: [RespuestaAbiertaComponent]
})
export class TipoRespuestaModule { }
