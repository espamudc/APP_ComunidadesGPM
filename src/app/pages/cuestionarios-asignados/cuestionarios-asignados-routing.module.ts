import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuestionariosAsignadosPage } from './cuestionarios-asignados.page';

const routes: Routes = [
  {
    path: '',
    component: CuestionariosAsignadosPage,
    children:[
      // {
      //   path: 'cuestionario-respuestas',
      //   loadChildren: () => import('../cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
      // },
    ]
    // children : [
    //   {
    //     path: 'item/:item',
    //     loadChildren: () => import('../cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
    //   },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuestionariosAsignadosPageRoutingModule {}
