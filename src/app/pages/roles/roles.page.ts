import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})

export class RolesPage implements OnInit {
 tipoRol:any;
  options: AnimationOptions = {
    path: '/assets/rol.json',
    autoplay: true,
    loop: true
  };
  constructor(private router: Router,) { }
  ngOnInit() {
   this.tipoRol= JSON.parse(localStorage.getItem("TipoUsuario"));
   localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log(animationItem);
  }
  onDestroy() {
    localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    localStorage.removeItem('IdAsignarEncuestadoEncriptado');
  }
  _escojerRol(_item:any) {
    localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    localStorage.removeItem('IdAsignarEncuestadoEncriptado');
    localStorage.setItem('IdAsignarUsuarioTipoUsuarioEncriptado', _item.IdAsignarUsuarioTipoUsuarioEncriptado);
    if( _item.TipoUsuario.toUpperCase()=="TÉCNICO"){
      this.router.navigateByUrl("/tabs/home");
    }
    if( _item.TipoUsuario.toUpperCase()=="ADMINISTRADOR"){
      this.router.navigateByUrl("reporte-ejecutivo");
    }
  }
}
