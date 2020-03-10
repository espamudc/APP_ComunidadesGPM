import { Component, OnInit } from '@angular/core';
import { CuestionarioPublicadoService } from "../../services/cuestionario-publicado.service";
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
import { ModalController } from '@ionic/angular';
import { CuestionarioRespuestasPage } from '../cuestionario-respuestas/cuestionario-respuestas.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cuestionarios-asignados',
  templateUrl: './cuestionarios-asignados.page.html',
  styleUrls: ['./cuestionarios-asignados.page.scss'],
})
export class CuestionariosAsignadosPage implements OnInit {

  constructor(
              private cuestionarioPublicadoService:CuestionarioPublicadoService,
              private asignarEncuestadoService:AsignarEncuestadoService,
              private modalController : ModalController
              ,private router :Router
              ) { }

  ngOnInit() {
    this._consultarCuestionariosPublicados();
  }

  _listaCuestionariosPublicadosAsignarEncuestado : any[]=[];
  
  _consultarCuestionariosPublicados(){
    
    this.asignarEncuestadoService._consultarporidasignarusuariotipousuariotecnico("MQAwADYANAA=")
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaCuestionariosPublicadosAsignarEncuestado= data['respuesta'];
          console.log("_listaCuestionariosPublicados",this._listaCuestionariosPublicadosAsignarEncuestado);
          
        } else {
          
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  async prepararCuestionario(_item:any){
    // this.router.navigate("cuestionarios-asignados/item",_item.IdAsignarEncuestadoEncriptado);
    console.log(_item.IdAsignarEncuestadoEncriptado);
    
    this.router.navigateByUrl("cuestionario-respuestas/"+_item.IdAsignarEncuestadoEncriptado);

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
