import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { IonList, IonRadioGroup } from '@ionic/angular';
import { RespuestasService } from 'src/app/services/respuestas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-seleccion-multiple',
  templateUrl: './seleccion-multiple.component.html',
  styleUrls: ['./seleccion-multiple.component.scss'],
})
export class SeleccionMultipleComponent implements OnInit {

  @Input() ItemPregunta: any={}; //en realidad es un objeto con dos objetos dentro de el uno de preguntas y otro de cabeceraVersionCustionario
  @Input() IdCabeceraRespuestaEncriptado : any = '';
  @Input() ListaRespuestas : any[] = [];

  LasRespuestasDeEstaPregunta: any[] = [];
  ListaCheckBox: any[] = [];

  @ViewChild('CheckGroupOpciones',{static:false}) CheckGroupOpciones : IonRadioGroup;

  _listaOpcionesPreguntaSeleccion :any[]=[];
  constructor(private preguntasService:PreguntasService
              ,private respuestasService:RespuestasService) 
  { 

    this.formRespuesta = new FormGroup({
      _idCabeceraRespuestaEncriptado  : new FormControl('',[Validators.required]),
      _idPreguntaEncriptado           : new FormControl('',[Validators.required]),
      _idRespuestaLogicaEncriptado    : new FormControl('',[Validators.required]),
      _descripcion                    : new FormControl('',[Validators.required])
    });

  }

  ngOnInit() {
    this.formRespuesta.get('_idCabeceraRespuestaEncriptado').setValue(this.IdCabeceraRespuestaEncriptado);
    this.formRespuesta.get('_idPreguntaEncriptado').setValue(this.ItemPregunta.Pregunta.IdPreguntaEncriptado);

    this._pregunta_consultarPreguntasSeleccion(this.ItemPregunta.Pregunta.IdPreguntaEncriptado);
  }

  formRespuesta: FormGroup;

  _ver = true;
  _icon = "add";
  _ocultar(){
    console.log(this._ver);
    
    if(this._ver==true){
      this._ver = false;
      this._icon = "remove";
    }else{
      this._ver = true;
      this._icon = "add";

    }
  }

  _pregunta_consultarPreguntasSeleccion(_IdPreguntaEncriptado){
    // console.log("Pregunta de Seleccion _IdPreguntaEncriptado :" ,_IdPreguntaEncriptado);
    
    this.preguntasService._consultarOpcionPreguntaSeleccion(
      _IdPreguntaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
       
        this._listaOpcionesPreguntaSeleccion = [];
        this._listaOpcionesPreguntaSeleccion = data['respuesta'];
       
        //console.log("_listaOpcionesPreguntaSeleccion",this._listaOpcionesPreguntaSeleccion);


      }else{

      }
    }).catch(error=>{

    }).finally(()=>{

      // console.log("-------------------------------------------------------------------");
      
     
      // console.log("FILTRO",this.ListaRespuestas.filter(z=>z.Pregunta.IdPreguntaEncriptado===this.ItemPregunta.Pregunta.IdPreguntaEncriptado));
      this.LasRespuestasDeEstaPregunta = this.ListaRespuestas.filter(z=>z.Pregunta.IdPreguntaEncriptado===this.ItemPregunta.Pregunta.IdPreguntaEncriptado);
    
      for (let index = 0; index < this._listaOpcionesPreguntaSeleccion.length; index++) {
        const _opcion = this._listaOpcionesPreguntaSeleccion[index];
        var opcion = {
          opcion: _opcion,
          check: false
        };
        for (let index = 0; index < this.LasRespuestasDeEstaPregunta.length; index++) {
          const _respuesta = this.LasRespuestasDeEstaPregunta[index];
          if (_opcion.IdOpcionPreguntaSeleccionEncriptado===_respuesta.IdRespuestaLogicaEncriptado) {
            opcion.check = true;
            break;
          } 
        }
        this.ListaCheckBox.push(opcion);
      }

      // for (let index = 0; index < this.ListaRespuestas.length; index++) {
      //   const element = this.ListaRespuestas[index];
      //   console.log("element",element);
      //   console.log("ItemPregunta",this.ItemPregunta);
      //   if (element.Pregunta.IdPreguntaEncriptado==this.ItemPregunta.Pregunta.IdPreguntaEncriptado) {
      //     // this.formRespuesta.get('_descripcion').setValue(element.DescripcionRespuestaAbierta); 
      //     // this.CheckGroupOpciones.value = element.IdRespuestaLogicaEncriptado;       
      //   }
      // }
      // console.log("-------------------------------------------------------------------");

    });
  }

  hola(id){
    // console.log("hola");
    
  }
  _guardarOpcion(_idOpcionEncriptado){
    // console.log("seleccionada",_idOpcionEncriptado);
    this.respuestasService.respuesta_insertaropcionseleccionmultiple(
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
      // console.log('error 2');

    }).finally(()=>{});
  }

}
