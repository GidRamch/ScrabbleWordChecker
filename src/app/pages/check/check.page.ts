import { Component, OnInit } from '@angular/core';
import { CHECK_TITLE } from 'src/app/core/strings';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { PopoverController, ViewDidEnter } from '@ionic/angular';
import { InfoComponent } from 'src/app/components/info/info.component';
import { AnimationService } from 'src/app/services/animation/animation.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { AdService } from 'src/app/services/ad/ad.service';
import { environment } from 'src/environments/environment';
import { DatabaseService } from 'src/app/services/database/database.service';


type Status = 'ready' | 'waiting' | 'invalid' | 'valid'; // Status type

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit, ViewDidEnter {

  public letterPoints = {
    a: 1, b: 3, c: 3, d: 2, e: 1,
    f: 4, g: 2, h: 4, i: 1, j: 8,
    k: 5, l: 1, m: 3, n: 1, o: 1,
    p: 3, q: 10, r: 1, s: 1, t: 1,
    u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
  };

  title = CHECK_TITLE;      // Title of page
  inputWord = '';           // Word entered by user
  inputWordPoints: number;
  savedInputWord = '';      // Word captured from input for checking
  savedDefinition = '';
  status: Status = 'ready'; // Holds to stage of processing a word


  constructor(
    private loading: LoadingService,
    private popoverCtrl: PopoverController,
    private animService: AnimationService,
    private adService: AdService,
    private databaseService: DatabaseService,
  ) { }

  ngOnInit() {
    this.adService.showBannerAd(environment.bannerAds.checkBannerId);
    this.animService.scaleBounce(document.querySelector('#search_image'));
  }


  ionViewDidEnter() {
    setTimeout(() => SplashScreen.hide(), 250);
  }



  /**
   * Called when the check button is pressed. Cleans up the word,
   * then checks if it is a valid Scrabble word and updates the status
   * variable for displaying the appropriate message.
   */
  wordSubmitted(): void {
    this.savedDefinition = '';
    this.inputWordPoints = 0;

    try {
      this.savedInputWord = this.inputWord.trim();
      this.savedInputWord = this.savedInputWord.trim();
      if (this.savedInputWord && this.savedInputWord.length > 1) {
        this.checkWord(this.savedInputWord.toLocaleLowerCase());
      } else {
        this.handleInputError(Error('Word is too short!'));
      }
    } catch (error) {
      this.handleInputError(error);
    }
  }



  /**
   * Opens the info popover
   */
  public async openInfo(): Promise<void> {
    const popover = this.popoverCtrl.create({
      component: InfoComponent,
      cssClass: 'info-modal',
    });
    return (await popover).present();
  }


  /**
   * Checks the inputted word validity, by checking the appropriate JSON file,
   * then updates the status variable as required.
   *
   * @param word the inputted word
   */
  async checkWord(word: string): Promise<void> {
    let loading: HTMLIonLoadingElement;

    try {
      loading = await this.loading.present(`Hang on! Checking "${word}"...`);
      this.status = 'waiting';
      const lookUp = (await this.databaseService.executeQuery(
        `SELECT definition FROM definitions WHERE term="${word}";`,
        'definitions-large'
      ))[0].definition;

      if (lookUp) {
        this.savedDefinition = lookUp;
        this.inputWordPoints = this.calculatePoints(word);
        this.status = 'valid';
        this.animService.scaleBounce(document.querySelector('#check_image'));
      } else {
        this.status = 'invalid';
        this.animService.scaleBounce(document.querySelector('#x_image'));
      }
    } catch (error) {
      this.handleInputError(error);
    } finally {
      if (loading) { loading.dismiss(); }
    }
  }


  /**
   * Handles any errors that occur during checking a word.
   *
   * @param error The error to be handled
   */
  async handleInputError(error: Error): Promise<void> {
    console.error(error);
    this.status = 'invalid';
    this.animService.scaleBounce(document.querySelector('#x_image'));
  }


  private calculatePoints(word: string): number {
    let points = 0;

    for (const letter of word) {
      points += this.letterPoints[letter] ?? 0;
    }

    return points;
  }
}
