import { Component,  Input, OnInit,  } from '@angular/core';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.scss'],
})
export class SeccionComponent implements OnInit {
  sec:any
  @Input() i: number;
  @Input() seccionUltima: string;

  constructor() { 
  }

  ngOnInit() {
    let tama= this.seccionUltima.length-1
    if(this.i<tama){
      let Ultima = this.seccionUltima[this.i+1]["Seccion"].Descripcion;
      let seccion = this.seccionUltima[this.i]["Seccion"].Descripcion;
      if((seccion != Ultima || this.i==0)){
         this.sec=Ultima;
        }
    }
  }

}
