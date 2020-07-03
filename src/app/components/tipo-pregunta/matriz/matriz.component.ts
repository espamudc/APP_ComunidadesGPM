import { Component, OnInit, Input } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { RespuestasService } from 'src/app/services/respuestas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.scss'],
})


export class MatrizComponent implements OnInit {

  @Input() ItemPregunta: any={};
  @Input() IdCabeceraRespuestaEncriptado : any = '';
  @Input() ListaRespuestas : any[] = [];
  // _listaPreguntaMatriz:any[]=[];

  _listaPreguntaConfigurarMatriz:any[]=[];
  //_listaOpcionUnoMatriz:any[]=[];
  FilaOpcionUnoMatriz: any[] = [];
  ColumnsOpcionDosMatriz: any[] = [];
  _preguntaMatriz : any= {};
  _matrizFinal : any[]=[];
  LasRespuestasDeEstaPregunta: any[] = [];

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
    
    console.log("LISTA DE RESPUESTAS ::::>",this.ListaRespuestas);
    this.LasRespuestasDeEstaPregunta = this.ListaRespuestas.filter(z=>z.Pregunta.IdPreguntaEncriptado===this.ItemPregunta.Pregunta.IdPreguntaEncriptado);
    console.log("LISTA DE RESPUETAS DE LA MATRIZ",this.LasRespuestasDeEstaPregunta);
    

    this._consultarPreguntaConfigurarMatriz(this.ItemPregunta.Pregunta.IdPreguntaEncriptado);
    //this._crearTabla();
   
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
  
  _consultarPreguntaConfigurarMatriz(_IdPreguntaEncriptado){
    // console.log(this.item.IdPreguntaEncriptado);
     
     this.preguntasService._consultarPreguntaConfigurarMatriz(_IdPreguntaEncriptado)
       .then(data=>{
         if (data['http']['codigo']=='200') {
           console.log("matriz-->",data['respuesta']);
           this._listaPreguntaConfigurarMatriz=data['respuesta'];
           this._vistaPreguntaConfigurarMatriz2();
           //this._crearTabla();
         } else {
           
         }
       }).catch(error=>{
 
       }).finally(()=>{

        console.log("_listaPreguntaConfigurarMatriz",this._listaPreguntaConfigurarMatriz);
        
         this._listaPreguntaConfigurarMatriz;
        console.log("_listaPreguntaConfigurarMatriz",this._listaPreguntaConfigurarMatriz);
        
        
        
        

        // this._vistaPreguntaConfigurarMatriz();
        //  var matriz = {
        //      IdPreguntaEncriptado : _IdPreguntaEncriptado,
        //      filas: this.FilaOpcionUnoMatriz,
        //      columnas : this.ColumnsOpcionDosMatriz
        //  };
         
        // this._preguntaMatriz = matriz;
        // console.log("_preguntaMatriz: ",matriz);
        // for (let index = 0; index < matriz.filas.length; index++) {
        //   const element = matriz.filas[index];
        //   var iterator = {
        //     fila: element
        //     ,ConfigurarMatriz : this._listaPreguntaConfigurarMatriz.filter(t=>t.OpcionUnoMatriz.IdOpcionUnoMatrizEncriptado===element.IdOpcionUnoMatrizEncriptado)
        //   }
        //   this._matrizFinal.push(iterator);
        // }
        
       });
   }
 
  _vistaPreguntaConfigurarMatriz(){
     this._listaPreguntaConfigurarMatriz.map((element,index)=>{
       this.FilaOpcionUnoMatriz.push(element.OpcionUnoMatriz);
     });
     let unicosOpcionUno = [ ];
     
     this.FilaOpcionUnoMatriz.map((element,index)=>{
       let x= unicosOpcionUno.find(data=>data.IdOpcionUnoMatrizEncriptado===element.IdOpcionUnoMatrizEncriptado);
       if (unicosOpcionUno.indexOf( x ) == -1){
         unicosOpcionUno.push(element);
       }
     });
 
     this.FilaOpcionUnoMatriz = unicosOpcionUno;
     console.log("FilaOpcionUnoMatriz",this.FilaOpcionUnoMatriz);
     
     //------------------------------------------------------------------------------------
     this._listaPreguntaConfigurarMatriz.map((element,index)=>{
       this.ColumnsOpcionDosMatriz.push(element.OpcionDosMatriz);
     });
 
     let unicosOpcionDos = [ ];
 
     this.ColumnsOpcionDosMatriz.map((element,index)=>{
       let x= unicosOpcionDos.find(data=>data.IdOpcionDosMatrizEncriptado===element.IdOpcionDosMatrizEncriptado);
       if (unicosOpcionDos.indexOf( x ) == -1){
         unicosOpcionDos.push(element);
       }
     });
     
 
     this.ColumnsOpcionDosMatriz = unicosOpcionDos;
 
    
 
     console.log("unicosOpcionDos",unicosOpcionDos);
     
   
     
  }

  _vistaPreguntaConfigurarMatriz2(){
    this._listaPreguntaConfigurarMatriz.map((element,index)=>{
      this.FilaOpcionUnoMatriz.push(element.OpcionUnoMatriz); // se llena la lista de opciones uno no importa si estan repetidos.
    });
    let unicosOpcionUno = [ ]; //se crea una lista de opciones uno, para almacenar opciones uno sin repetir
    
    this.FilaOpcionUnoMatriz.map((element,index)=>{
      let x= unicosOpcionUno.find(data=>data.IdOpcionUnoMatrizEncriptado===element.IdOpcionUnoMatrizEncriptado);
      if (unicosOpcionUno.indexOf( x ) == -1){
        unicosOpcionUno.push(element); // se purga la lista solo agrupando las opciones uno.
      }
    });

    this.FilaOpcionUnoMatriz = unicosOpcionUno;
    console.log("FilaOpcionUnoMatriz",this.FilaOpcionUnoMatriz);

    ///Columnas 

    this._listaPreguntaConfigurarMatriz.map((element,index)=>{
      this.ColumnsOpcionDosMatriz.push(element.OpcionDosMatriz);
    });

    let unicosOpcionDos = [ ];

    this.ColumnsOpcionDosMatriz.map((element,index)=>{
      let x= unicosOpcionDos.find(data=>data.IdOpcionDosMatrizEncriptado===element.IdOpcionDosMatrizEncriptado);
      if (unicosOpcionDos.indexOf( x ) == -1){
        unicosOpcionDos.push(element);
      }
    });
    

    this.ColumnsOpcionDosMatriz = unicosOpcionDos;

   

    console.log("unicosOpcionDos",unicosOpcionDos);
    
    
    //// la matriz
     
    for (let index = 0; index < this.FilaOpcionUnoMatriz.length; index++) {
      const element = this.FilaOpcionUnoMatriz[index];
      let newarray  =  this._listaPreguntaConfigurarMatriz.filter(data=>data.OpcionUnoMatriz.IdOpcionUnoMatrizEncriptado===element.IdOpcionUnoMatrizEncriptado);
      console.log("array",newarray);

      let array2 = [];

      for (let index2 = 0; index2 < newarray.length; index2++) {
        
        const element2 = newarray[index2];
        let elementoCeldaDeLaMatriz = {
          radioButton : element2,
          check: false
        };
        if (this.LasRespuestasDeEstaPregunta.length>0) {
          for (let index3 = 0; index3 < this.LasRespuestasDeEstaPregunta.length; index3++) {
            const element3 = this.LasRespuestasDeEstaPregunta[index3];
            if (element2.IdConfigurarMatrizEncriptado===element3.IdRespuestaLogicaEncriptado) {
              elementoCeldaDeLaMatriz.check = true;
              break;
            }
          }
        }

        array2.push(elementoCeldaDeLaMatriz);
        
        
      }

      let nuevo ={
        Fila : element,
        ListaConfigurarMatriz: newarray,
        ListaConfigurarMatriz2: array2
      };

      this._matrizFinal.push(nuevo);

    }
  
    console.log("_matrizFinal",this._matrizFinal);
    
  
    
 }

 _guardarOpcion(_idOpcionEncriptado){
    console.log("seleccionada",_idOpcionEncriptado);
    this.respuestasService.respuesta_insertarconfigurarmatriz(
      this.formRespuesta.get('_idCabeceraRespuestaEncriptado').value,
      this.formRespuesta.get('_idPreguntaEncriptado').value,
      _idOpcionEncriptado,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        console.log('======>la respuesta de la opcion',data['respuesta']);
        
      } else {
        console.log('error 1',data['http']);
        
      }
    }).catch(error=>{
      console.log('error 2');

    }).finally(()=>{});
  }

  
  

}
