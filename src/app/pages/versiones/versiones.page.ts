import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
  
@Component({
  selector: 'app-versiones',
  templateUrl: './versiones.page.html',
  styleUrls: ['./versiones.page.scss'],
})
export class VersionesPage implements OnInit {
  versiones:any
  constructor(private asignarEncuestadoService:AsignarEncuestadoService,
                 private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
     let id= this.activatedRoute.snapshot.paramMap.get('id');
    this.obtenerVersionesCuestionario(id);
  }
  obtenerVersionesCuestionario(id:string) {
    this.asignarEncuestadoService._consultarCabeceraVersionCuestionario(
      id
    ).then(data => {
      this.versiones=data["respuesta"]
    })
  }
}
