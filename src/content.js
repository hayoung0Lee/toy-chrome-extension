import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./content-component/header";
import Main from "./content-component/main";
import Nav from "./content-component/nav";

const Content = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [bookmarks, setBookMarks] = useState([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "REQUEST_BOOKMARK_STATUS" });
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.type) {
        case "BOOKMARK_STATUS":
          setIsOpen(message.value);
          break;
        case "BOOKMARK_ADDED":
          console.log("추가", bookmarks);
          setBookMarks((oldBookmarks) => [...oldBookmarks, "추가!"]);
          break;
        default:
          break;
      }
    });
  }, []);

  console.log("bookmarks", bookmarks);

  const handleBookMark = (e) => {
    chrome.runtime.sendMessage({ type: "TOGGLE_BOOKMARK", value: !isOpen });
  };

  const addBookMark = (e) => {
    const url = new URL(window.location.href);
    console.log("url", url, url.protocol, url.hostname);

    chrome.runtime.sendMessage({
      type: "ADD_BOOKMARK",
      value: { scheme: url.protocol, host: url.hostname, fullUrl: url },
    });
  };

  if (isOpen) {
    return (
      <div
        style={{
          backgroundColor: "white",
          width: "300px",
          height: "100vh",
          border: "1px solid black",
        }}
      >
        <Header handleBookMark={handleBookMark} />
        <Nav addBookMark={addBookMark} />
        <Main bookmarks={bookmarks} />
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "grey",
          width: "10px",
          height: "100vh",
          border: "1px solid black",
        }}
      >
        닫혀 있습니다.
      </div>
    );
  }
};

const contentWrapper = document.createElement("div");
contentWrapper.style.position = "fixed";
contentWrapper.style.right = "0";
contentWrapper.style.top = "0";
contentWrapper.style.zIndex = "9999";

const body = document.getElementsByTagName("body");
body[0]?.append(contentWrapper);

ReactDOM.render(<Content />, contentWrapper);
