import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  formLogin: FormGroup;
  isSelect:any=true;
  constructor(private usuarioService: UsuarioService,
    private router: Router
    , private menuController: MenuController,
    private toastController: ToastController,

  ) {
    this.formLogin = new FormGroup({
      _usuario: new FormControl('', [Validators.required, Validators.email]),
      _clave: new FormControl('', [Validators.required])
    });
  }
  _ocultar = true;
  _misTiposUsuarios: any[] = [];
  ngOnInit() {
    this.formLogin.get('_usuario').setValue(localStorage.getItem("_correo"))
  }
  ngAfterViewInit() {
    this.menuController.enable(false);
  }
  verBackButton = false;
  ionViewWillEnter() {
    if (localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado") != null) {
      this.verBackButton = false;
    } else {
      this.verBackButton = true;
    }
    this.menuController.enable(false);
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
  _validarCredenciales() {
    let _correo = this.formLogin.get('_usuario').value;
    let _clave = this.formLogin.get('_clave').value;
    this.usuarioService._login(_correo, _clave, "")
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._misTiposUsuarios = data['respuesta'];
          if (this._misTiposUsuarios.length < 0) {
            this.Toast("No tiene roles", 3000);
          } else if (this._misTiposUsuarios.length >= 1) {
            this._ocultar = false;
          } else if (data['http']['codigo'] == '500') {
            this.Toast("Contraceña Incorrecta", 3000);
          } else {
            this.Toast("Contraceña Incorrecta", 3000);
          }
        }
      }).catch(error => {
        this.Toast("Revise su conexión", 3000);
      })
  }
  _escojerRol(_item:any) {
    debugger
    localStorage.setItem('IdAsignarUsuarioTipoUsuarioEncriptado', _item.IdAsignarUsuarioTipoUsuarioEncriptado);
    this.router.navigateByUrl("/tabs/home");
  }
}
