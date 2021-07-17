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
idc:string;
idv:string;
  constructor(private asignarEncuestadoService:AsignarEncuestadoService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.idc= this.activatedRoute.snapshot.paramMap.get('idc');
    this.idv= this.activatedRoute.snapshot.paramMap.get('idv');
    this.obtenerComunidadesVersionesCuestionario(this.idc,this.idv)
  }
  obtenerComunidadesVersionesCuestionario(idc:string,idv:string) {
    this.asignarEncuestadoService._consultarComunidadesPorVersion(
      idc,idv
    ).then(data => {
      this.comunidades=data["respuesta"]
    })
  }

  verPreguntas(idcomunidad:string){
    this.router.navigate(['preguntas', this.idc,this.idv,idcomunidad])
  }
}
