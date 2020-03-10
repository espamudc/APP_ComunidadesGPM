import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
 

  constructor( private usuarioService: UsuarioService,
                private router: Router ) { 
    
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

  _redirecto(){
    console.log("RETU");
    this
    this.router.navigateByUrl("login");
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
                
                this.router.navigateByUrl("/home");
              }
              
            }
            else if (this._misTiposUsuarios.length>1) {
              console.log(this._misTiposUsuarios);
              this._ocultar = false;
              // this._verFormularioMisTiposUsuarios=true;
            }
            
          }else if (data['http']['codigo']=='500') {
            // this.mensaje("A ocurrido un error inesperado, intente más tarde.")
          }else{
            // this.mensaje(data['http']['mensaje']);
          }
        }).catch(error=>{

        }).finally(()=>{

        });
  }

  _escojerRol(_item){
    localStorage.setItem('IdAsignarUsuarioTipoUsuarioEncriptado',_item.IdAsignarUsuarioTipoUsuarioEncriptado);
    this.router.navigateByUrl("/home");
  }

}
