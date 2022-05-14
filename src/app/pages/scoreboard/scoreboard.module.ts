import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreboardPageRoutingModule } from './scoreboard-routing.module';

import { ScoreboardPage } from './scoreboard.page';
import { ScoreboardService } from './scoreboard.service';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditScoreComponent } from './components/edit-score/edit-score.component';
import { ReorderPlayersComponent } from './components/reorder-players/reorder-players.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreboardPageRoutingModule,
  ],
  declarations: [
    ScoreboardPage,
    AddPlayerComponent,
    EditScoreComponent,
    ReorderPlayersComponent,
  ],
  providers: [ScoreboardService,]
})
export class ScoreboardPageModule { }
