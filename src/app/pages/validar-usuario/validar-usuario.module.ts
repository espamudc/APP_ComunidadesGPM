import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidarUsuarioPageRoutingModule } from './validar-usuario-routing.module';

import { ValidarUsuarioPage } from './validar-usuario.page';
// import { Network } from '@ionic-native/network/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidarUsuarioPageRoutingModule
    , ReactiveFormsModule
    // , Network
  ],
  declarations: [ValidarUsuarioPage]
})
export class ValidarUsuarioPageModule {}
