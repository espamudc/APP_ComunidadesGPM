import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CuestionariosAsignadosPageRoutingModule } from './cuestionarios-asignados-routing.module';
import { CuestionariosAsignadosPage } from './cuestionarios-asignados.page';
import { TipoPreguntaModule } from '../../components/tipo-pregunta/tipo-pregunta.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuestionariosAsignadosPageRoutingModule,
    TipoPreguntaModule
  ],
  declarations: [CuestionariosAsignadosPage]
})
export class CuestionariosAsignadosPageModule {}
