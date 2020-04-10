import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinderPage } from './finder.page';

const routes: Routes = [
  {
    path: '',
    component: FinderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinderPageRoutingModule {}
