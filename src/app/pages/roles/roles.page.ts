import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})

export class RolesPage implements OnInit {
 tipoRol:any;
  options: AnimationOptions = {
    path: '/assets/rol.json',
    autoplay: true,
    loop: true
  };
  constructor(private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage:Storage) { }
  ngOnInit() {
   this.tipoRol= JSON.parse(localStorage.getItem("TipoUsuario"));
   localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
  }
  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: ':: Confirmar ::',
      cssClass: 'alertCancel',
      message: '<strong>¿Desea cerrar sesión</strong>?',
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
            this.router.navigateByUrl('/inicio');
            this.storage.clear();
          }
        }
      ]
    });
    await alert.present();
  }
  animationCreated(animationItem: AnimationItem): void {
    //console.log(animationItem);
  }
  onDestroy() {
    localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    localStorage.removeItem('IdAsignarEncuestadoEncriptado');
  }
  _escojerRol(_item:any) {
    localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    localStorage.removeItem('IdAsignarEncuestadoEncriptado');
    localStorage.setItem('IdAsignarUsuarioTipoUsuarioEncriptado', _item.IdAsignarUsuarioTipoUsuarioEncriptado);
    if( _item.TipoUsuario.toUpperCase()=="TÉCNICO"){
      this.router.navigateByUrl("/tabs/home");
    }
    if( _item.TipoUsuario.toUpperCase()=="ADMINISTRADOR"){
      this.router.navigateByUrl("reporte-ejecutivo");
    }
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
