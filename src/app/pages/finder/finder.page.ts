import { Component, OnInit } from '@angular/core';
import { FINDER_TITLE } from 'src/app/core/strings';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.page.html',
  styleUrls: ['./finder.page.scss'],
})
export class FinderPage implements OnInit {
  title = FINDER_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
