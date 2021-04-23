import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} className='m-0'>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info'
}

export default Message;
