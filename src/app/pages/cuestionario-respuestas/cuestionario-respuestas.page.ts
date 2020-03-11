import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabeceraRespuestaService } from 'src/app/services/cabecera-respuesta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
import { VersionamientoPreguntaService } from 'src/app/services/versionamiento-pregunta.service';

@Component({
  selector: 'app-cuestionario-respuestas',
  templateUrl: './cuestionario-respuestas.page.html',
  styleUrls: ['./cuestionario-respuestas.page.scss'],
})
export class CuestionarioRespuestasPage implements OnInit {

  constructor(
              private activatedRoute:ActivatedRoute
              ,private cabeceraRespuestaService: CabeceraRespuestaService
              ,private asignarEncuestadoService: AsignarEncuestadoService
              ,private versionamientoPreguntaService: VersionamientoPreguntaService
              ) 
  {
    this.formAsignarEncuestado = new FormGroup({
      _idAsignarEncuestadoEncriptado : new FormControl(''),
      _idCuestionarioPublicadoEncriptado : new FormControl(''),
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

  formAsignarEncuestado : FormGroup;
  formCabeceraRespuesta : FormGroup;
  listaPreguntas: any[]=[];
  listaRespuestas : any[]=[];
  //_IdAsignarEncuestadoEncriptado : any ="";
  //_CabeceraRespuesta:any={};
  
  ngOnInit() {
    this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').setValue(localStorage.getItem("IdAsignarEncuestadoEncriptado"));
    //this._IdAsignarEncuestadoEncriptado = localStorage.getItem("IdAsignarEncuestadoEncriptado"); // = this.activatedRoute.snapshot.paramMap.get('item');
    // console.log("onInit",this._IdAsignarEncuestadoEncriptado);
    console.log("onInit",this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value);
    this._asignarencuestado_consultarporidasignarencuestado();
  }



  _asignarencuestado_consultarporidasignarencuestado(){
    let id = this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value;
    this.asignarEncuestadoService._consultarporidasignarencuestado(id)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log("asignarEncuestadoService.data",data['respuesta']);
          let _item = data['respuesta'];
          this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').setValue(_item.IdAsignarEncuestadoEncriptado);
          this.formAsignarEncuestado.get('_idCuestionarioPublicadoEncriptado').setValue(_item.CuestionarioPublicado.IdCuestionarioPublicadoEncriptado);
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

      }).finally(()=>{
        this._cabecerarespuesta_consultarporidasignarencuestadoDesdeCabeceraRespuesta();
      });
  }

  _cabecerarespuesta_consultarporidasignarencuestadoDesdeCabeceraRespuesta(){
    let id = this.formAsignarEncuestado.get('_idAsignarEncuestadoEncriptado').value;
    this.cabeceraRespuestaService._consultarporidasignarencuestado(id)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          //this._CabeceraRespuesta=data['respuesta'];
          //console.log("listaCabeceraRespuesta",this._CabeceraRespuesta);
          console.log("cabeceraRespuesta",data['respuesta']);
          let _item = data['respuesta'];
          this.formCabeceraRespuesta.get("_idCabeceraRespuestaEncriptado").setValue(_item.IdCabeceraRespuestaEncriptado);
          this.formCabeceraRespuesta.get("_idAsignarEncuestadoEncriptado").setValue(_item.AsignarEncuestado.IdAsignarEncuestadoEncriptado);
          this.formCabeceraRespuesta.get("_fechaRegistro")                .setValue(_item.FechaRegistro);
          this.formCabeceraRespuesta.get("_fechaFinalizado")              .setValue(_item.FechaFinalizado);
          this.formCabeceraRespuesta.get("_finalizado")                   .setValue(_item.Finalizado);
          this.formCabeceraRespuesta.get("_estado")                       .setValue(_item.Estado);

          this._preguntas_consultarporcabeceraversionCuestionario(_item.AsignarEncuestado.CuestionarioPublicado.CabeceraVersionCuestionario.IdCabeceraVersionCuestionarioEncriptado);


        } else {
          //console.log("",data['http']);
          
        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{

      });
  }

  _preguntas_consultarporcabeceraversionCuestionario(_idCabeceraVersionCuestionarioEncriptado){
    console.log("_idCabeceraVersionCuestionarioEncriptado",_idCabeceraVersionCuestionarioEncriptado);
    
    this.versionamientoPreguntaService._consultarporcabeceraversionCuestionario(_idCabeceraVersionCuestionarioEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log("_preguntas",data['respuesta']);
          this.listaPreguntas = data['respuesta'];
        } else {
          console.log("codigo",data['http']['codigo']);
          
        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{

      });
  }

}
