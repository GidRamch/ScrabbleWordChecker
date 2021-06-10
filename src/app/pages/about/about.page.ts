import { Component, OnInit } from '@angular/core';
import { ABOUT_TITLE } from 'src/app/core/strings';
import { AdService } from 'src/app/services/ad/ad.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  title = ABOUT_TITLE;  // Title of page

  constructor(
    private adService: AdService,
  ) { }

  ngOnInit() {
    this.adService.showBannerAd(environment.bannerAds.aboutBannerId);
  }

}
