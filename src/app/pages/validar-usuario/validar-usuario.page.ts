import { Component, OnInit, AfterViewInit } from '@angular/core';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Network } from "@ionic-native/network/ngx";
@Component({
  selector: 'app-validar-usuario',
  templateUrl: './validar-usuario.page.html',
  styleUrls: ['./validar-usuario.page.scss'],
})
export class ValidarUsuarioPage {
  esValido:boolean = true;
  correo:any;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private menuController: MenuController,
    private network: Network,
    private toastController: ToastController
  ) {
  
  }

  esEmailValido(Event:any):boolean {
      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (Event.target.value.match(EMAIL_REGEX)){
        this.esValido = false;
      }else{
        this.esValido = true;
      }
    return this.esValido;
  }
  ionViewWillEnter() {
    this.menuController.enable(false);
  }
  _validarUsuario() {
      this.usuarioService._validarCorreo(this.correo)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          localStorage.setItem("_correo", data['respuesta']);
          localStorage.setItem("validarUser", "true");
          this.router.navigateByUrl("login");
        } else {
          this.Toast("Correo no válido", 3000);
        }
      }).catch(error => {
        this.Toast("Revise su conexión", 3000);
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
