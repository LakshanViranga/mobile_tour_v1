import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
     title: 'Travel Location',
     url: '/location',
     icon: 'home'
    },
    {
      title: 'Stay Place',
      url: '/place',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'profile'
    },
    {
      title: 'Logout',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navController: NavController
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('storage_xxx').then((res) => {
       if (res == null) {
         this.navController.navigateRoot('/intro');
       } else {
         this.navController.navigateRoot('/home');
       }
    });
  }
}
