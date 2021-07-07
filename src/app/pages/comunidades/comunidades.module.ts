import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComunidadesPageRoutingModule } from './comunidades-routing.module';

import { ComunidadesPage } from './comunidades.page';
import { TabModule } from 'src/app/components/tab/tab.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunidadesPageRoutingModule,
    TabModule
  ],
  declarations: [ComunidadesPage]
})
export class ComunidadesPageModule {}
