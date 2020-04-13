import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private platform: Platform) { }


  /**
   *  Returns a promise which resolves when the storage is ready
   */
  private async isReady(): Promise<void> {
    await this.platform.ready();
    const localForage = await this.storage.ready();
    return localForage.ready();
  }


  /**
   *  Returns a promise of the value in storage with the passed in key
   * @param key key of value to retrieve
   */
  async get(key: string): Promise<any> {
    await this.isReady();
    return this.storage.get(key);
  }


  /**
   *  Return a promise that resolves when the passed in value is stored
   *  in memory with the passed in key.
   * @param key key of value to be stored
   * @param value value to be stored
   */
  async set(key: string, value: any): Promise<any> {
    await this.isReady();
    return this.storage.set(key, value);
  }
}
