import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FINDER_TITLE } from 'src/app/core/strings';
import { AnimationService } from 'src/app/services/animation/animation.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

type Status = 'ready' | 'waiting' | 'invalid' | 'valid'; // Status type

@Component({
  selector: 'app-finder',
  templateUrl: './finder.page.html',
  styleUrls: ['./finder.page.scss'],
})
export class FinderPage implements OnInit {

  public alphabet =
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
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
    private httpService: HttpClient,
  ) { }

  ngOnInit() {
    this.animService.scaleBounce(document.querySelector('#find_image'));
  }


  public async lettersSubmitted(): Promise<void> {
    try {
      this.status = 'waiting';
      this.wordGroups = null;
      this.inputLetters = this.inputLetters.replace(/[^A-Za-z]/g, '').toLowerCase();
      this.displayLetters = this.inputLetters;

      if (this.inputLetters.length < 2) {
        throw Error('input letters to short');
      }

      await this.loadingService.present('Finding words, this will only take a moment...');

      await this.findWords(this.inputLetters.split(''));

    } catch (err) {
      this.handleInputError(err);
    } finally {
      this.loadingService.dismiss();
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


  private async findWords(inputLetters: string[]): Promise<void> {
    const a = performance.now();

    const invertedAlphabet = this.getInvertedAlphabet(this.alphabet, inputLetters);
    const [uniqueInputLetters, uniqueInputLetterCount] = this.getUniqueLettersAndCount(inputLetters);
    const validWords = [];
    await this.getValidWords(invertedAlphabet, uniqueInputLetters, uniqueInputLetterCount, inputLetters.length, validWords);

    if (!validWords?.length) {
      throw Error('no words found');
    }

    [
      this.allWordGroups,
      this.wordGroups,
      this.wordGroupOffsets
    ] = await this.generateWordGroups(validWords);

    const b = performance.now();

    console.log(`Time to complete: ${b - a}`);

    this.status = 'valid';

  }


  private getInvertedAlphabet(alphabet: string[], inputLetters: string[]): string[] {
    const invertedAlphabet = [...alphabet];

    for (const letter of inputLetters) {
      const letterIndex = invertedAlphabet.indexOf(letter);

      if (letterIndex !== -1) {
        invertedAlphabet.splice(letterIndex, 1);
      }
    }

    return invertedAlphabet;
  }


  private getUniqueLettersAndCount(inputLetters: string[] | string): [string[], Record<string, number>] {
    const uniqueLetters: string[] = [];
    const letterCounts: Record<string, number> = {};

    for (const letter of inputLetters) {
      if (uniqueLetters.indexOf(letter) === -1) {
        uniqueLetters.push(letter);
        letterCounts[letter] = 1;
      } else {
        letterCounts[letter]++;
      }
    }

    return [uniqueLetters, letterCounts];
  }


  private async getValidWords(
    invertedAlphabet: string[],
    uniqueInputLetters: string[],
    uniqueInputLetterCount: Record<string, number>,
    inputLength: number,
    validWords: string[],
  ): Promise<void> {
    // const validWords: string[] = [];

    for (const uniqueInputLetter of uniqueInputLetters) {
      let dictionary: Record<string, string> =

        await this.httpService.get<Record<string, string>>(`/assets/json/${uniqueInputLetter}.json`)
          .toPromise<Record<string, string>>();


      dictionary = await new Promise((resolve, reject) => {
        const webWorker = new Worker('./assets/workers/remove-unwanted-words.js');
        webWorker.postMessage({ invertedAlphabet, uniqueInputLetterCount, dictionary, uniqueInputLetter, inputLength });

        webWorker.onmessage = (event) => {
          resolve(event.data);
        };
      });
      Array.prototype.push.apply(validWords, Object.keys(dictionary));
    }

    // return validWords;
  }


  private generateWordGroups(words: string[]): Promise<[Record<number, string[]>, Record<number, string[]>, Record<number, number>]> {

    return new Promise((resolve, reject) => {
      const webWorker = new Worker('./assets/workers/generate-word-groups.js');
      webWorker.postMessage({ words });

      webWorker.onmessage = (event) => {
        resolve(event.data);
      };
    });

  }


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
