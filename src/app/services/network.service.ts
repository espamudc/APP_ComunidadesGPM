import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { UsuarioService } from '../services/usuario.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
export enum ConnectionStatus{
  Online,
  Offline
}
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  token:any;
  id:any;
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  constructor(private network: Network, 
    public usuarioService:  UsuarioService,
    private toastController: ToastController,
    private plt: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router) {
    this.plt.ready().then(() => {
      debugger
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#239450');
      this.token = localStorage.getItem('token');
      this.accessToken();
      if(this.token){
        this.router.navigateByUrl("roles");
        }
      this.initializeNetworkEvents();
      let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
    });
   }
   ngOnDestroy(){
    // let toast = this.toastController.create({
    //   message: `salí de la app`,
    //   duration: 3000,
    //   position: 'bottom'
    // });
   // toast.then(toast => toast.present());
    if (this.id) {
      clearInterval(this.id);
      // let toast = this.toastController.create({
      //   message: `borré interval`,
      //   duration: 3000,
      //   position: 'bottom'
      // });
      // toast.then(toast => toast.present());
    }
   }
  public accessToken(): void {  
   this.id = setInterval(() => {
      this.usuarioService._updatetoken(localStorage.getItem('_correo')) 
      console.log('token actualizado')
    },  1680000);
  }
//1680000
   public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }
 
  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
    let toast = this.toastController.create({
      message: `Tu estás ${connection}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());
  }
  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }
  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }
}
