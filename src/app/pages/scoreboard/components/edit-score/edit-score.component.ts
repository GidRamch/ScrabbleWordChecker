import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-edit-score',
  templateUrl: './edit-score.component.html',
  styleUrls: ['./edit-score.component.scss'],
})
export class EditScoreComponent implements OnInit {

  public inputName: string;
  public inputScore: number;
  public newScore: number;
  public addPoints: number;


  constructor(
    private popoverCtrl: PopoverController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    console.log(this.navParams.data);
    this.inputName = this.navParams.data.name;
    this.inputScore = this.navParams.data.score || 0;
  }


  /**
 * Dismisses the info popover
 */
  async dismissPopover(): Promise<boolean> {
    return await this.popoverCtrl.dismiss();
  }


  async scoreSubmitted(): Promise<boolean> {
    if (this.newScore) {
      return await this.popoverCtrl.dismiss(this.newScore);
    }

    if (this.addPoints) {
      return await this.popoverCtrl.dismiss(this.inputScore + this.addPoints);
    }
  }


  public addPointsChanged(): void {
    if (this.addPoints > 0) {
      this.newScore = undefined;
    }
  }

  public newScoreChanged(): void {
    if (this.newScore > 0) {
      this.addPoints = undefined;
    }
  }
}
