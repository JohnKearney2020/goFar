import React from 'react';
import ReactDom from 'react-dom';
import { Spinner } from 'react-bootstrap';

import './Backdrop.css';

const Backdrop = () => {
  return ReactDom.createPortal(
    // <div className="backdrop" onClick={props.onClick} style={props.style}></div>,
    <div className="backdrop d-flex flex-column align-items-center justify-conent-center">
      <Spinner 
        animation='border'
        role='status'
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block'
        }}
      />
      <h3 className='' id="orderLoadingMessage">Finalizing Your Order. Sit Tight!</h3>
    </div>,
    document.getElementById('backdropHook')
  )
}

export default Backdrop;
