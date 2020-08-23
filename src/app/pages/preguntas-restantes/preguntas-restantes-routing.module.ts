import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasRestantesPage } from './preguntas-restantes.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasRestantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasRestantesPageRoutingModule {}
