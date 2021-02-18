// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", function (data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

// changeColor.onclick = function (element) {
//   let color = element.target.value;
//   // query: chrome.tab.query((queryInfo: object), (callback: function));
//   // FIXME: slider.js 부르는 방식변경하기, 현재대로는 번들링이 안됨(수동으로 dist에 옮겨줘야함, 글구 어찌됬든 뭔가 이상함)
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(tabs[0].id, { file: "./slider.js" });
//   });
// };
import React from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  return <div>This is PopUp page</div>;
};

let root = document.getElementById("root");

console.log("root", root);

ReactDOM.render(<Popup />, root);
