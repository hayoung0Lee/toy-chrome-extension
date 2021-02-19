import React, { useState, useEffect } from "react";

const Header = ({ handleBookMark }) => {
  return (
    <header
      style={{
        boxSizing: `border-box`,
        width: `100%`,
        backgroundColor: `green`,
        display: `flex`,
        justifyContent: `space-between`,
        padding: `5px`,
      }}
    >
      <div>header 입니다</div>
      <button onClick={handleBookMark}>닫기</button>
    </header>
  );
};

export default Header;
