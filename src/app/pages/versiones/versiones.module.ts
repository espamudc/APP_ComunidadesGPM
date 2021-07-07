import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VersionesPageRoutingModule } from './versiones-routing.module';

import { VersionesPage } from './versiones.page';
import { TabModule } from 'src/app/components/tab/tab.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VersionesPageRoutingModule,
    TabModule
  ],
  declarations: [VersionesPage]
})
export class VersionesPageModule {}
