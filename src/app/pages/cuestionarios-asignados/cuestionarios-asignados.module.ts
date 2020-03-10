import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuestionariosAsignadosPageRoutingModule } from './cuestionarios-asignados-routing.module';

import { CuestionariosAsignadosPage } from './cuestionarios-asignados.page';
// import { CuestionarioRespuestasPage } from '../cuestionario-respuestas/cuestionario-respuestas.page';
// import { CuestionarioRespuestasPageModule } from '../cuestionario-respuestas/cuestionario-respuestas.module';

@NgModule({
  // entryComponents : [CuestionarioRespuestasPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuestionariosAsignadosPageRoutingModule
    // ,CuestionarioRespuestasPageModule
  ],
  declarations: [CuestionariosAsignadosPage]
})
export class CuestionariosAsignadosPageModule {}
