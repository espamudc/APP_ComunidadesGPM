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
export class LoginPage implements OnInit,AfterViewInit {

  formLogin: FormGroup;
 

  constructor( private usuarioService: UsuarioService,
                private router: Router 
                ,private menuController:MenuController,
                private toastController: ToastController,
                ) { 
    
    this.formLogin = new FormGroup({
      _usuario  : new FormControl('', [Validators.required,Validators.email]),
      _clave    : new FormControl('', [Validators.required])
    });

    

  }

  _ocultar = true;
  _misTiposUsuarios:any[]=[];
  // @ViewChild('formLogin',{static:false}) formLogin : FormGroup;

  ngOnInit() {
    this.formLogin.get('_usuario').setValue(localStorage.getItem("_correo"));

  }
  ngAfterViewInit(){
    this.menuController.enable(false);

  }
  verBackButton = false;
  ionViewWillEnter(){
    if (localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado")!=null) {
      this.verBackButton = false;
      console.log("true",this.verBackButton);
    }else{
      this.verBackButton = true;
      console.log("false",this.verBackButton);
      
    }
    this.menuController.enable(false);
  }

  _redirecto(){
    console.log("RETU");
    this
    this.router.navigateByUrl("login");
    
  }

 async presentToastWithButtons(_mensaje,_duracion:number=2000)  {
   const toast = await this.toastController.create({
     animated: true,
     buttons: [
        {
         text: 'Cerrar',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ],
    //  color: 'danger',
    //  cssClass: 'toast-success',
     duration: _duracion,
    //  header: 'Toast header',
     keyboardClose: true,
     message: _mensaje,
    //  mode: 'ios',
     position: 'bottom',
     translucent: true
   });
   toast.present();
 }

 async presentToast(_mensaje,_duracion:number=2000) {
   const toast = await this.toastController.create({
     message: _mensaje,
     duration: _duracion
   });
   toast.present();
 }

  _validarCredenciales(){
    // let _correo = this.formValidarCorreo.get('_usuario').value;

    console.log("usuario .",this.formLogin.get('_usuario').value);
    console.log("clave .",this.formLogin.get('_clave').value);
    

    let _correo = this.formLogin.get('_usuario').value;
    let _clave = this.formLogin.get('_clave').value;

    this.usuarioService._login(_correo,_clave,"")
        .then(data=>{
          if (data['http']['codigo']=='200') {

            // this._verFormularioLogin=false;
            this._misTiposUsuarios = data['respuesta'];
            localStorage.setItem("_clave",_clave);

            if (this._misTiposUsuarios.length<0) {
              // this.mensaje("No Tiene Roles Asignados");
            }else if (this._misTiposUsuarios.length==1) {

              localStorage.setItem('IdAsignarUsuarioTipoUsuarioEncriptado',this._misTiposUsuarios[0].IdAsignarUsuarioTipoUsuarioEncriptado);
              if (localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado').length==0) {
                
              }else{
                console.log("IdAsignarUsuarioTipoUsuarioEncriptado solo uno:",localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'));
                
                // this.router.navigateByUrl("/home");
                this.router.navigateByUrl("/tabs");
              }
              
            }
            else if (this._misTiposUsuarios.length>1) {
              console.log(this._misTiposUsuarios);
              this._ocultar = false;
              // this._verFormularioMisTiposUsuarios=true;
            }
            
          }else if (data['http']['codigo']=='500') {
            this.presentToastWithButtons("Contraceña Incorrecta",3000);
            // this.mensaje("A ocurrido un error inesperado, intente más tarde.")
          }else{
            this.presentToastWithButtons("Contraceña Incorrecta",3000);

            // this.mensaje(data['http']['mensaje']);
          }
        }).catch(error=>{

        }).finally(()=>{

        });
  }

  _escojerRol(_item){
    localStorage.setItem('IdAsignarUsuarioTipoUsuarioEncriptado',_item.IdAsignarUsuarioTipoUsuarioEncriptado);
    // this.router.navigateByUrl("/home");
    this.router.navigateByUrl("/tabs/home");
  }

}
