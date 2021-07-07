import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionesPage } from './versiones.page';

const routes: Routes = [
  {
    path: '',
    component: VersionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VersionesPageRoutingModule {}
