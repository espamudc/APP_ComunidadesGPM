import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbiertaComponent } from './abierta/abierta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatrizComponent } from './matriz/matriz.component';
import { SeleccionUnicaComponent } from './seleccion-unica/seleccion-unica.component';
import { SeleccionMultipleComponent } from './seleccion-multiple/seleccion-multiple.component';



@NgModule({
  declarations: [AbiertaComponent,MatrizComponent,SeleccionUnicaComponent,SeleccionMultipleComponent],
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule,ReactiveFormsModule]
  ,exports:[AbiertaComponent,MatrizComponent,SeleccionUnicaComponent,SeleccionMultipleComponent]
})
export class TipoPreguntaModule { }
