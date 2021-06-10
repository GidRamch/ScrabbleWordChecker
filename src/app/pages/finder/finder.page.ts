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
  public title = FINDER_TITLE;
  public status: Status = 'ready'; // Holds to stage of processing a word

  public wordGroups: Record<number, string[]>;


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


  private async findWords(inputLetters: string[]): Promise<void> {
    const invertedAlphabet = this.getInvertedAlphabet(this.alphabet, inputLetters);
    const [uniqueInputLetters, uniqueInputLetterCount] = this.getUniqueLettersAndCount(inputLetters);
    const validWords = await this.getValidWords(invertedAlphabet, uniqueInputLetters, uniqueInputLetterCount);
    this.wordGroups = this.generateWordGroups(validWords);
    if (validWords?.length) {
      this.status = 'valid';
    } else {
      throw Error('no words found');
    }
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
  ): Promise<string[]> {
    let validWords: string[] = [];

    for (const uniqueInputLetter of uniqueInputLetters) {
      const dictionary: Record<string, string> =
        await this.httpService.get<Record<string, string>>(`/assets/json/${uniqueInputLetter}.json`)
          .toPromise<Record<string, string>>();

      for (const unwantedLetter of invertedAlphabet) {

        if (unwantedLetter === uniqueInputLetter) { continue; }

        this.removeUnwantedWordsFromDictionary(unwantedLetter, uniqueInputLetterCount, dictionary);

        if (Object.keys(dictionary).length === 0) { break; }
      }

      validWords = [...validWords, ...Object.keys(dictionary)];
    }

    return validWords;
  }


  private removeUnwantedWordsFromDictionary(
    unwantedLetter: string,
    uniqueInputLetterCount: Record<string, number>,
    dictionary: Record<string, string>,
  ): void {
    for (const word in dictionary) {
      if (word.includes(unwantedLetter) || word.length > 10) {
        delete dictionary[word];
      } else {
        const [_, uniqueWordLetterCount] = this.getUniqueLettersAndCount(word);

        // Delete word if letter counts exceed that of input letters

        for (const letter in uniqueWordLetterCount) {
          if (uniqueWordLetterCount[letter] > uniqueInputLetterCount[letter]) {
            delete dictionary[word];
            break;
          }
        }
      }
    }
  }


  private generateWordGroups(words: string[]): Record<number, string[]> {
    const wordGroups: Record<number, string[]> = {};

    words.sort((a, b) => {
      if (a > b) { return -1; };
      if (a < b) { return 1; };
      return 0;
    });

    for (const word of words) {
      if (!wordGroups[word.length]) { wordGroups[word.length] = [word]; }
      else { wordGroups[word.length].push(word); }
    }

    return wordGroups;
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
