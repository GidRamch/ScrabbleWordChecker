import { Component, OnInit } from '@angular/core';
import { DONATE_TITLE } from 'src/app/core/strings';
import { AnimationService } from 'src/app/services/animation/animation.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  title = DONATE_TITLE; // Title of page;

  constructor(private animService: AnimationService) { }

  ngOnInit() {
    this.animService.scaleBounce(document.querySelector('#clock_image')); // Animate the clock image
  }
}
