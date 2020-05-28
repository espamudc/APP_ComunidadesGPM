import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuestionarioRespuestasPage } from './cuestionario-respuestas.page';

const routes: Routes = [
  {
    path: '',
    component: CuestionarioRespuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuestionarioRespuestasPageRoutingModule {}
