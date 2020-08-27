import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { IonicModule } from '@ionic/angular';

import { ScreenMessengerPageRoutingModule } from './screen-messenger-routing.module';

import { ScreenMessengerPage } from './screen-messenger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule,
    ScreenMessengerPageRoutingModule
  ],
  declarations: [ScreenMessengerPage]
})
export class ScreenMessengerPageModule {}
