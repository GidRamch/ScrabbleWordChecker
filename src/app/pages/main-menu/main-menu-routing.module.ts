import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuPage } from './main-menu.page';
import { MENU_ROUTE, CHECK_ROUTE, FINDER_ROUTE, ABOUT_ROUTE, DONATE_ROUTE } from 'src/app/core/strings';

const routes: Routes = [
  {
    path: MENU_ROUTE,
    component: MainMenuPage,
    children: [
      {
        path: CHECK_ROUTE,
        loadChildren: () => import('../check/check.module').then(m => m.CheckPageModule),
      },
      {
        path: FINDER_ROUTE,
        loadChildren: () => import('../finder/finder.module').then(m => m.FinderPageModule)
      },
      {
        path: ABOUT_ROUTE,
        loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: DONATE_ROUTE,
        loadChildren: () => import('../donate/donate.module').then(m => m.DonatePageModule)
      },
      {
        path: '',
        redirectTo: `/${MENU_ROUTE}/${CHECK_ROUTE}`,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuPageRoutingModule { }
