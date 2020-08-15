import { Component, OnInit } from '@angular/core';
import { CuestionarioPublicadoService } from "../../services/cuestionario-publicado.service";
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-cuestionarios-asignados',
  templateUrl: './cuestionarios-asignados.page.html',
  styleUrls: ['./cuestionarios-asignados.page.scss'],
})
export class CuestionariosAsignadosPage implements OnInit {
  cuestionario: any = [];
  isChecked: boolean = false;
  constructor(
    private cuestionarioPublicadoService: CuestionarioPublicadoService,
    private asignarEncuestadoService: AsignarEncuestadoService,
    private modalController: ModalController,
    private router: Router,
    private toastController: ToastController,
    private storage: Storage,
    private dataStorageService: DataStorageService
  ) { }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this._consultarCuestionariosPublicados();
  }
  _listaCuestionariosPublicadosAsignarEncuestado: any[] = [];
  _consultarCuestionariosPublicados() {
    this.cuestionario = [];
    this.cuestionario = this.dataStorageService._dataCuestionarios();
  }
  async Toast(_mensaje: string, _duracion: number = 2000) {
    const toast = await this.toastController.create({
      message: _mensaje,
      position: 'bottom',
      animated: true,
      duration: _duracion,
      color: 'dark',
      cssClass: 'toastFormato',
      buttons: [
        {
          side: 'end',
          icon: 'close-circle-outline',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }
}
