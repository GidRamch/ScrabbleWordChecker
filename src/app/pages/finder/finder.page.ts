import { Component, OnInit } from '@angular/core';
import { FINDER_TITLE } from 'src/app/core/strings';
import { AnimationService } from 'src/app/services/animation/animation.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.page.html',
  styleUrls: ['./finder.page.scss'],
})
export class FinderPage implements OnInit {
  title = FINDER_TITLE;   // Title of page

  constructor(private animService: AnimationService) { }

  ngOnInit() {
    this.animService.scaleBounce(document.querySelector('#clock_image'));
  }
}
