import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbiertaComponent } from './abierta/abierta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatrizComponent } from './matriz/matriz.component';
import { SeleccionUnicaComponent } from './seleccion-unica/seleccion-unica.component';
import { SeleccionMultipleComponent } from './seleccion-multiple/seleccion-multiple.component';
import { ListCuestionarioComponent } from './list-cuestionario/list-cuestionario.component';
import { MatrizAbiertaComponent } from './matriz-abierta/matriz-abierta.component';
import { SeccionComponent } from './seccion/seccion.component';


@NgModule({
  declarations: [
    AbiertaComponent,
    MatrizComponent,
    SeccionComponent,
    SeleccionUnicaComponent,SeleccionMultipleComponent,
    ListCuestionarioComponent,MatrizAbiertaComponent],
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule,ReactiveFormsModule]
  ,exports:[AbiertaComponent,
    MatrizComponent,
    SeleccionUnicaComponent,
    SeleccionMultipleComponent,
    SeccionComponent,
    ListCuestionarioComponent,MatrizAbiertaComponent]
})
export class TipoPreguntaModule { }
