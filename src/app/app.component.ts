import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { AdMob } from '@capacitor-community/admob';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(
    private themeService: ThemeService,
  ) {}



  ngOnInit():void {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: true,
    });

  }

  async ngAfterViewInit() {
    await this.themeService.initialize();
  }
}
