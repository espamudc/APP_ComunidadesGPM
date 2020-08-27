import { Component, OnInit } from '@angular/core';
import * as mapboxgl from  'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  latitud:number;
  longitud:number;
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.getCoordenadas();
  }
//0°50'34.3"S 80°09'52.7"W
  cargarMapa(){
    debugger
       mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFza2x6IiwiYSI6ImNrZHA4c3JoZDBzemIyeW1oOGc1ZzNsYTQifQ.ZIiy2hPUuqh6Yb2wj5hnMA';
       var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
         zoom: 16,
         center: [-80.164639,-0.842861]
       });
       var geojson = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-80.163303, -0.847151]
          },
          properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-80.161608, -0.848621]
          },
          properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
          }
        }]
      };
   
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    // map.addControl(new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //         enableHighAccuracy: true
    //     },
    //     trackUserLocation: true
    // }));
    // map.on('mousemove', function (e) {
    //     document.getElementById('coordenadas').innerHTML =
    //         JSON.stringify(e.lngLat);
    // })

      // add markers to map
      geojson.features.forEach(function(marker) {
debugger
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
        el.style.width = '32px';
        el.style.height = '40px';
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);
      });
   
      //  map.on('load', function() {
      //      map.resize();
      //  })
      //  var geocoder = new MapboxGeocoder({ // Initialize the geocoder
      //    accessToken: mapboxgl.accessToken, // Set the access token
      //    mapboxgl: mapboxgl, // Set the mapbox-gl instance
      //    marker: true,
      //    placeholder: 'Search for places in Berkeley', 
      //  });
      //  map.addControl(geocoder);
  }
  getCoordenadas(){
    this.geolocation.getCurrentPosition().then((resp) => {
      debugger
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;
      console.log("Latitud", this.latitud);
      console.log("Longitud", this.longitud);
      this.cargarMapa();
      }).catch((error) => {
        debugger
        console.log('Error getting location', error);
      });
  }
 

}
