import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
import { ComponentesService } from 'src/app/services/componentes.service';
import { ToastController } from '@ionic/angular';
import { PreguntasService } from '../../services/preguntas.service';
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  listaPreguntas:any
  Preguntas:any
  idcu:string;
  idve:string;
  idco:string;
  loadingMatriz:boolean=true;
  listComponents: any[] = [];
  constructor(private asignarEncuestadoService:AsignarEncuestadoService,
    private activatedRoute:ActivatedRoute,
    private router:Router, 
    private componentesService:ComponentesService, 
    private toastController:ToastController,
    private preguntasService:PreguntasService) { }

  ngOnInit() {
    this.idcu= this.activatedRoute.snapshot.paramMap.get('idcu');
    this.idve= this.activatedRoute.snapshot.paramMap.get('idve');
    this.idco= this.activatedRoute.snapshot.paramMap.get('idco');
    this.getComponents(this.idve);
   this.verPreguntas(this.idcu,this.idve,this.idco);
  }
  verPreguntas(idcuestionario:string, idversion:string, idcomundiad:string){
    this.asignarEncuestadoService._cuestionariogenerico_consultarporpreguntaRandom
    (
      idcuestionario,idversion,idcomundiad
    ).then(data => {
      
      this.listaPreguntas=data["respuesta"].listaPreguntas
      this.Preguntas=data["respuesta"].listaPreguntas
      this.loadingMatriz=false;
    })
  }
  quitarRandom(val) {
    var cad = val;
    var count= cad.length;
    var cadenaFinal= cad.substring(count,7);
    return cadenaFinal;
   }

  //Obtener componentes por cuestionario
  getComponents(idversrioncuestionario: string) {
    this.componentesService.componentesPorEncuesta(idversrioncuestionario).then(data => {
      this.listComponents = data["respuesta"];
    }).catch(error => {
      this.Toast("Error al cargar datos")
    })
  }
  //mostrar preguntas por componente
  mostarPreguntas(item: any) {
    this.listaPreguntas=this.Preguntas.filter(i=>i.Componente.Descripcion==item.Descripcion)
    this.loadingMatriz=false;
  }
  //Mensajes
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
