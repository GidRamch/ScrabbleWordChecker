import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private platform: Platform) { }

  /**
   *  Returns true if current platform is native device
   */
  async isNative(): Promise<boolean> {
    await this.platform.ready();
    const n = (document.URL.indexOf('http://localhost:8080') === 0 || document.URL.indexOf('ionic') === 0);
    return (this.platform.is('android') || this.platform.is('ios')) && this.platform.is('cordova') && n;
  }


  /**
   *  Returns true if cordova is available
   */
  async isCordova(): Promise<boolean> {
    await this.platform.ready();
    return this.platform.is('cordova');
  }


  /**
   *  Returns true if app is running as a PWA
   */
  async isPWA(): Promise<boolean> {
    await this.platform.ready();
    return this.platform.is('pwa');
  }
}
