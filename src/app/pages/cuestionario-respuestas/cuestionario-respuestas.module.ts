import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuestionarioRespuestasPageRoutingModule } from './cuestionario-respuestas-routing.module';

import { CuestionarioRespuestasPage } from './cuestionario-respuestas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuestionarioRespuestasPageRoutingModule
  ],
  declarations: [CuestionarioRespuestasPage]
})
export class CuestionarioRespuestasPageModule {}
