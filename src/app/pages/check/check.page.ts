import { Component, OnInit } from '@angular/core';
import { CHECK_TITLE } from 'src/app/core/strings';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { map } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { InfoComponent } from 'src/app/components/info/info.component';
import { AnimationService } from 'src/app/services/animation/animation.service';

type Status = 'ready' | 'waiting' | 'invalid' | 'valid'; // Status type

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {
  title = CHECK_TITLE;      // Title of page
  inputWord = '';           // Word entered by user
  savedInputWord = '';      // Word captured from input for checking
  status: Status = 'ready'; // Holds to stage of processing a word


  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private popoverCtrl: PopoverController,
    private animService: AnimationService
  ) { }

  ngOnInit() {
    this.animService.scaleBounce(document.querySelector('#search_image'));
  }


  /**
   * Called when the check button is pressed. Cleans up the word,
   * then checks if it is a valid Scrabble word and updates the status
   * variable for displaying the appropriate message.
   */
  wordSubmitted(): void {
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
   * Checks the inputted word validity, by checking the appropriate JSON file,
   * then updates the status variable as required.
   * @param word the inputted word
   */
  async checkWord(word: string): Promise<void> {
    try {
      await this.loading.present(`Hang on! Checking "${this.inputWord}"...`);
      this.status = 'waiting';
      const lookUp = await this.http.get(`/assets/json/${word[0]}.json`).pipe(map(res => res[word])).toPromise();
      if (lookUp) {
        this.status = 'valid';
        this.animService.scaleBounce(document.querySelector('#check_image'));
      } else {
        this.status = 'invalid';
        this.animService.scaleBounce(document.querySelector('#x_image'));
      }
      await this.loading.dismiss();
    } catch (error) {
      this.handleInputError(error);
    }
  }


  /**
   * Handles any errors that occur during checking a word.
   * @param error The error to be handled
   */
  async handleInputError(error: Error): Promise<void> {
    await this.loading.dismiss();
    console.error(error);
    this.status = 'invalid';
    this.animService.scaleBounce(document.querySelector('#x_image'));
  }


  /**
   * Opens the info popover
   */
  async openInfo(): Promise<void> {
    const popover = this.popoverCtrl.create({
      component: InfoComponent,
    });
    return (await popover).present();
  }
}
