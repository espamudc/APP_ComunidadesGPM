import { Component, OnInit } from '@angular/core';
import * as mapboxgl from  'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapaService } from '../../services/mapa.service';
import { CabeceraRespuestaService } from '../../services/cabecera-respuesta.service';
import { ToastController } from '@ionic/angular';
var map;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  latitud:number;
  longitud:number;
  constructor(private geolocation: Geolocation,
              private mapaService:MapaService,
              private cabeceraRespuestaService:CabeceraRespuestaService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.getCoordenadas();
  }
  addMarket(){
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(../../../../../assets/img/location.png)';
    el.style.width = '32px';
    el.style.height = '32px';
    new mapboxgl.Marker(el)
    .setLngLat([this.longitud,this.latitud])
    .addTo(map);
  }
  addMarketArray(data:any){
    data.forEach(function(marker) {
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(../../../../../assets/img/location.png)';
      el.style.width = '32px';
      el.style.height = '32px';
      new mapboxgl.Marker(el)
        .setLngLat([marker.longitud, marker.latitud])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h5>' + marker.NombreCanton +', '+ marker.NombreParroquia+ '</h5><p>Comunidad: ' + marker.NombreComunidad + '</p><p><a href="#">ver ficha</a></p>'))
        .addTo(map);
      });
  }
  cargarParroquiaMapa(){
    this.mapaService._obtenerParroquia(this.latitud,this.longitud).then(data => {
        let parroquia= data['results'][0].address_components[1].short_name;
        debugger
        this.cabeceraRespuestaService._comunidadesPorCoordendasDeParroquia(parroquia)
        .then(data => {
          this.addMarketArray(data['respuesta']);
          debugger
        })
        .catch(error => {
          this.Toast("No se pueden cargar las comunidades");
        })
    }).catch(error => { 
        this.Toast("Error al obetner la parroquia");
    })
  }

  cargarMapa(){
   // this.cargarParroquiaMapa();
       mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFza2x6IiwiYSI6ImNrZHA4c3JoZDBzemIyeW1oOGc1ZzNsYTQifQ.ZIiy2hPUuqh6Yb2wj5hnMA';
        map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
         zoom: 12,
         center: [this.longitud,this.latitud]
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
  getCoordenadas(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;
      console.log("Latitud", this.latitud);
      console.log("Longitud", this.longitud);
      this.cargarMapa();
      }).catch((error) => {
        console.log('Error getting location', error);
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
