import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteEjecutivoPage } from './reporte-ejecutivo.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteEjecutivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteEjecutivoPageRoutingModule {}
