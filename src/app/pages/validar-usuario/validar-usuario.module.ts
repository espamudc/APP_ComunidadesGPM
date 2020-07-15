import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ValidarUsuarioPageRoutingModule } from './validar-usuario-routing.module';
import { ValidarUsuarioPage } from './validar-usuario.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidarUsuarioPageRoutingModule
    , ReactiveFormsModule
  ],
  declarations: [ValidarUsuarioPage]
})
export class ValidarUsuarioPageModule {}
