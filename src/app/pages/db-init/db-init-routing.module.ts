import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbInitPage } from './db-init.page';

const routes: Routes = [
  {
    path: '',
    component: DbInitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DbInitPageRoutingModule { }
