import React from 'react';
import ReactDom from 'react-dom';

import './Backdrop.css';

const Backdrop = ({ videoHandler }) => {
  return ReactDom.createPortal(
    // <div className="backdrop" onClick={props.onClick} style={props.style}></div>,
    <div className="backdrop" onClick={videoHandler}></div>,
    document.getElementById('backdropHook')
  )
}

export default Backdrop;
