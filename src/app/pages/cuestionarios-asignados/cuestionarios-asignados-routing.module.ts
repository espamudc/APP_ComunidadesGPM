import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuestionariosAsignadosPage } from './cuestionarios-asignados.page';

const routes: Routes = [
  {
    path: '',
    component: CuestionariosAsignadosPage,
    children:[
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuestionariosAsignadosPageRoutingModule {}
