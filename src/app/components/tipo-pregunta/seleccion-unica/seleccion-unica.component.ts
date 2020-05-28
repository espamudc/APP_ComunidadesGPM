import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { ToastController, IonRadioGroup } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RespuestasService } from 'src/app/services/respuestas.service';

@Component({
  selector: 'app-seleccion-unica',
  templateUrl: './seleccion-unica.component.html',
  styleUrls: ['./seleccion-unica.component.scss'],
})
export class SeleccionUnicaComponent implements OnInit {

  @Input() ItemPregunta: any={}; //en realidad es un objeto con dos objetos dentro de el uno de preguntas y otro de cabeceraVersionCustionario
  @Input() IdCabeceraRespuestaEncriptado : any = '';
  @Input() ListaRespuestas : any[] = [];
  _listaOpcionesPreguntaSeleccion :any [] = [];

  @ViewChild('RadioGroupOpciones',{static:false}) RadioGroupOpciones :IonRadioGroup ;

  constructor(
    private preguntasService:PreguntasService
    ,private respuestasService:RespuestasService
    ,private toastController: ToastController
   ) { 
    this.formRespuesta = new FormGroup({
      _idCabeceraRespuestaEncriptado  : new FormControl('',[Validators.required]),
      _idPreguntaEncriptado           : new FormControl('',[Validators.required]),
      _idRespuestaLogicaEncriptado    : new FormControl('',[Validators.required]),
      _descripcion                    : new FormControl('',[Validators.required])
    });
  }

  ngOnInit() {
    // console.log("Pregunta de Seleccion _IdPreguntaEncriptado :" ,this.ItemPregunta);
    this.formRespuesta.get('_idCabeceraRespuestaEncriptado').setValue(this.IdCabeceraRespuestaEncriptado);
    this.formRespuesta.get('_idPreguntaEncriptado').setValue(this.ItemPregunta.Pregunta.IdPreguntaEncriptado);

    this._pregunta_consultarPreguntasSeleccion(this.ItemPregunta.Pregunta.IdPreguntaEncriptado);

    


  }

  formRespuesta: FormGroup;
  

  _ver = true;
  _icon = "add";
  _ocultar(){
    // console.log(this._ver);
    
    if(this._ver==true){
      this._ver = false;
      this._icon = "remove";
    }else{
      this._ver = true;
      this._icon = "add";

    }
  }

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

  _pregunta_consultarPreguntasSeleccion(_IdPreguntaEncriptado){
    // console.log("Pregunta de Seleccion _IdPreguntaEncriptado :" ,_IdPreguntaEncriptado);
    
    this.preguntasService._consultarOpcionPreguntaSeleccion(
      _IdPreguntaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        
       //this._listaOpcionesPreguntaSeleccion.push( data['respuesta']);
       //console.log("_listaOpcionesPreguntaSeleccion",this._listaOpcionesPreguntaSeleccion);
      this._listaOpcionesPreguntaSeleccion = [];
      this._listaOpcionesPreguntaSeleccion = data['respuesta'];
      //  data['respuesta'].map(element=>{
      //    this._listaOpcionesPreguntaSeleccion.push(element);
      //  });
      //  console.log("_listaOpcionesPreguntaSeleccion",this._listaOpcionesPreguntaSeleccion);


      }else{

      }
    }).catch(error=>{

    }).finally(()=>{

      // console.log("-------------------------------------------------------------------");
    
      for (let index = 0; index < this.ListaRespuestas.length; index++) {
        const element = this.ListaRespuestas[index];
        // console.log("element",element);
        // console.log("ItemPregunta",this.ItemPregunta)
        if (element.Pregunta.IdPreguntaEncriptado==this.ItemPregunta.Pregunta.IdPreguntaEncriptado) {
          // this.formRespuesta.get('_descripcion').setValue(element.DescripcionRespuestaAbierta); 
          this.RadioGroupOpciones.value = element.IdRespuestaLogicaEncriptado;       
        }
      }
      // console.log("-------------------------------------------------------------------");

    });
  }

  _guardarOpcion(_idOpcionEncriptado){
    // console.log("seleccionada",_idOpcionEncriptado);
    this.respuestasService.respuesta_insertaropcionseleccionunica(
      this.formRespuesta.get('_idCabeceraRespuestaEncriptado').value,
      this.formRespuesta.get('_idPreguntaEncriptado').value,
      _idOpcionEncriptado,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        // console.log('======>la respuesta de la opcion',data['respuesta']);
        
      } else {
        // console.log('error 1',data['http']);
        
      }
    }).catch(error=>{
      console.log('error 2');

    }).finally(()=>{});
  }


}
