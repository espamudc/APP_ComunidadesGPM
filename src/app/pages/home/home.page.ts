import { Component, OnInit } from '@angular/core';
import { MenuController,ToastController } from '@ionic/angular';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
numeroCuestionarioNuevos:number=0;
numeroCuestionarioCanceladas:number=0;
numeroCuestionarioFinalizados:number=0;
estadoEncuestas:boolean = true;
  constructor(
    private menuController:MenuController,
    private asignarEncuestadoService:AsignarEncuestadoService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.menuController.enable(true);
    this._consultarCuestionariosNuevos();
  }
  ionViewDidEnter() {
    this.menuController.enable(true);
    this._consultarCuestionariosNuevos();
  }
  _consultarCuestionariosNuevos(){
    this.numeroCuestionarioNuevos=0;
    this.numeroCuestionarioCanceladas=0;
    this.numeroCuestionarioFinalizados=0;
    this. estadoEncuestas=true;
   // let dd =localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    debugger
    this.asignarEncuestadoService.mostrarEncuestasPorTecnico(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')) 
      .then(data=>{
        debugger
       // cuestionario=data["respuesta"].length;
        data["respuesta"].forEach(element => {
          if(element.Estado==0){
            this.numeroCuestionarioCanceladas++
          }
          if(element.CuestionarioFinalizado==0){
            this.estadoEncuestas=false;
            this.numeroCuestionarioNuevos++;
          }
          if(element.CuestionarioFinalizado==1){
            this.numeroCuestionarioFinalizados++;
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
