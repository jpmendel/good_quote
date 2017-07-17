// Good Quote - popup.js
// By Jacob Mendelowitz

var quoteListener = function(request, sender, sendResponse) {
  if (request.action === "getQuote") {
    document.getElementById("quote").innerHTML = "\"" + request.text + "\"";
    document.getElementById("sitename").innerHTML = "- " + request.url;
  }
  return true;
}

var queryTab = function(tabs) {
  chrome.tabs.executeScript(tabs[0].id, {file: "js/getQuote.js"});
}

chrome.runtime.onMessage.addListener(quoteListener);
chrome.tabs.query({active: true, currentWindow: true}, queryTab);
