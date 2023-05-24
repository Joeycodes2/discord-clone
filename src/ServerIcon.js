import React from "react";

function ServerIcon({ image, onClick }) {
  return (
    <img
      src={image}
      alt=""
      onClick={onClick}
      className="h-11 w-11 rounded-full transition-all duration-100 ease-out hover:rounded-2xl
      cursor-pointer"
    />
  );
}

export default ServerIcon;
