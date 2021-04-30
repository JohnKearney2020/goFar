import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children, mtop, mbottom }) => {
  return (
    <Alert variant={variant} className={`${mtop !==  '' ? `mt-${mtop}` : ''} ${mbottom !==  '' ? `mb-${mbottom}` : ''}`}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
  mtop: '',
  mbottom: ''
}

export default Message;
