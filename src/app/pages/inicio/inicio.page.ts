import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  constructor(
    private router: Router,
    private menuController: MenuController
  ) {
  }
  ngOnInit() {
    this.menuController.enable(false);
    setTimeout(() => {
      this.router.navigateByUrl('/validar-usuario');
    }, 2000);
  }
}
