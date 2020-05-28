import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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
    private network:Network
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
    if (this.formValidarCorreo.valid==true) {
      this._validarUsuario();
    }
  }

  _validarUsuario(){
    this.usuarioService._validarCorreo(this.formValidarCorreo.get('_usuario').value)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log(data['respuesta']);
          localStorage.setItem("_correo",data['respuesta']);
          this.router.navigateByUrl("login");
          // this.ocultar = false;
        } else {
          
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

}
