import { Component, OnInit } from '@angular/core';
import { DONATE_TITLE } from 'src/app/core/strings';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  title = DONATE_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
