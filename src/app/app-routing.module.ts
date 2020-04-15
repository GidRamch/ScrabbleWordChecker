import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MENU_ROUTE, CHECK_ROUTE, DBINIT_ROUTE } from './core/strings';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${MENU_ROUTE}/${CHECK_ROUTE}`,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
