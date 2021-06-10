import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toast: HTMLIonToastElement;

  constructor(public toastCtrl: ToastController) { }

  /**
   * Creates and displays a toast message with the specified parameters
   * @param message message to be displayed
   * @param color color of message
   * @param position position of message on device screen
   * @param duration how long to show message before hiding
   * @param preventMultiple used to prevent spam toasting
   */
  async presentToast(
    message: string,
    preventMultiple: boolean = false,
    position: 'bottom' | 'middle' = 'bottom',
    color: 'dark' | 'danger' = 'dark',
    duration: number = 5000,
  ): Promise<void> {

    if (this.toast && preventMultiple) {
      await this.toast.dismiss();
    }

    this.toast = await this.toastCtrl.create({
      message,
      color,
      duration,
      position,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });

    return this.toast.present();
  }
}
