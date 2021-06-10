import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { AdMob } from '@capacitor-community/admob';
import { App } from '@capacitor/app';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {

  private backButtonTapCount = 0;

  constructor(
    private themeService: ThemeService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    App.addListener('backButton', () => {
      this.backButtonTapCount++;
      
      if (this.backButtonTapCount === 2) {
        App.exitApp();
      } else {
        this.toastService.presentToast('Tap back button again to exit!', true, 'middle', undefined, 2000);
        setTimeout(()=>this.backButtonTapCount = 0, 1900);
      }
    });


    AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: true,
    });

  }

  async ngAfterViewInit() {
    await this.themeService.initialize();
  }
}
