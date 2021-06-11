"use-strict";

self.onmessage = function (event) {

  var words = event.data.words;
  var allWordGroups = {};
  var wordGroups = {};
  var wordGroupOffsets = {};

  var sorter = function (a, b) {
    if (a > b) { return -1; };
    if (a < b) { return 1; };
    return 0;
  }


  words.sort(sorter);

  for (var wordIndex in words) {
    var word = words[wordIndex];
    if (!allWordGroups[word.length]) { allWordGroups[word.length] = [word]; }
    else { allWordGroups[word.length].push(word); }
  }

  for (var group in allWordGroups) {
    wordGroups[group] = allWordGroups[group].slice(0, 20);
    wordGroupOffsets[group] = 0;
  }

  postMessage([allWordGroups, wordGroups, wordGroupOffsets]);
}
