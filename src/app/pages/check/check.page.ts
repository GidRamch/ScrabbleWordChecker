import { Component, OnInit } from '@angular/core';
import { CHECK_TITLE } from 'src/app/core/strings';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {
  title = CHECK_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
