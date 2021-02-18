import React, { useState } from "react";
import ReactDOM from "react-dom";

const Content = () => {
  const [isOpen, setIsOpen] = useState(true);
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
        열려 있습니다 <button onClick={() => setIsOpen(false)}>닫기</button>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "grey",
          width: "300px",
          height: "100vh",
          border: "1px solid black",
        }}
      >
        닫혀 있습니다. <button onClick={() => setIsOpen(true)}>열기</button>
      </div>
    );
  }
};

const contentWrapper = document.createElement("div");
contentWrapper.style.position = "fixed";
contentWrapper.style.right = "0";
contentWrapper.style.zIndex = "9999";

const body = document.getElementsByTagName("body");
body[0]?.append(contentWrapper);

ReactDOM.render(<Content />, contentWrapper);
