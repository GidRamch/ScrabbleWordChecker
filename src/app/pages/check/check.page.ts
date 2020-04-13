import { Component, OnInit } from '@angular/core';
import { CHECK_TITLE } from 'src/app/core/strings';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {
  title = CHECK_TITLE;
  inputWord = '';
  status: 'ready' | 'waiting' | 'invalid' | 'valid' = 'ready';

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private toast: ToastService
  ) { }

  ngOnInit() { }


  /**
   * Called when the check button is pressed. Cleans up the word,
   * then checks if it is a valid Scrabble word and updates the status
   * variable for displaying the appropriate message.
   */
  wordSubmitted(): void {
    try {
      console.log(this.inputWord);
      this.inputWord = this.inputWord.trim();
      if (this.inputWord && this.inputWord.length > 1) {
        this.checkWord(this.inputWord.toLocaleLowerCase());
      } else {
        this.status = 'invalid';
        this.toast.presentToast('Scrabble words must be longer than 1 character!', true);
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
      } else {
        this.status = 'invalid';
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
  }
}
