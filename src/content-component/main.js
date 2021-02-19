import React, { useState, useEffect } from "react";

const Main = ({ bookmarks }) => {
  return (
    <div>
      {bookmarks.length === 0
        ? "main"
        : bookmarks.map((b, index) => {
            return <div key={index}>{b}</div>;
          })}
    </div>
  );
};

export default Main;
