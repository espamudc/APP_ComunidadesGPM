import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasRestantesPageRoutingModule } from './preguntas-restantes-routing.module';

import { PreguntasRestantesPage } from './preguntas-restantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasRestantesPageRoutingModule
  ],
  declarations: [PreguntasRestantesPage]
})
export class PreguntasRestantesPageModule {}
