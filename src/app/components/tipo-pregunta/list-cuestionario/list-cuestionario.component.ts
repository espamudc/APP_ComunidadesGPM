import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cuestionario',
  templateUrl: './list-cuestionario.component.html',
  styleUrls: ['./list-cuestionario.component.scss'],
})
export class ListCuestionarioComponent implements OnInit {
  @Input() cuestionario: any;
  cuesti: any[] = [];
  constructor(private router: Router) {
  }

  ngOnInit() {

  }
  async prepararCuestionario(_item: any) {
    localStorage.setItem("IdVersionCuestionario", _item.IdVersionCuestionario)
    localStorage.setItem("IdAsignarEncuestadoEncriptado", _item.IdAsignarEncuestado);
    this.router.navigateByUrl("tabs/cuestionarios-asignados/cuestionario-respuestas");
  }
}