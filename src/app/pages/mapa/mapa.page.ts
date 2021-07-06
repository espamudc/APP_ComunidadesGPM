import { Component, OnInit } from '@angular/core';


import { Geolocation } from '@ionic-native/geolocation/ngx';

import { CabeceraRespuestaService } from '../../services/cabecera-respuesta.service';
import { ToastController } from '@ionic/angular';

var map;
declare var mapboxgl;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  latitud: number;
  longitud: number;
  idAsignarEncuestado: string;
  idModeloPublicado: string;
  datos: any;
  srcPdfidAsignarEncuestado:any;
  srcPdfidModeloPublicado:any
  constructor(private geolocation: Geolocation,
    private cabeceraRespuestaService: CabeceraRespuestaService,
    private toastController: ToastController,
) { }
   
  ngOnInit() {
   this.getCoordenadas();
  }
  addMarket() {
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(../../../../../assets/img/location1.png)';
    el.style.width = '32px';
    el.style.height = '32px';
    let marcador = new mapboxgl.Marker(el)
      .setLngLat([this.longitud, this.latitud])
      .addTo(map);
  }
  addMarketArray(data: any) {
    for (let i = 0; i < data.length; i++) {
      var el = document.createElement('div');
      var h1 = document.createElement('div');
      h1.innerHTML = `<p>Comunidad: <b> ${data[i].NombreComunidad}</b></p>
      <button type="button" style="color:red; border: solid 1px red">Caracterización</button>`;
      el.className = 'marker';
      el.style.backgroundImage = 'url(../../../../../assets/img/location.png)';
      el.style.width = '32px';
      el.style.height = '32px';
      h1.addEventListener('click', () => {
        this.getCaracterizacion(data[i].idComunidad);
      });
      let popup = new mapboxgl.Popup({ closeOnClick: true }) // add popups 
        .setDOMContent(h1);
      let marcador = new mapboxgl.Marker(el)
        .setLngLat([data[i].longitud, data[i].latitud])
        .setPopup(popup)
        .addTo(map);
    }
  }
  getCaracterizacion(idComunidad?: string): void {
    debugger
    this.cabeceraRespuestaService._obtenerCaracterizacion(idComunidad).then(data => {
      if (data["http"].codigo == 200) {
       // this.idAsignarEncuestado = data["respuesta"].idAsignarEncuestado.slice(0, -1);
       // this.idModeloPublicado = data["respuesta"].idModeloPublicado.slice(0, -1);
       // this.router.navigateByUrl(`/visorpdf/${this.idAsignarEncuestado}/${this.idModeloPublicado}`);
       this.idAsignarEncuestado = data["respuesta"].idAsignarEncuestado;
       this.idModeloPublicado = data["respuesta"].idModeloPublicado;
       window.open("https://apigpm.manabi.gob.ec/Caracterizacion/Caracterizacion?Encuesta=" + this.idAsignarEncuestado + "&Caracterizacion=" + this.idModeloPublicado);
      
     /*  this.idAsignarEncuestado = data["respuesta"].idAsignarEncuestado;
        this.idModeloPublicado = data["respuesta"].idModeloPublicado;
       let path = "http://apigpm.manabi.gob.ec:8080/Caracterizacion/Caracterizacion?Encuesta=" + this.idAsignarEncuestado + "&Caracterizacion=" + this.idModeloPublicado;
      
       let filePath = this.file.applicationDirectory + 'www/assets';
        
          if (this.platform.is('android')) {
                let fakeName = Date.now();
                this.file.copyFile(filePath, 'francesco2019.pdf', this.file.dataDirectory, `${fakeName}.pdf`)
                .then((result) => {
                  this.fileOpener.open(result.nativeURL, 'application/pdf');
                 }).catch(err=>{
                  console.log("Error to copy Image = ", err)
                })
          } else {
            const options: DocumentViewerOptions = { title: 'Caracterización'}
            this.document.viewDocument(`${filePath}/francesco2019.pdf`, 'application/pdf', options);
          }*/
      } else {
        this.Toast("No existe caracterización para mostrar");
      }
    }).catch(error => {
      debugger
    console.log(error);
    debugger
      this.Toast("Error al generar la caracterización");
    })
  }
  cargarParroquiaMapa() {
    this.cabeceraRespuestaService._comunidadesPorCoordendasDeParroquia(this.latitud, this.longitud)
      .then(data => {
        this.datos = data['respuesta']
        this.addMarketArray(this.datos);
      })
      .catch(error => {
        this.Toast("No se pueden cargar las comunidades");
      })
  }
  cargarMapa() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFza2x6IiwiYSI6ImNrZHA4c3JoZDBzemIyeW1oOGc1ZzNsYTQifQ.ZIiy2hPUuqh6Yb2wj5hnMA';
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 12,
      center: [this.longitud, this.latitud]
    });
    this.addMarket();
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
  }
  getCoordenadas() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // this.latitud = resp.coords.latitude;
     //  this.longitud = resp.coords.longitude;
      //CALCETA -0.864485, -80.526624
      //gilces  -0.864485, -80.526624
      this.latitud = -0.864485;
     this.longitud = -80.526624;
        //QUIROGA
     // this.latitud = -0.881365;
      // this.longitud = -80.094749;
      //console.log("Latitud", this.latitud);
     // console.log("Longitud", this.longitud);
      this.cargarMapa();
      this.cargarParroquiaMapa();
    }).catch((error) => {
      this.Toast('No se pudo obtener su localización');
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
}
