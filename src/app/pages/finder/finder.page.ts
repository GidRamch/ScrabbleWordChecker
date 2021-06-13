/* eslint-disable guard-for-in */
import { Component, OnInit } from '@angular/core';
import { FINDER_TITLE } from 'src/app/core/strings';
import { AnimationService } from 'src/app/services/animation/animation.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AdService } from 'src/app/services/ad/ad.service';
import { environment } from 'src/environments/environment';
import { PopoverController } from '@ionic/angular';
import { FinderNoteComponent } from 'src/app/components/finder-note/finder-note.component';
import { StorageService } from 'src/app/services/storage/storage.service';


type Status = 'ready' | 'waiting' | 'invalid' | 'valid'; // Status type


const DONT_SHOW_FINDER_INFO_KEY = 'dont-show-finder-info';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.page.html',
  styleUrls: ['./finder.page.scss'],
})
export class FinderPage implements OnInit {

  public alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
  public inputLetters = '';           // Letters entered by user
  public displayLetters = '';         // Letters saved for display purposes
  public title = FINDER_TITLE;
  public status: Status = 'ready'; // Holds to stage of processing a word

  public wordGroups: Record<number, string[]>;
  public allWordGroups: Record<number, string[]>;
  private wordGroupOffsets: Record<number, number>;


  constructor(
    private loadingService: LoadingService,
    private animService: AnimationService,
    private databaseService: DatabaseService,
    private adService: AdService,
    private popoverCtrl: PopoverController,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.adService.showBannerAd(environment.bannerAds.finderBannerId);
    this.animService.scaleBounce(document.querySelector('#find_image'));
    this.openInfo();
  }


  /**
   * Opens the info popover
   */
  public async openInfo(forceShow = false): Promise<void> {
    if (!forceShow && await this.storageService.get(DONT_SHOW_FINDER_INFO_KEY)) { return; }

    const popover = await this.popoverCtrl.create({
      component: FinderNoteComponent,
      cssClass: 'info-modal',
    });

    await popover.present();

    const result = await popover.onDidDismiss();

    if (result.data) {
      this.storageService.set(DONT_SHOW_FINDER_INFO_KEY, true);
    }
  }


  public async lettersSubmitted(): Promise<void> {
    let loading: HTMLIonLoadingElement;

    try {
      loading = await this.loadingService.present('Finding words, this may take a while (30 seconds for 10 letters)...');

      this.status = 'waiting';
      this.wordGroups = null;
      this.inputLetters = this.inputLetters.replace(/[^A-Za-z]/g, '').toLowerCase();
      this.displayLetters = this.inputLetters;

      if (this.inputLetters.length < 2) {
        throw Error('input letters to short');
      }

      await this.findWords(this.inputLetters);

    } catch (err) {
      this.handleInputError(err);
    } finally {
      if (loading) { loading.dismiss(); }
    }
  }


  public loadData(event, group): void {
    setTimeout(() => {
      this.wordGroupOffsets[group]++;

      const startIndex = this.wordGroupOffsets[group] * 20;

      Array.prototype.push.apply(this.wordGroups[group], this.allWordGroups[group].slice(startIndex, startIndex + 20));

      event.target.complete();

    }, 100);
  }


  private async findWords(inputLetters: string): Promise<void> {
    this.allWordGroups = {};
    this.wordGroups = {};
    this.wordGroupOffsets = {};

    const queryString = this.generateSelectQuery(inputLetters);

    (await this.databaseService.executeQuery(queryString, 'definitions-large'))
      .forEach(word => {
        console.log(word);
        if (this.allWordGroups[word.term.length]) {
          this.allWordGroups[word.term.length].push(word.term);
        } else {
          this.allWordGroups[word.term.length] = [word.term];
        }
      });

    for (const group in this.allWordGroups) {
      this.wordGroups[group] = this.allWordGroups[group].slice(0, 20);
      this.wordGroupOffsets[group] = 0;
    }
  }


  private generateSelectQuery(letters: string): string {
    let queryString = '';
    const lettersCounts = this.getCharacterCount(letters);

    for (const letter in lettersCounts) {
      queryString = `${queryString} AND\n(LENGTH(term) - LENGTH(REPLACE(term, '${letter}', ''))) <= ${lettersCounts[letter]}`;
    }

    queryString = `SELECT term FROM definitions\nWHERE\n${queryString.substr(5, queryString.length)}`;

    for (const aLetter of this.alphabet) {
      if (!lettersCounts[aLetter]) {
        queryString = `${queryString} AND\n INSTR(term, '${aLetter}') = 0`;
      }
    }

    return `${queryString}\n ORDER BY LENGTH(term) DESC;`;
  }


  private getCharacterCount(letters: string) {
    const uniqueLettersArray = [];
    const letterCounts = {};

    for (const letter of letters) {
      if (uniqueLettersArray.indexOf(letter) === -1) {
        uniqueLettersArray.push(letter);
        letterCounts[letter] = 1;
      } else {
        letterCounts[letter]++;
      }
    }
    return letterCounts;
  };


  /**
   * Handles any errors that occur during checking a word.
   *
   * @param error The error to be handled
   */
  private async handleInputError(error: Error): Promise<void> {
    console.error(error);
    this.status = 'invalid';
    this.animService.scaleBounce(document.querySelector('#x_image'));
  }
}
