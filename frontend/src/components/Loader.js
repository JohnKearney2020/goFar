import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = (idSelector) => {
  return (
    <>
      <Spinner 
        animation='border'
        role='status'
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block'
        }}
        id={idSelector}
      >
      </Spinner>
    </>
  )
}

Loader.defaultProps = {
  idSelector: ''
}

export default Loader;