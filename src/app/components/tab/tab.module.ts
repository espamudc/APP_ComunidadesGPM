import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TabComponent],
  imports: [ CommonModule, IonicModule, RouterModule],
  exports: [TabComponent]
})
export class TabModule { }
