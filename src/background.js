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

// // FIXME: 이거 무조건 동작하게 개선하기(지금은 됬다 안됬다함)
// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   console.log("Changes");
//   for (var key in changes) {
//     var storageChange = changes[key];
//     console.log(
//       'Storage key "%s" in namespace "%s" changed. ' +
//         'Old value was "%s", new value is "%s".',
//       key,
//       namespace,
//       storageChange.oldValue,
//       storageChange.newValue
//     );
//   }
// });

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
  chrome.runtime.sendMessage({
    type: "BOOKMARK_STATUS",
    value: isBookMarkOpen,
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
