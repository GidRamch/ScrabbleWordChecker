import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SCORE_TITLE } from 'src/app/core/strings';
import { PageStatus } from 'src/app/models/PageStatus';
import { Player } from 'src/app/models/Player';
import { AdService } from 'src/app/services/ad/ad.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { environment } from 'src/environments/environment';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditScoreComponent } from './components/edit-score/edit-score.component';
import { ScoreboardService } from './scoreboard.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit {

  public players: Player[];
  public lastPlayedName: string;

  public title = SCORE_TITLE; // Title of page;
  public status: PageStatus = 'ready';


  constructor(
    public scoreboardService: ScoreboardService,
    private popoverCtrl: PopoverController,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private adService: AdService,
  ) { }

  ngOnInit() {
    this.adService.showBannerAd(environment.bannerAds.scoreBoardBannerId);

    this.initialize();
  }

  private async initialize(): Promise<void> {
    let loading: HTMLIonLoadingElement;
    try {
      loading = await this.loadingService.present('Loading players...');
      this.players = await this.scoreboardService.getPlayers();
      this.lastPlayedName = await this.scoreboardService.getLastPlayedName();
    } catch (err) {
      console.error(err);
      this.alertService.error('There was a problem loading players. Please try again!');
    } finally {
      loading?.dismiss();
    }
  }


  public async addPlayerTapped(): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: AddPlayerComponent,
      cssClass: 'info-modal',
      animated: false,
    });
    await popover.present();

    const playerName = (await popover.onDidDismiss()).data;
    if (playerName?.length) {
      await this.scoreboardService.addPlayer(playerName);
      this.players = await this.scoreboardService.getPlayers();
      this.lastPlayedName = await this.scoreboardService.getLastPlayedName();
    }
  }


  public async clearPlayers(): Promise<void> {
    if (!(await this.alertService.confirm('Clear Players?', 'Are you sure you want to delete all players?'))) {
      return
    }

    await this.scoreboardService.setPlayers([]);
    this.players = await this.scoreboardService.getPlayers();
    this.lastPlayedName = await this.scoreboardService.getLastPlayedName();
  }


  public async resetScores(): Promise<void> {
    if (!(await this.alertService.confirm('Reset Scores?', 'Are you sure you want to reset all scores?'))) {
      return
    }

    await this.scoreboardService.resetScores();
    this.players = await this.scoreboardService.getPlayers();
    this.lastPlayedName = await this.scoreboardService.getLastPlayedName();
  }

  public async deletePlayer(name: string): Promise<void> {
    if (!(await this.alertService.confirm('Delete Player?', `Are you sure you want to delete ${name}?`))) {
      return
    }

    await this.scoreboardService.removePlayer(name);
    this.players = await this.scoreboardService.getPlayers();
    this.lastPlayedName = await this.scoreboardService.getLastPlayedName();
  }

  public async scoreChanged(e: any, playerName: string): Promise<void> {
    await this.scoreboardService.setScore(parseInt(e?.detail?.value?.length ? e.detail.value : "0"), playerName);
  }

  public async scoreTapped(name: string, score: number): Promise<void> {
    const popover = await this.popoverCtrl.create({
      componentProps: {
        name,
        score,
      },
      component: EditScoreComponent,
      cssClass: 'info-modal',
      animated: false,
    });
    await popover.present();
    const newScore = (await popover.onDidDismiss()).data;

    if (!newScore) { return; }

    await this.scoreboardService.setScore(newScore, name);
    this.players = await this.scoreboardService.getPlayers();
    this.lastPlayedName = await this.scoreboardService.getLastPlayedName();
  }
}
