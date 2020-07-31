import { Component, OnInit } from '@angular/core';
import { MenuController,ToastController } from '@ionic/angular';
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
    private asignarEncuestadoService:AsignarEncuestadoService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.menuController.enable(true);
    this._consultarCuestionariosNuevos();
  }
  _consultarCuestionariosNuevos(){
    let dd =localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    debugger
    this.asignarEncuestadoService.mostrarEncuestasPorTecnico(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')) 
      .then(data=>{
        this.numeroCuestionarioNuevos=data["respuesta"].length;
        data["respuesta"].forEach(element => {
          if(element.Estado==0){
            this.numeroCuestionarioCanceladas++
          }
       });
      }).catch(error=>{
        this.Toast("Error la cargar datos")
      })
  }
  async Toast(_mensaje: string, _duracion: number = 2000) {
    const toast = await this.toastController.create({
      message: _mensaje,
      position: 'bottom',
      animated: true,
      duration: _duracion,
      color: 'dark',
      cssClass: 'toastFormato',
      buttons: [
        {
          side: 'end',
          icon: 'close-circle-outline',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }
}
