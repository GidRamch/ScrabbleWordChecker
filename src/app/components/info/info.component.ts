import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() { }


  /**
   * Dismisses the info popover
   */
  async dismissPopover(): Promise<boolean> {
    return await this.popoverCtrl.dismiss();
  }

}
