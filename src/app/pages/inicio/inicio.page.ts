import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
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
    private menuController: MenuController
  ) {
  }
  login(){
    this.router.navigateByUrl('/validar-usuario');
  }
  ngOnInit() {
    this.menuController.enable(false);
  }
  animationCreated(animationItem: AnimationItem): void {
    //console.log(animationItem);
  }
}
