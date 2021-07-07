import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
 cuestionarios:any
  constructor(private asignarEncuestadoService:AsignarEncuestadoService,
              private router:Router) { }

  ngOnInit() {
    this.mostrarCuestionarios() 
  }

  mostrarCuestionarios() {
    this.asignarEncuestadoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    ).then(data => {
      this.cuestionarios=data["respuesta"]
    })
  }
  nextPage(id:string) {
    this.router.navigate(['versiones',id])
  }
}
