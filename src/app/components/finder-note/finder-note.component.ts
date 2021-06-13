import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-finder-note',
  templateUrl: './finder-note.component.html',
  styleUrls: ['./finder-note.component.scss'],
})
export class FinderNoteComponent implements OnInit {

  constructor(
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() { }


  /**
   * Dismisses the popover
   */
  async dismissPopover(dontShowAgain = false): Promise<boolean> {
    return await this.popoverCtrl.dismiss(dontShowAgain);
  }

}
