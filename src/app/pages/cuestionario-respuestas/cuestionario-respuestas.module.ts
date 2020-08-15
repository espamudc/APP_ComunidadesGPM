import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CuestionarioRespuestasPageRoutingModule } from './cuestionario-respuestas-routing.module';
import { CuestionarioRespuestasPage } from './cuestionario-respuestas.page';
import { TipoPreguntaModule } from 'src/app/components/tipo-pregunta/tipo-pregunta.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuestionarioRespuestasPageRoutingModule
    ,ReactiveFormsModule
    ,TipoPreguntaModule
  ],
  declarations: [CuestionarioRespuestasPage]
})
export class CuestionarioRespuestasPageModule {}
