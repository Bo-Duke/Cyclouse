import {ViewChild} from '@angular/core';
import {App, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';


@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
