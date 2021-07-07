import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
  
@Component({
  selector: 'app-versiones',
  templateUrl: './versiones.page.html',
  styleUrls: ['./versiones.page.scss'],
})
export class VersionesPage implements OnInit {
  versiones:any
  idv:string
  constructor(private asignarEncuestadoService:AsignarEncuestadoService,
                 private activatedRoute:ActivatedRoute,
                 private router:Router) { }

  ngOnInit() {
     this.idv= this.activatedRoute.snapshot.paramMap.get('id');
    this.obtenerVersionesCuestionario(this.idv);
  }
  obtenerVersionesCuestionario(id:string) {
    this.asignarEncuestadoService._consultarCabeceraVersionCuestionario(
      id
    ).then(data => {
      this.versiones=data["respuesta"]
    })
  }
  nextPage(idc:string) {
    this.router.navigate(['comunidades', this.idv,idc])
  }
}
