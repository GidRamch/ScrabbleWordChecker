
"use-strict";

self.onmessage = function (event) {

  var invertedAlphabet = event.data.invertedAlphabet;
  var uniqueInputLetterCount = event.data.uniqueInputLetterCount;
  var dictionary = event.data.dictionary;
  var uniqueInputLetter = event.data.uniqueInputLetter;
  var inputLength = event.data.inputLength;

  for (var unwantedLetterIndex in invertedAlphabet) {

    var unwantedLetter = invertedAlphabet[unwantedLetterIndex];

    if (unwantedLetter === uniqueInputLetter) { continue; }

    for (var word in dictionary) {
      if (
        word.length > inputLength ||
        word.indexOf(unwantedLetter) !== -1
      ) {
        delete dictionary[word];
      } else {
        var uniqueLetters = [];
        var uniqueWordLetterCount = {};
      
        for (var letterIndex in word) {
          var letter = word[letterIndex];
          if (uniqueLetters.indexOf(letter) === -1) {
            uniqueLetters.push(letter);
            uniqueWordLetterCount[letter] = 1;
          } else {
            uniqueWordLetterCount[letter]++;
          }
        }

        for (var letter in uniqueWordLetterCount) {
          if (uniqueWordLetterCount[letter] > uniqueInputLetterCount[letter]) {
            delete dictionary[word];
            break;
          }
        }
      }
    }
    if (Object.keys(dictionary).length === 0) { break; }
  }


  postMessage(dictionary);
}

