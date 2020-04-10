import { Component, OnInit } from '@angular/core';
import { ABOUT_TITLE } from 'src/app/core/strings';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  title = ABOUT_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
