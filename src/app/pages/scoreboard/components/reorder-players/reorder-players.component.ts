import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail, NavParams, PopoverController } from '@ionic/angular';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-reorder-players',
  templateUrl: './reorder-players.component.html',
  styleUrls: ['./reorder-players.component.scss'],
})
export class ReorderPlayersComponent implements OnInit {

  public players: Array<Player>;

  constructor(
    private popoverCtrl: PopoverController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    this.players = [...this.navParams.data.players];
  }


  async dismissPopover(): Promise<boolean> {
    return await this.popoverCtrl.dismiss();
  }


  doReorder(event: unknown) {
    const castedEvent = event as CustomEvent<ItemReorderEventDetail>;
    const originalIndex = castedEvent.detail.from;
    const newIndex = castedEvent.detail.to;

    if (originalIndex !== newIndex) {
      const item = this.players.splice(originalIndex, 1);
      this.players.splice(newIndex, 0, ...item);
    }
    castedEvent.detail.complete();


    console.log(this.players);
  }


  async saveOrder(): Promise<boolean> {
    return await this.popoverCtrl.dismiss(this.players);
  }
}
