import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastController, AlertController, LoadingController, NavController} from '@ionic/angular';
import {AccessProviders} from '../providers/access-provider';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  UserEmail = '';
  Password = '';
  DisabledButton ;
  constructor(
      private router: Router,
      private ToastCtrl: ToastController,
      private AlertCtrl: AlertController,
      private LoadingCtrl: LoadingController,
      private storage: Storage,
      public NavCtrl: NavController,
      private  accsPrvds: AccessProviders
  ) {}

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.DisabledButton = false;
  }
  async login() {
    if (this.UserEmail === '') {
      this.presentToast('Username is required');
    } else if (this.Password === '') {
      this.presentToast('Password is required');
    } else {
      console.log('Clicked');
      const loader = await this.LoadingCtrl.create({
        message: 'Please wait......'
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_login',
          email_address: this.UserEmail,
          password: this.Password
        };

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
          if (res.success === true) {
            console.log('clicked login');
            loader.dismiss();
            this.DisabledButton = false;
            this.presentToast('Login Successfully');
            this.storage.set('storage_xxx', res.result); ///Create storage Session
            this.NavCtrl.navigateRoot(['/home']);
          } else {
            loader.dismiss();
            this.DisabledButton = false;
            this.presentToast('Please try Again');

          }
        }, (err) => {
          loader.dismiss();
          this.DisabledButton = false;
          this.presentAlert('Timeout');
        });
      });
    }
  }
  async presentToast(a) {
    const toast = await this.ToastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }

  async presentAlert(a) {
    const alert = await this.AlertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            // action
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.login();
          }
        }
      ]
    });

    await alert.present();
  }
  register() {
     this.router.navigate(['/register']);
  }
}
