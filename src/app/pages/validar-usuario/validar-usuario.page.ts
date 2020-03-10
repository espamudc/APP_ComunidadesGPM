import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validar-usuario',
  templateUrl: './validar-usuario.page.html',
  styleUrls: ['./validar-usuario.page.scss'],
})
export class ValidarUsuarioPage implements OnInit {

  formValidarCorreo : FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {

    this.formValidarCorreo = new FormGroup({
      _usuario  : new FormControl('',[Validators.required,Validators.email])
    });

   }

  ngOnInit() {
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
