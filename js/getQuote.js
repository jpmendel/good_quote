// Good Quote - getQuote.js
// By Jacob Mendelowitz

function isLetter(char) {
  return (((char.charCodeAt(0) >= 97) && (char.charCodeAt(0) <= 122))
       || ((char.charCodeAt(0) >= 65) && (char.charCodeAt(0) <= 90)));
}

function isUpperCase(char) {
  return ((char.charCodeAt(0) >= 65) && (char.charCodeAt(0) <= 90));
}

function formatQuoteWord(string) {
  var quoteWord = "";
  var numUpperCase = 0;
  for (var i = 0; i < string.length; i++) {
    if (isLetter(string[i])) {
      if (isUpperCase(string[i])) {
        numUpperCase++;
      }
      quoteWord += string[i];
    } else {
      break;
    }
  }
  if ((numUpperCase == 1) && (isUpperCase(quoteWord[0]))) {
    return quoteWord[0].toLowerCase() + quoteWord.substring(1, quoteWord.length);
  } else {
    return quoteWord;
  }
}

function createQuote(source) {
  var plainText = source.body.innerText;
  var wordList = plainText.split(" ");
  var quote = "";
  var numWordsInQuote = 12 + (6 * Math.random());
  var wordsUsed = 0
  while (wordsUsed < numWordsInQuote) {
    var randomIndex = Math.floor(wordList.length * Math.random());
    var randomWord = wordList[randomIndex] + " ";
    var quoteWord = formatQuoteWord(randomWord);
    if (quoteWord == "") {
      continue;
    }
    quote += quoteWord + " ";
    wordsUsed++;
  }
  quote = quote[0].toUpperCase() + quote.substring(1, quote.length - 1) + ".";
  return quote;
}

chrome.runtime.sendMessage({action: "getQuote", text: createQuote(document), url: document.URL});
