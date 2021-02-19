import React, { useState, useEffect } from "react";

const Nav = ({ addBookMark }) => {
  return (
    <div
      style={{
        boxSizing: `border-box`,
        width: `100%`,
        backgroundColor: `greenyellow`,
        display: `flex`,
        justifyContent: `space-between`,
        padding: `5px`,
      }}
    >
      <button onClick={addBookMark ? addBookMark : () => {}}>add</button>
    </div>
  );
};

export default Nav;
