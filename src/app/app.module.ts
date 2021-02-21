import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TipoPreguntaModule} from './components/tipo-pregunta/tipo-pregunta.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { PreguntasRestantesPageModule } from './pages/preguntas-restantes/preguntas-restantes.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ScreenMessengerPageModule } from './pages/screen-messenger/screen-messenger.module';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AutocompleteLibModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TipoPreguntaModule,
    PreguntasRestantesPageModule,
    ScreenMessengerPageModule,
    IonicStorageModule.forRoot(),LottieModule.forRoot({ player: playerFactory })
    
  ],
  exports:[],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    Geolocation,
    StatusBar,
    SplashScreen,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
