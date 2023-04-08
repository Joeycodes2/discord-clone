import React from 'react';



function ServerIcon({image}) {

  return (
    <img 
    src={image} 
    alt="" 
    className="h-12 rounded-full transition-all duration-100 ease-out hover:rounded-2xl cursor-pointer"   
    />
  )
}

export default ServerIcon;