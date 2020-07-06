import { Component, OnInit,AfterViewInit } from '@angular/core';
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
export class ValidarUsuarioPage implements OnInit,AfterViewInit {

  formValidarCorreo : FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private menuController:MenuController,
    private network:Network,
    private toastController: ToastController
  ) {

    this.formValidarCorreo = new FormGroup({
      _usuario  : new FormControl('',[Validators.required,Validators.email])
    });

   }

  ngOnInit() {


    
  }
  ngAfterViewInit(){
    console.log("hola");
    
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // stop connect watch
    connectSubscription.unsubscribe();
  }
  
  ionViewWillEnter(){
    this.menuController.enable(false);
    // this.menuController.
  }
  
  
  _validarformValidarCorreo(){
    debugger
    if (this.formValidarCorreo.valid==true) {
      this._validarUsuario();
    }
  }

  _validarUsuario(){
    debugger
    this.usuarioService._validarCorreo(this.formValidarCorreo.get('_usuario').value)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log(data['respuesta']);
          localStorage.setItem("_correo",data['respuesta']);
          this.router.navigateByUrl("login");
          // this.ocultar = false;
        } else {
          console.log("no user");
          this.presentToastWithButtons("El usuario no existe, por favor, verifique el usuario",3000 );
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  async presentToastWithButtons(_mensaje:string,_duracion:number=2000) {
    const toast = await this.toastController.create({
      animated: true,
      buttons: [
        // {
        //   side: 'start',
        //   icon: 'star',
        //   text: 'Favorite',
        //   handler: () => {
        //     console.log('Favorite clicked');
        //   }
        // },
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ],
      // color: 'primary',
      // cssClass: 'toast-success',
      duration: _duracion,
      // header: 'Toast header',
      keyboardClose: true,
      message: _mensaje,
      // mode: 'ios',
      position: 'bottom',
      translucent: true
    });
    toast.present();
  }

}
