import { Component } from '@angular/core';
import {
  CHECK_ROUTE,
  ABOUT_ROUTE,
  DONATE_ROUTE,
  MENU_ROUTE,
  CHECK_TITLE,
  ABOUT_TITLE,
  DONATE_TITLE,
  MENU_TITLE,
  MENU_NOTE,
  FINDER_TITLE,
  FINDER_ROUTE
} from 'src/app/core/strings';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {
  public selectedIndex = 0; // Current page
  title = MENU_TITLE;       // Title of menu
  note = MENU_NOTE;         // Note on menu

  public appPages = [
    {
      title: CHECK_TITLE,
      url: `/${MENU_ROUTE}/${CHECK_ROUTE}`,
      icon: 'checkmark-circle'
    }, {
      title: FINDER_TITLE,
      url: `/${MENU_ROUTE}/${FINDER_ROUTE}`,
      icon: 'search-circle'
    }, {
      title: ABOUT_TITLE,
      url: `/${MENU_ROUTE}/${ABOUT_ROUTE}`,
      icon: 'information-circle'
    }, {
      title: DONATE_TITLE,
      url: `/${MENU_ROUTE}/${DONATE_ROUTE}`,
      icon: 'happy'
    }
  ];

  constructor(
    public themeService: ThemeService,
  ) { }
}
