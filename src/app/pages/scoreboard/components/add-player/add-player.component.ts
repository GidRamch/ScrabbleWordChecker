import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {

  public inputName: string;

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() { }


  /**
 * Dismisses the info popover
 */
  async dismissPopover(): Promise<boolean> {
    return await this.popoverCtrl.dismiss();
  }


  async nameSubmitted(): Promise<boolean> {
    return await this.popoverCtrl.dismiss(this.inputName?.trim());
  }
}
