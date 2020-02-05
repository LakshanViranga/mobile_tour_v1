import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastController, AlertController, LoadingController} from '@ionic/angular';
import {AccessProviders} from '../providers/access-provider';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  UserName = '';
  Email = '';
  Password = '';
  CPassword = '';
  disabledButton ;
  constructor(
      private router: Router,
      private ToastCtrl: ToastController,
      private AlertCtrl: AlertController,
      private LoadingCtrl: LoadingController,
      private  accsPrvds: AccessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }
   async register() {
    if (this.UserName === '') {
      this.presentToast('Username is required');
    } else if (this.Email === '') {
      this.presentToast('Email is required');
    } else if (this.Password === '') {
      this.presentToast('Password is required');
    } else if (this.Password !== this.CPassword) {
      this.presentToast('Password are not the same');
    } else {
      this.disabledButton = true;
      console.log('Clicked');
      const loader = await this.LoadingCtrl.create({
        message: 'Please wait......'
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_register',
          your_name: this.UserName,
          email_address: this.Email,
          password: this.Password
        }

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
          }else{
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);

          }
        },(err)=>{
          loader.dismiss();
          this.disabledButton = false;
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
            this.register();
          }
        }
      ]
    });

    await alert.present();
  }
}
