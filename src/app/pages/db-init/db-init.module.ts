import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DbInitPageRoutingModule } from './db-init-routing.module';

import { DbInitPage } from './db-init.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DbInitPageRoutingModule
  ],
  declarations: [DbInitPage]
})
export class DbInitPageModule {}
