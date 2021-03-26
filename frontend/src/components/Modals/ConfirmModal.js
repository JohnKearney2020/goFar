import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ConfirmModal = ({ show, closeModalHandler, modalHeading, messageToDisplay, functionToRun }) => {
  return (
    <Modal 
      show={show} 
      onHide={closeModalHandler} 
      centered
      animation={false}
    >
      <Modal.Header closeButton className='align-items-center'><h5 className='mb-0'>{modalHeading}</h5></Modal.Header>
      {/* <Modal.Header closeButton /> */}
      <Modal.Body>
        {messageToDisplay}
      </Modal.Body>
      <Modal.Footer>
          <Button variant="info" onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button variant="danger" onClick={functionToRun}>
            Delete Address
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal;
