import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
// import { EscojerRolPipe } from './pages/escojer-rol.pipe';
// import { CuestionarioRespuestasPageModule } from './pages/cuestionario-respuestas/cuestionario-respuestas.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports:[],
  providers: [
    
    StatusBar,
    SplashScreen,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
