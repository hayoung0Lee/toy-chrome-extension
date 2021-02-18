chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ bookmarkStatus: false }, function () {
    console.log("Value is set to " + false);
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            // pageUrl: { hostContains: "google.com" },
            // pageUrl: { hostContains: "youtube.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

// Background script is JavaScript code that's run as a separate
// instance in the browser, and it's mostly used for listening to events
// and to handle a browser wide state.

let isBookMarkOpen = false;

chrome.storage.local.get("bookmarkStatus", (res) => {
  console.log("get updated", res["bookmarkStatus"]);
  isBookMarkOpen = res["bookmarkStatus"];
});

// message format
// {
//   type: "TOGGLE_BOOKMARK",
//   value: isBookMarkOpen
// }
const sendBookMarkStatus = (isBookMarkOpen) => {
  // send message to popup
  const message = {
    type: "BOOKMARK_STATUS",
    value: isBookMarkOpen,
  };
  chrome.runtime.sendMessage(message);

  // send message to every active tab
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        console.log("hello", tab.id);
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
};

chrome.runtime.onMessage.addListener((request) => {
  console.log("Message received in background.js!", request);

  switch (request.type) {
    case "TOGGLE_BOOKMARK":
      isBookMarkOpen = request.value;
      chrome.storage.sync.set({ bookmarkStatus: isBookMarkOpen });
      sendBookMarkStatus(isBookMarkOpen);
      break;
    case "REQUEST_BOOKMARK_STATUS":
      sendBookMarkStatus(isBookMarkOpen);
      break;
    default:
      break;
  }
});
