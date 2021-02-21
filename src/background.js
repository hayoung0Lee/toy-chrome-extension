chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ bookmarkStatus: true }, function () {
    console.log("Value is set to " + false);
  });

  create_db();

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

// indexed DB settings
let db = null;
// FIXME id 문제 공부하고 해결하기, 자동으로 올라가는 것 어떻게 하는지 확인
let id = 5;
let sampleData = [
  {
    host: "youtube.com",
    url: `youtube.com/${id}`,
    memo: "memo memo",
    id: id++,
  },
  {
    host: "youtube.com",
    url: `youtube.com/${id}`,
    memo: "memo memo",
    id: id++,
  },
];

function create_db() {
  const request = window.indexedDB.open("MyTestDB");

  request.onerror = function (event) {
    console.log("Promblem with Indexed DB");
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    let objectStore = db.createObjectStore("bookmark-data", {
      keyPath: "url",
      autoIncrement: true,
    });

    objectStore.transaction.oncomplete = function (event) {
      console.log("ObjectStroe Created");
    };
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("DB OPENED.");

    insert_records(sampleData);
    db.onerror = function (event) {
      console.log("FAILED TO OPEN DB");
    };
  };
}

function insert_records(records) {
  if (db) {
    const insert_transaction = db.transaction("bookmark-data", "readwrite");
    const objectStore = insert_transaction.objectStore("bookmark-data");

    return new Promise((resolve, reject) => {
      insert_transaction.oncomplete = function () {
        console.log("ALL INSERT TRANSACTIONS COMPLETE");
        resolve(true);
      };

      insert_transaction.onerror = function (event) {
        console.log("PROBLEM INSERTING RECORDS", event);
        resolve(false);
      };

      //
      records.forEach((r) => {
        let request = objectStore.add(r);
        request.onsuccess = function () {
          console.log("Added: ", r);
        };
      });
    });
  } else {
    console.log("DB NOT DEFINED");
  }
}

function add_record(record) {
  const transaction = db.transaction(["bookmark-data"], "readwrite");
  // Do something when all the data is added to the database.
  transaction.oncomplete = function (event) {
    console.log("All done!");
  };

  transaction.onerror = function (event) {
    // Don't forget to handle errors!
    console.log("Error!!! while adding record");
  };

  const objectStore = transaction.objectStore("bookmark-data");
  const request = objectStore.add({
    host: "youtube.com",
    url: `youtube.com/${id}`,
    memo: "memo memo",
    id: id++,
  });
  request.onsuccess = function (event) {
    console.log("success");
  };

  request.onerror = function (event) {
    console.log("error");
  };
}

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

const addBookMarkAndSendResult = (bookMarkValue) => {
  const message = {
    type: "BOOKMARK_ADDED",
    value: "SUCCESS",
  };

  //   {
  //     active: true,
  //     currentWindow: true,
  //   },
  console.log(`${bookMarkValue.scheme}//${bookMarkValue.host}/*`);

  chrome.tabs.query(
    { url: `${bookMarkValue.scheme}//${bookMarkValue.host}/*` },
    (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, message);
        }
      });
    }
  );
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
    case "ADD_BOOKMARK":
      console.log("ADD BOOKMARK");
      add_record();
      bookMarkValue = request.value;
      addBookMarkAndSendResult(bookMarkValue);
      break;
    default:
      break;
  }
});
