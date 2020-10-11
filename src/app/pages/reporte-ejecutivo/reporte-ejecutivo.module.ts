import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteEjecutivoPageRoutingModule } from './reporte-ejecutivo-routing.module';

import { ReporteEjecutivoPage } from './reporte-ejecutivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteEjecutivoPageRoutingModule
  ],
  declarations: [ReporteEjecutivoPage]
})
export class ReporteEjecutivoPageModule {}
