import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
   
  
   url:string = 'https://maps.googleapis.com/maps/api/geocode/json?';

  _obtenerParroquia(
    latitude: number,longitude: number
  ) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'latlng=' + latitude+',' + longitude + '&location_type=GEOMETRIC_CENTER'+ '&key='+ environment.apiKeyMapa, { headers: this._header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
