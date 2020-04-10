import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: HTMLIonLoadingElement;

  constructor(public loadingCtrl: LoadingController) { }


  /**
   * Returns a promise which resolves when a loading dialgoue
   * has been created and presented for the given message
   * @param message message to be shown in loading dialogue
   */
  async present(message: string): Promise<void> {
    if (this.loading) {
      this.loading.message = message;
      return;
    }

    this.loading = await this.loadingCtrl.create({ message });
    return this.loading.present();
  }


  /**
   * Dismisses the loading dialogue if it exists
   */
  async dismiss(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = undefined;
    }
  }
}
