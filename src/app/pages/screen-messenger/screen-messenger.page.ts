import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-screen-messenger',
  templateUrl: './screen-messenger.page.html',
  styleUrls: ['./screen-messenger.page.scss'],
})
export class ScreenMessengerPage implements OnInit {
  options: AnimationOptions = {
    path: '/assets/messeger.json',
    autoplay: true,
    loop: true
  };
  slideOpts={
    allowSlidePrev:false,
    allowSlideNext:false
  }
  constructor(private router:Router,
    private modalCtrl:ModalController,
    private toastController: ToastController,) { }

  ngOnInit() {
    setTimeout(()=>{
      this.modalCtrl.dismiss();
      this.Toast("Cuestionario finalizado");
      this.router.navigate(['tabs/home']);
   }, 6500);
  }


  animationCreated(animationItem: AnimationItem): void {
    //console.log(animationItem);
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
