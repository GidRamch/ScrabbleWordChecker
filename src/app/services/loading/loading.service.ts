import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingCtrl: LoadingController) { }

  /**
   * Returns a promise which resolves when a loading dialgoue
   * has been created and presented for the given message
   *
   * @param message message to be shown in loading dialogue
   */
  public async present(message: string): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({ message });
    await loading.present();
    return loading;
  }

}
