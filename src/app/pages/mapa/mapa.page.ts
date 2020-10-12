import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
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
  latitud: number;
  longitud: number;
  idAsignarEncuestado: string;
  idModeloPublicado: string;
  datos: any;
  constructor(private geolocation: Geolocation,
    private mapaService: MapaService,
    private cabeceraRespuestaService: CabeceraRespuestaService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.getCoordenadas();
  }
  addMarket() {
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(../../../../../assets/img/location.png)';
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
      h1.innerHTML = `<h5>Calceta, Calceta</h5>
      <p>Comunidad: Quiroga</p>
      <button type="button">Caracterización</button>`;
      el.className = 'marker';
      el.style.backgroundImage = 'url(../../../../../assets/img/location.png)';
      el.style.width = '32px';
      el.style.height = '32px';
      h1.addEventListener('click', () => {
          this.getCaracterizacion(data[i].idComunidad);
        });
      let popup = new mapboxgl.Popup({ offset: 25, closeOnClick: true }) // add popups
        .setDOMContent(h1);
      let marcador = new mapboxgl.Marker(el)
        .setLngLat([data[i].longitud, data[i].latitud])
        .setPopup(popup)
        .addTo(map);
    }
  }
  getCaracterizacion(idComunidad?: string): void {
    this.cabeceraRespuestaService._obtenerCaracterizacion(idComunidad).then(data => {
      if (data["http"].codigo == 200) {
        this.idAsignarEncuestado = data["respuesta"].idAsignarEncuestado;
        this.idModeloPublicado = data["respuesta"].idModeloPublicado;
        window.open("http://localhost:55584/Caracterizacion/Caracterizacion?Encuesta=" + this.idAsignarEncuestado + "&Caracterizacion=" + this.idModeloPublicado);
      } else {
        this.Toast("No existe caracterización para mostrar");
      }
    }).catch(error => {
      this.Toast("Error al general la caracterización");
    })
  }

  cargarParroquiaMapa() {
    this.mapaService._obtenerParroquia(this.latitud, this.longitud).then(data => {
      let parroquia = data['results'][0].address_components[1].short_name;
      this.cabeceraRespuestaService._comunidadesPorCoordendasDeParroquia(parroquia)
        .then(data => {
          this.datos = data['respuesta']
          this.addMarketArray(this.datos);
        })
        .catch(error => {
          this.Toast("No se pueden cargar las comunidades");
        })
    }).catch(error => {
      this.Toast("Error al obetner la parroquia");
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
      this.latitud = -0.848592;
      this.longitud = -80.161615;;
      console.log("Latitud", this.latitud);
      console.log("Longitud", this.longitud);
      this.cargarMapa();
      this.cargarParroquiaMapa();
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
