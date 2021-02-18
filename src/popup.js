import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "REQUEST_BOOKMARK_STATUS" });

    chrome.runtime.onMessage.addListener((message) => {
      switch (message.type) {
        case "BOOKMARK_STATUS":
          console.log("BOOKMARK_STATUS", message);
          setIsOpen(message.value);
          break;
        default:
          break;
      }
    });
  }, []);
  const handleBookMark = (e) => {
    chrome.runtime.sendMessage({ type: "TOGGLE_BOOKMARK", value: !isOpen });
  };

  return (
    <div>
      This is PopUp page
      <button onClick={handleBookMark}>
        {isOpen ? `Close BookMark` : `Open BookMark`}
      </button>
    </div>
  );
};

let root = document.getElementById("root");

ReactDOM.render(<Popup />, root);
