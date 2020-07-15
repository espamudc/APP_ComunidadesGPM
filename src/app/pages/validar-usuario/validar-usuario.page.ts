import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Network } from "@ionic-native/network/ngx";
@Component({
  selector: 'app-validar-usuario',
  templateUrl: './validar-usuario.page.html',
  styleUrls: ['./validar-usuario.page.scss'],
})
export class ValidarUsuarioPage implements OnInit, AfterViewInit {
  formValidarCorreo: FormGroup;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private menuController: MenuController,
    private network: Network,
    private toastController: ToastController
  ) {
    this.formValidarCorreo = new FormGroup({
      _usuario: new FormControl('', [Validators.required, Validators.email])
    });
  }
  ngOnInit() {
  }
  ngAfterViewInit() {

  }
  ionViewWillEnter() {
    this.menuController.enable(false);
  }
  _validarformValidarCorreo() {
    if (this.formValidarCorreo.valid == true) {
      this._validarUsuario();
    }
  }
  _validarUsuario() {
    this.usuarioService._validarCorreo(this.formValidarCorreo.get('_usuario').value)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          localStorage.setItem("_correo", data['respuesta']);
          this.router.navigateByUrl("login");
        } else {
          this.Toast("Correo no valido", 3000);
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
