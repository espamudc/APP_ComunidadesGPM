import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TipoRespuestaModule} from 'src/app/components/tipo-respuesta/tipo-respuesta.module';
import { PreguntasPageRoutingModule } from './preguntas-routing.module';
import { PreguntasPage } from './preguntas.page';
import { TabModule } from 'src/app/components/tab/tab.module';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TabModule,
    PreguntasPageRoutingModule,TipoRespuestaModule
  ],
  declarations: [PreguntasPage]
})
export class PreguntasPageModule {}
