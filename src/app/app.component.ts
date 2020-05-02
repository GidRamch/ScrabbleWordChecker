import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme/theme.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private themeService: ThemeService,
    private splashScreen: SplashScreen
  ) {
  }

  ngOnInit() {
    this.initializeApp();
  }

  async ngAfterViewInit() {
    await this.themeService.initialize();
    setTimeout(() => this.splashScreen.hide(), 50);
  }

  async initializeApp() {
    this.statusBar.styleDefault();
    await this.platform.ready();
  }
}
