import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from '../storage/storage.service';

const THEME_KEY = 'selected-app-theme';
const DARK_ID = 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode = false;       // true if dark mode is enabled, false otherwise

  constructor(
    private platform: Platform,
    private storage: StorageService,
  ) {
    this.initialize();
  }


  /**
   * Gets the theme from local storage and sets it accordingly.
   * Also sets up an event listener for the dark mode global system setting.
   */
  async initialize(): Promise<void> {
    await this.platform.ready();
    const theme = await this.storage.get(THEME_KEY);

    if (theme === DARK_ID) {
      this.setDarkMode(true);
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addListener(e => {
      console.log('matches: ', e);
      this.setDarkMode(e.matches);
    });
  }


  /**
   * Sets dark mode on or off based on isDark value
   * @param isDark - whether or not to set dark mode on
   */
  async setDarkMode(isDark: boolean): Promise<void> {
    this.darkMode = isDark;
    if (this.darkMode) {
      document.body.classList.add('dark');
      await this.storage.set(THEME_KEY, DARK_ID);
    } else {
      document.body.classList.remove('dark');
      await this.storage.set(THEME_KEY, undefined);
    }
  }
}
