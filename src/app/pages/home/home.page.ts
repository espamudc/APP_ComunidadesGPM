import { Component, OnInit } from '@angular/core';
import { MenuController,ToastController } from '@ionic/angular';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
numeroCuestionarioNuevos:number=0;
numeroCuestionarioCanceladas:number=0;
numeroCuestionarioFinalizados:number=0;
numeroCuestionarioEnProceso:number=0;
estadoEncuestas:boolean = true;
 ar:any []=[];
  constructor(
    private menuController:MenuController,
    private asignarEncuestadoService:AsignarEncuestadoService,
    private toastController: ToastController,
    private storage:Storage,
    private router:Router,
    private alertController: AlertController
  ) { }
  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      cssClass: 'alertCancel',
      message: '<strong>Desea cerrar sesión</strong>!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          cssClass: 'alertButton',
          handler: () => {
            console.log('Confirm Okay');
            localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
            localStorage.removeItem('IdAsignarEncuestadoEncriptado');
            localStorage.removeItem('authService');
            localStorage.removeItem('validarUser');
            localStorage.removeItem('TipoUsuario');
            localStorage.removeItem("_correo");
            localStorage.clear();
            this.router.navigateByUrl('/validar-usuario');
            this.storage.clear();
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnInit() {
    this.menuController.enable(true);
    this._consultarCuestionariosNuevos();
  }
  ionViewDidEnter() {
    this.menuController.enable(true);
    this._consultarCuestionariosNuevos();
  }
   encuestasNuevas(){ 
    this.dataStorage(10);
    this.router.navigate(["/tabs/cuestionarios-asignados"], {state: {setRoot: true}});
  }
   encuestasEnProceso(){
    this.dataStorage(0);
    this.router.navigate(['/tabs/cuestionarios-asignados'], {state: {setRoot: true}});
  }
   encuestasFinalizadas(){
    this.dataStorage(1);
    this.router.navigate(['/tabs/cuestionarios-asignados']);
  }
  dataStorage(calor:number){
    this.ar.unshift({'EstadoCuestionarios':calor});
    this.storage.set('cuestionarios',this.ar );
  }
  _consultarCuestionariosNuevos(){
    this.asignarEncuestadoService.mostrarEncuestasPorTecnico(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')) 
      .then(data =>{
        this.ar =[];
        this.ar.unshift({'respuesta':data["respuesta"]});
        this.storage.set('cuestionarios',this.ar );
        this.numeroCuestionarioNuevos=0;
        this.numeroCuestionarioCanceladas=0;
        this.numeroCuestionarioFinalizados=0;
        this.numeroCuestionarioEnProceso=0;
        this. estadoEncuestas=true;
        data["respuesta"].forEach(element => {
          if(element.Estado==0){
            this.numeroCuestionarioCanceladas++
          }
          if( element.CuestionarioFinalizado=='10'){
            this.estadoEncuestas=false;
            this.numeroCuestionarioNuevos++;
          }
          if(element.CuestionarioFinalizado==1){
            this.numeroCuestionarioFinalizados++;
          }
          if(element.CuestionarioFinalizado ==0){
            this.numeroCuestionarioEnProceso++;
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
