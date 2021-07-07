import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.page.html',
  styleUrls: ['./comunidades.page.scss'],
})
export class ComunidadesPage implements OnInit {
comunidades:any
  constructor(private asignarEncuestadoService:AsignarEncuestadoService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    let idc= this.activatedRoute.snapshot.paramMap.get('idc');
    let idv= this.activatedRoute.snapshot.paramMap.get('idv');
    this.obtenerComunidadesVersionesCuestionario(idc,idv)
  }
  obtenerComunidadesVersionesCuestionario(idc:string,idv:string) {
    this.asignarEncuestadoService._consultarComunidadesPorVersion(
      idc,idv
    ).then(data => {
      this.comunidades=data["respuesta"]
    })
  }
}
