import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  public async set(key: string, value: unknown): Promise<void> {
    return await Storage.set({
      key,
      value: JSON.stringify(value),
    });
  }


  public async get(key: string): Promise<unknown> {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }
}
