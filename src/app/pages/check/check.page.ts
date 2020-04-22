import { Component, OnInit } from '@angular/core';
import { CHECK_TITLE } from 'src/app/core/strings';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { map } from 'rxjs/operators';
import { Animation, AnimationController, PopoverController } from '@ionic/angular';
import { InfoComponent } from 'src/app/components/info/info.component';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {
  title = CHECK_TITLE;
  inputWord = '';
  savedInputWord = '';
  status: 'ready' | 'waiting' | 'invalid' | 'valid' = 'ready';


  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private animationCtrl: AnimationController,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }


  /**
   * Called when the check button is pressed. Cleans up the word,
   * then checks if it is a valid Scrabble word and updates the status
   * variable for displaying the appropriate message.
   */
  wordSubmitted(): void {
    try {
      this.savedInputWord = this.inputWord.trim();
      console.log(this.inputWord);
      this.savedInputWord = this.savedInputWord.trim();
      if (this.savedInputWord && this.savedInputWord.length > 1) {
        this.checkWord(this.savedInputWord.toLocaleLowerCase());
      } else {
        this.handleInputError(Error('Word is to short!'));
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
        this.animateImage('#check_image');
      } else {
        this.status = 'invalid';
        this.animateImage('#x_image');
      }
      await this.loading.dismiss();
    } catch (error) {
      this.handleInputError(error);
    }
  }


  animateImage(id: string) {
    const ref = document.querySelector(id);
    console.log(ref);
    const animation: Animation = this.animationCtrl.create()
      .addElement(ref)
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(0)' },
        { offset: 0.1, transform: 'scale(0.08)' },
        { offset: 0.2, transform: 'scale(0.3)' },
        { offset: 0.3, transform: 'scale(0.69)' },
        { offset: 0.36, transform: 'scale(1)' },
        { offset: 0.4, transform: 'scale(0.91)' },
        { offset: 0.5, transform: 'scale(0.77)' },
        { offset: 0.5, transform: 'scale(0.75)' },
        { offset: 0.6, transform: 'scale(0.78)' },
        { offset: 0.73, transform: 'scale(1)' },
        { offset: 0.82, transform: 'scale(0.94)' },
        { offset: 0.93, transform: 'scale(1)' },
        { offset: 0.95, transform: 'scale(0.98)' },
        { offset: 1, transform: 'scale(1)' },
      ]);
    // .fromTo('transform', 'scale(0)', 'scale(1)');
    animation.play();
  }


  /**
   * Handles any errors that occur during checking a word.
   * @param error The error to be handled
   */
  async handleInputError(error: Error): Promise<void> {
    await this.loading.dismiss();
    console.error(error);
    this.status = 'invalid';
    this.animateImage('#x_image');
  }


  async openInfo(): Promise<void> {
    const popover = this.popoverCtrl.create({
      component: InfoComponent,
    });
    return (await popover).present();
  }
}
