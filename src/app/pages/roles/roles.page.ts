import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
tipoRol:any;
  constructor(private router: Router) { }
  ngOnInit() {
   this.tipoRol= JSON.parse(localStorage.getItem("TipoUsuario"));
   localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
  }
  onDestroy() {
    localStorage.removeItem('IdAsignarUsuarioTipoUsuarioEncriptado');
  }
  _escojerRol(_item:any) {
    localStorage.setItem('IdAsignarUsuarioTipoUsuarioEncriptado', _item.IdAsignarUsuarioTipoUsuarioEncriptado);
    this.router.navigateByUrl("/tabs/home");
  }
}
