import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RespuestasService } from 'src/app/services/respuestas.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-abierta',
  templateUrl: './abierta.component.html',
  styleUrls: ['./abierta.component.scss'],
})
export class AbiertaComponent implements OnInit {

  @Input() ItemPregunta: any={};
  @Input() IdCabeceraRespuestaEncriptado : string;
  @Input() Identificador : string;
  txtrespuesta:string;
  //@Input() ListaRespuestas : any[] = [];

  constructor( 
    private respuestasService:RespuestasService
    ,private toastController: ToastController
   ) { 
    this.formRespuesta = new FormGroup({
      _idCabeceraRespuestaEncriptado  : new FormControl('',[Validators.required]),
      _idPreguntaEncriptado           : new FormControl('',[Validators.required]),
      _descripcion                    : new FormControl('',[Validators.required])
    });
  }

  ngOnInit() {
    debugger
     console.log("prueba abierta:" ,this.ItemPregunta);
    //console.log("inicio---------------------------------------------------------------------------------");
    
    //console.log("IdCabeceraRespuestaEncriptado",this.IdCabeceraRespuestaEncriptado);
    //console.log("ItemPregunta",this.ItemPregunta);
    
    //console.log("fin---------------------------------------------------------------------------------");
    
    this.formRespuesta.get('_idCabeceraRespuestaEncriptado').setValue(this.IdCabeceraRespuestaEncriptado);
    this.formRespuesta.get('_idPreguntaEncriptado').setValue(this.ItemPregunta.IdPreguntaEncriptado);
    // this.formRespuesta.get('_descripcion').invalid
    
    //console.log("PREGUNTTA ABIERTA - LISTA DE RESPUESTAS" , this.ListaRespuestas);
    //console.log("-------------------------------------------------------------------");
    
    // for (let index = 0; index < this.ListaRespuestas.length; index++) {
    //   const element = this.ListaRespuestas[index];
    //   //console.log("element",element);
    //   //console.log("ItemPregunta",this.ItemPregunta)
    //   if (element.IdPreguntaEncriptado==this.ItemPregunta.IdPreguntaEncriptado) {
    //     this.formRespuesta.get('_descripcion').setValue(element.DescripcionRespuestaAbierta);        
    //   }
   // }
    //console.log("-------------------------------------------------------------------");

  }
  
  formRespuesta: FormGroup;
  
  _ver = true;
  _icon = "add";
  _ocultar(){
    //console.log(this._ver);
    
    if(this._ver==true){
      this._ver = false;
      this._icon = "remove";
    }else{
      this._ver = true;
      this._icon = "add";

    }
  }

 // _validarFormRespuesta(){
    // console.log("submit");
    // this.formRespuesta.get('_idCabeceraRespuestaEncriptado').invalid;
    // this.formRespuesta.get('_idPreguntaEncriptado').invalid;
    // console.log('in1',this.formRespuesta.get('_idCabeceraRespuestaEncriptado').value);
    // console.log('in2',this.formRespuesta.get('_idPreguntaEncriptado').value);
    // console.log('in3',this.formRespuesta.get('_descripcion').value);
    
    //this.respuesta_insertarpreguntaabierta();
 // }

  async presentToastWithButtons(_mensaje:string,_duracion:number=2000) {
    const toast = await this.toastController.create({
      animated: true,
      buttons: [
        // {
        //   side: 'start',
        //   icon: 'star',
        //   text: 'Favorite',
        //   handler: () => {
        //     console.log('Favorite clicked');
        //   }
        // },
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ],
      // color: 'primary',
      // cssClass: 'toast-success',
      duration: _duracion,
      // header: 'Toast header',
      keyboardClose: true,
      message: _mensaje,
      // mode: 'ios',
      position: 'bottom',
      translucent: true
    });
    toast.present();
  }

  respuesta_insertarpreguntaabierta(){
    debugger
    let id=  this.formRespuesta.get('_idCabeceraRespuestaEncriptado').value
    debugger
    this.respuestasService.respuesta_insertar(
     id,
      this.formRespuesta.get('_idPreguntaEncriptado').value,
      this.ItemPregunta.PreguntaAbierta.IdPreguntaAbiertaEncriptado,
      localStorage.getItem("IdAsignarEncuestadoEncriptado"),
      this.Identificador, this.txtrespuesta
    ).then(data=>{
      debugger
      if (data['http']['codigo']=='200') {
        
      } if(data['http']['codigo']=='500'){
        // this.formRespuesta.get('_descripcion').setValue('');
       // this.presentToastWithButtons('La respuesta no fue ingresada');
        
      } else {
        // this.formRespuesta.get('_descripcion').setValue('');
        this.presentToastWithButtons(data['http']['mensaje']);
        
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

}
