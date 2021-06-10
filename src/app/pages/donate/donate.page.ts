import { Component, OnInit } from '@angular/core';
import { DONATE_TITLE } from 'src/app/core/strings';
import { AnimationService } from 'src/app/services/animation/animation.service';
import { AdService } from 'src/app/services/ad/ad.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  title = DONATE_TITLE; // Title of page;

  constructor(
    private animService: AnimationService,
    private adService: AdService,
  ) { }

  ngOnInit() {
    this.adService.showBannerAd(environment.bannerAds.donateBannerId);
    this.animService.scaleBounce(document.querySelector('#clock_image')); // Animate the clock image
  }
}
