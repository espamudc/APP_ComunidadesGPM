import { Component, OnInit } from '@angular/core';
import { CuestionarioPublicadoService } from "../../services/cuestionario-publicado.service";
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
import { ModalController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cuestionarios-asignados',
  templateUrl: './cuestionarios-asignados.page.html',
  styleUrls: ['./cuestionarios-asignados.page.scss'],
})
export class CuestionariosAsignadosPage implements OnInit {
  cuestionario:any=[];
  constructor(
              private cuestionarioPublicadoService:CuestionarioPublicadoService,
              private asignarEncuestadoService:AsignarEncuestadoService,
              private modalController : ModalController,
              private router :Router,
              private toastController: ToastController,
              ) { }

  ngOnInit() {
    this._consultarCuestionariosPublicados();
  }

  _listaCuestionariosPublicadosAsignarEncuestado : any[]=[];
  
  _consultarCuestionariosPublicados(){
    this.asignarEncuestadoService.mostrarEncuestasPorTecnico(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')) 
    .then(data=>{

      this.cuestionario=data["respuesta"];
    }).catch(error=>{
      this.Toast("Error al cargar los datos");
    });
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
  async prepararCuestionario(_item:any){
    // this.router.navigate("cuestionarios-asignados/item",_item.IdAsignarEncuestadoEncriptado);
    console.log("prepararCuestionario:_item.IdAsignarEncuestadoEncriptado",_item.IdAsignarEncuestadoEncriptado);
    localStorage.setItem("IdAsignarEncuestadoEncriptado",_item.IdAsignarEncuestadoEncriptado) ;
    console.log("localStore",localStorage.getItem("IdAsignarEncuestadoEncriptado"));
    
    // this.router.navigateByUrl("cuestionario-respuestas/"+_item.IdAsignarEncuestadoEncriptado);
    this.router.navigateByUrl("tabs/cuestionarios-asignados/cuestionario-respuestas");

    // const modal = await this.modalController.create({
    //   component: CuestionarioRespuestasPage,
    //   componentProps: {
    //     item:_item
    //   },
    // });
    // //this.listaProductos.closeSlidingItems();
    // await modal.present();
    // const {data} = await modal.onDidDismiss();
    // //console.log(data);
    // // if (data!=null) {
    // //   this.contadorCarrito +=data;
    // //   this.colorCarrito = "primary";    
    // // }

  }

}