import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
export enum ConnectionStatus{
  conectado,
  desconectado
}
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.desconectado);
  constructor(private network: Network, private toastController: ToastController, private plt: Platform) {
    this.plt.ready().then(() => {
      this.initializeNetworkEvents();
      let status =  this.network.type !== 'none' ? ConnectionStatus.conectado : ConnectionStatus.desconectado;
      this.status.next(status);
    });
   }
   public initializeNetworkEvents() {
 
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.conectado) {
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.desconectado);
      }
    });
 
    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.desconectado) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.conectado);
      }
    });
  }
 
  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
    let msj;
    let connection = status == ConnectionStatus.desconectado ? 'desconectado' : 'conectado';
    if(connection=='desconectado'){
      msj=`${connection} de la red`
    }else{
      msj=`${connection} a la red`
    }
    let toast = this.toastController.create({
      message: msj,
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
