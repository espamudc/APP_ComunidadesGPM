import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private alertController: AlertController
              ,private router : Router) { }

  ngOnInit() {
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: '<strong>Desea cerrar la sesión</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
            localStorage.removeItem('IdAsignarEncuestadoEncriptado');
            localStorage.removeItem('authService');
            localStorage.removeItem('validarUser');
            localStorage.removeItem('TipoUsuario');
            localStorage.removeItem("_correo");
            this.router.navigateByUrl('/validar-usuario');
          }
        }
      ]
    });
  
    await alert.present();
  }

}
