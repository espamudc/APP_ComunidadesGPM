import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.scss'],
})
export class SeccionComponent implements OnInit {
  sec:any
  @Input() seccion: string;
  @Input() seccionUltima: string;
  @Output() seccionactual = new EventEmitter<string>();
  constructor() { }
  ngOnInit() {
    if(this.seccion != this.seccionUltima ){
      this.seccionUltima =this.seccion
      this.sec=this.seccionUltima;
      this.seccionactual.emit(this.seccion)
     }
  }

}
