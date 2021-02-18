import React from "react";
import ReactDOM from "react-dom";

const Options = () => {
  return (
    <div
      style={{
        width: 500,
        margin: `auto`,
        border: `1px solid black`,
        textAlign: `center`,
      }}
    >
      This is Option Page. Browse Everything
    </div>
  );
};

let root = document.getElementById("root");

ReactDOM.render(<Options />, root);
