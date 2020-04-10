import { Component, OnInit } from '@angular/core';
import { DBINIT_TITLE } from 'src/app/core/strings';

@Component({
  selector: 'app-db-init',
  templateUrl: './db-init.page.html',
  styleUrls: ['./db-init.page.scss'],
})
export class DbInitPage implements OnInit {
  title = DBINIT_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
