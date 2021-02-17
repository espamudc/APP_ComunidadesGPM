import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenMessengerPage } from './screen-messenger.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenMessengerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenMessengerPageRoutingModule {}
