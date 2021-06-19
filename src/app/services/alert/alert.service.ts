import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertCtrl: AlertController,
  ) { }


  public async error(header?: string, subHeader?: string, message?: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      cssClass: ['custom-alert', 'alert-error'],
      message,
      buttons: ['OK']
    });

    await alert.present();
    await alert.onDidDismiss();
  }


  public async confirm(header: string, subHeader?: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      backdropDismiss: false,
      cssClass: ['confirm-alert'],
      buttons: [
        {
          role: 'cancel',
          text: 'No'
        },
        {
          role: 'approve',
          text: 'Yes',
        }
      ]
    });

    await alert.present();
    return (await alert.onDidDismiss()).role === 'approve';
  }


  public async force(header: string, subHeader?: string, message?: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      backdropDismiss: false,
      buttons: [
        {
          role: 'approve',
          text: 'OK',
        }
      ]
    });

    await alert.present();
    return (await alert.onDidDismiss()).role === 'approve';
  }
}
