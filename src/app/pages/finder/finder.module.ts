import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinderPageRoutingModule } from './finder-routing.module';

import { FinderPage } from './finder.page';
import { FinderNoteComponent } from 'src/app/components/finder-note/finder-note.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinderPageRoutingModule
  ],
  declarations: [FinderPage, FinderNoteComponent,]
})
export class FinderPageModule { }
