import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-preguntas-restantes',
  templateUrl: './preguntas-restantes.page.html',
  styleUrls: ['./preguntas-restantes.page.scss'],
})
export class PreguntasRestantesPage implements OnInit {
  @Input() data: any;
  slideOpts={
    allowSlidePrev:false,
    allowSlideNext:false
  }
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  closeModal()
  {
    this.modalCtrl.dismiss();
  }
}
