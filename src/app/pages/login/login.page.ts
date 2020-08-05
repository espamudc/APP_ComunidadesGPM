import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  password: any;
  isSelect: any = true;
  esValido: boolean = true;
  correo: any
  constructor(private usuarioService: UsuarioService,
    private router: Router
    , private menuController: MenuController,
    private toastController: ToastController,

  ) {
  }
  _misTiposUsuarios: any[] = [];
  ngOnInit() {
    this.correo = localStorage.getItem("_correo");
  }
  valido(Event: any) {
    if (Event.target.value.length >= 5) {
      this.esValido = false;
    } else {
      this.esValido = true;
    }
  }
  ngAfterViewInit() {
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
    let _correo = this.correo;
    let _clave = this.password;
    this.usuarioService._login(_correo, _clave, "")
      .then(data => {
        if (data['http']['codigo'] == '200') {
          let user: Array<any> = [];
          this._misTiposUsuarios = data['respuesta'];
          this._misTiposUsuarios.forEach(element => {
            user.push({ 'IdAsignarUsuarioTipoUsuarioEncriptado': element.IdAsignarUsuarioTipoUsuarioEncriptado,
                   'TipoUsuario': element.TipoUsuario.Descripcion});
          });
          localStorage.setItem('TipoUsuario', JSON.stringify(user));
          this.router.navigateByUrl("roles");
        } else {
          this.Toast(data['http']['mensaje'], 3000);
        }
      }).catch(error => {
        this.Toast("Revise su conexión", 3000);
      })
  }
}
