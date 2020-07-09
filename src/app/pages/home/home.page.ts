import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
numeroCuestionarioNuevos:number;
numeroCuestionarioCanceladas:number=0;
  constructor(
    private menuController:MenuController,
    private asignarEncuestadoService:AsignarEncuestadoService
  ) { }

  ngOnInit() {
    this.menuController.enable(true);
    this._consultarCuestionariosNuevos();
  }
  _consultarCuestionariosNuevos(){
    this.asignarEncuestadoService._consultarporidasignarusuariotipousuariotecnico(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')) 
      .then(data=>{
        this.numeroCuestionarioNuevos=data["respuesta"].length;
        data["respuesta"].forEach(element => {
          if(element.Estado==0){
            this.numeroCuestionarioCanceladas++
          }
       });
      }).catch(error=>{
        debugger
      })
  }

}
