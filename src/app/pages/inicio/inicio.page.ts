import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Platform } from '@ionic/angular';
import { NetworkService,ConnectionStatus } from 'src/app/services/network.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  options: AnimationOptions = {
    path: '/assets/inicio.json',
    autoplay: true,
    loop: true
  };
  constructor(
    private router: Router,
    private menuController: MenuController,
    private plt: Platform,
    private networkService:NetworkService
  ) {
  }
  login(){
    this.router.navigateByUrl('/validar-usuario');
  }
  ngOnInit() {
    this.menuController.enable(false);
    this.cargarPLatformular();
  }
  ionViewWillEnter(){
    this.cargarPLatformular();
  }
  cargarPLatformular() {
    this.plt.ready().then(() => {
      if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
        debugger
      }else{
        debugger
      }
    });
  }
  animationCreated(animationItem: AnimationItem): void {
    //console.log(animationItem);
  }
}
