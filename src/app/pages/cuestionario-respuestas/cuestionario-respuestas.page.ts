import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { CabeceraRespuestaService } from 'src/app/services/cabecera-respuesta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
import { VersionamientoPreguntaService } from 'src/app/services/versionamiento-pregunta.service';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { RespuestasService } from 'src/app/services/respuestas.service';
import { ComponentesService } from 'src/app/services/componentes.service'
@Component({
  selector: 'app-cuestionario-respuestas',
  templateUrl: './cuestionario-respuestas.page.html',
  styleUrls: ['./cuestionario-respuestas.page.scss'],
})
export class CuestionarioRespuestasPage implements OnInit {
fichanombre:string="Ficha técnica para levantamiento de información en la comunidad";
fecha:any = new Date();
responsableCuestionario:string;
responsableTelefono:string;
formAsignarEncuestado : FormGroup;
formCabeceraRespuesta : FormGroup;
listaPreguntas: any[]=[]; 
listaPreguntas2: any[]=[]; 
listComponents: any[]=[];                 
_ocultar=false;
listaRespuestas : any[]=[];
_listaPreguntaMatriz:any[]=[];
_listaPreguntaConfigurarMatriz:any[]=[];
FilaOpcionUnoMatriz: any[] = [];
ColumnsOpcionDosMatriz: any[] = [];
_listaOpcionesPreguntaSeleccion:any[]=[];

  constructor(
               private componentesService:ComponentesService,
               private cabeceraRespuestaService: CabeceraRespuestaService
              ,private asignarEncuestadoService: AsignarEncuestadoService
              ,private versionamientoPreguntaService: VersionamientoPreguntaService
              ,private preguntasService: PreguntasService
              ,private respuestasService: RespuestasService
              )
  {
    this.formAsignarEncuestado = new FormGroup({
      _idAsignarEncuestadoEncriptado : new FormControl(''),
      _idCuestionarioPublicadoEncriptado : new FormControl(''),
      _provincia : new FormControl(''),
      _canton : new FormControl(''),
      _parroquia : new FormControl(''),
      _comunidad : new FormControl(''),
      _fechaInicio : new FormControl(''),
      _fechaFin : new FormControl(''),
      _representante : new FormControl(''),
      _nombreCuestionario : new FormControl(''),
    });
    this.formCabeceraRespuesta = new FormGroup({
      _idCabeceraRespuestaEncriptado : new FormControl(''),
      _idAsignarEncuestadoEncriptado : new FormControl(''),
      _fechaRegistro : new FormControl('',[Validators.required]),
      _fechaFinalizado : new FormControl('',[Validators.required]),
      _finalizado : new FormControl(''),
      _estado : new FormControl('')
    });
  }
  ngOnInit() {
    this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').setValue(localStorage.getItem("IdAsignarEncuestadoEncriptado"));
    this._asignarencuestado_consultarporidasignarencuestado();
  }
  components(idCuestionario:string){
    this.componentesService.componentesPorEncuesta(idCuestionario).then(data=>{
    this.listComponents=data["respuesta"];
    }).catch(error=>{
      debugger
    })

  }
  _asignarencuestado_consultarporidasignarencuestado(){
    let id = this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value;
    this.asignarEncuestadoService._consultarporidasignarencuestado(id)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          debugger
          console.log("asignarEncuestadoService.data",data['respuesta']);
          let _item = data['respuesta'];
          this.responsableTelefono=_item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.Telefono;
          this.responsableCuestionario=_item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.PrimerNombre +" " + 
                                     _item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.SegundoNombre+" "+
                                     _item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.PrimerApellido +" "+
                                     _item.AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.SegundoApellido;
          this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').setValue(_item.IdAsignarEncuestadoEncriptado);
          this.formAsignarEncuestado.get('_idCuestionarioPublicadoEncriptado').setValue(_item.CuestionarioPublicado.IdCuestionarioPublicadoEncriptado);
          this.formAsignarEncuestado.get('_provincia')                    .setValue(_item.Comunidad.Parroquia.Canton.Provincia.NombreProvincia);
          this.formAsignarEncuestado.get('_canton')                       .setValue(_item.Comunidad.Parroquia.Canton.NombreCanton);
          this.formAsignarEncuestado.get('_parroquia')                    .setValue(_item.Comunidad.Parroquia.NombreParroquia);
          this.formAsignarEncuestado.get('_comunidad')                    .setValue(_item.Comunidad.NombreComunidad);
          this.formAsignarEncuestado.get('_fechaInicio')                  .setValue(_item.FechaInicio);
          this.formAsignarEncuestado.get('_fechaFin')                     .setValue(_item.FechaFin);
          this.formAsignarEncuestado.get('_representante')                .setValue('');
          this.formAsignarEncuestado.get('_nombreCuestionario')           .setValue(_item.CuestionarioPublicado.CabeceraVersionCuestionario.AsignarResponsable.CuestionarioGenerico.Nombre);
        } else {

        }
      }).catch(error=>{

      })
  }
  _comenzarencuesta(){
    this._ocultar=true;
    this.components(localStorage.getItem("IdVersionCuestionario"));
    this._cabecerarespuesta_consultarporidasignarencuestadoDesdeCabeceraRespuesta();
  }

  
 
//una
  _cabecerarespuesta_consultarporidasignarencuestadoDesdeCabeceraRespuesta(){
    debugger
    let id = this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value;
    this.cabeceraRespuestaService._consultarporidasignarencuestado(id)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          debugger
          console.log("cabeceraRespuesta: ",data['respuesta']);
          let _item = data['respuesta'];
          this.formCabeceraRespuesta.get("_idCabeceraRespuestaEncriptado").setValue(_item.IdCabeceraRespuestaEncriptado);
          this.formCabeceraRespuesta.get("_idAsignarEncuestadoEncriptado").setValue(_item.AsignarEncuestado.IdAsignarEncuestadoEncriptado);
          this.formCabeceraRespuesta.get("_fechaRegistro")                .setValue(_item.FechaRegistro);
          this.formCabeceraRespuesta.get("_fechaFinalizado")              .setValue(_item.FechaFinalizado);
          this.formCabeceraRespuesta.get("_finalizado")                   .setValue(_item.Finalizado);
          this.formCabeceraRespuesta.get("_estado")                       .setValue(_item.Estado);
          this._respuestas_consultarporidcabecerarespuesta(_item.IdCabeceraRespuestaEncriptado);
          this._preguntas_consultarporcabeceraversionCuestionario(_item.AsignarEncuestado.CuestionarioPublicado.CabeceraVersionCuestionario.IdCabeceraVersionCuestionarioEncriptado);
        } else {

        }
      }).catch(error=>{
        debugger
        console.log(error);
      })
  }
  mostarPreguntas(item:any){
    this.preguntasService.PreguntasPorcomponentes(item.IdComponenteEncriptado).then(data=>{
      this.listaPreguntas2=data["respuesta"];
      console.log("RESPUESTAss: ", this.listaPreguntas2);
    }).catch(error=>{
      debugger
    })
  }
//dos
_respuestas_consultarporidcabecerarespuesta(_IdCabeceraRespuestaEncriptado){
  this.respuestasService.respuesta_consultarporidcabecerarespuesta(_IdCabeceraRespuestaEncriptado)
      .then(data=>{
        debugger
        if (data['http']['codigo']=='200') {
          console.log('respuestas:',data['respuesta']);
          this.listaRespuestas = data['respuesta'];
        }else{}

      }).catch(error=>{
        debugger
        console.log(error);
      }).finally(()=>{

      });
}
//tres
  _preguntas_consultarporcabeceraversionCuestionario(_idCabeceraVersionCuestionarioEncriptado){
    console.log("_idCabeceraVersionCuestionarioEncriptado",_idCabeceraVersionCuestionarioEncriptado);

    this.versionamientoPreguntaService._consultarporcabeceraversionCuestionario(_idCabeceraVersionCuestionarioEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log("_preguntas: ",data['respuesta']);
          this.listaPreguntas = data['respuesta'];
          console.log("this.listaPreguntas",this.listaPreguntas);

        } else {
          console.log("codigo",data['http']['codigo']);

        }
      }).catch(error=>{
        console.log(error);

      }).finally(()=>{
        // this.listaPreguntas.map(element=>{
        //   // if (element.Pregunta.TipoPregunta.Identificador == 2 || element.Pregunta.TipoPregunta.Identificador == 3) {
        //   //   this._pregunta_consultarPreguntasSeleccion(element.Pregunta.IdPreguntaEncriptado);
        //   // }else if (element.Pregunta.TipoPregunta.Identificador == 4) {
        //   //   this._consultarPreguntaConfigurarMatriz(element.Pregunta.IdPreguntaEncriptado);
        //   // }


        // });
      });
  }

  _pregunta_consultarPreguntasSeleccion(_IdPreguntaEncriptado){

    debugger
    this.preguntasService._consultarOpcionPreguntaSeleccion(
      _IdPreguntaEncriptado
    ).then(data=>{
      debugger
      if (data['http']['codigo']=='200') {

       //this._listaOpcionesPreguntaSeleccion.push( data['respuesta']);
       //console.log("_listaOpcionesPreguntaSeleccion",this._listaOpcionesPreguntaSeleccion);

     
         this._listaOpcionesPreguntaSeleccion=  data['respuesta'];
        console.log("_listaOpcionesPreguntaSeleccion",this._listaOpcionesPreguntaSeleccion);


      }else{

      }
    }).catch(error=>{
debugger
    }).finally(()=>{

    });
  }

  _consultarPreguntaConfigurarMatriz(_IdPreguntaEncriptado)
  {
   // console.log(this.item.IdPreguntaEncriptado);

    this.preguntasService._consultarPreguntaConfigurarMatriz(_IdPreguntaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log("matriz-->",data['respuesta']);
          this._listaPreguntaConfigurarMatriz=data['respuesta'];
          this._vistaPreguntaConfigurarMatriz();

        } else {

        }
      }).catch(error=>{

      }).finally(()=>{
        this._vistaPreguntaConfigurarMatriz();

        var matriz = {
            IdPreguntaEncriptado : _IdPreguntaEncriptado,
            filas: this.FilaOpcionUnoMatriz,
            columnas : this.ColumnsOpcionDosMatriz
        }

          this._listaPreguntaMatriz.push(matriz);

        console.log("_listaPreguntaMatriz",this._listaPreguntaMatriz);


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


 

}
