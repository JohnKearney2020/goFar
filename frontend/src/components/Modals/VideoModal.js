import React  from 'react';
import Modal from 'react-bootstrap/Modal'

const VideoModal = ({ show, source, closeModalHandler, productName }) => {
  // const[show, setShow] = useState(videoClicked);

  // const closeModalHandler = () => {
  //   // setShow(false);
  //   closeModalResetHandler();
  // }
  return (
    // <Modal show={show} onHide={closeModalHandler} dialogClassName='productCarouselVideoModal' contentClassName='productCarouselVideoModalContent' centered restoreFocus={false} style={{opacity:1}} animation={false}>
    <Modal 
      show={show} 
      onHide={closeModalHandler} 
      dialogClassName='productCarouselVideoModal px-md-5' 
      contentClassName='productCarouselVideoModalContent' 
      centered
      animation={false}
    >
      <Modal.Header closeButton className='align-items-center'><h5 className='mb-0'>{productName}</h5></Modal.Header>
      {/* <Modal.Header closeButton /> */}
      <Modal.Body>
        <iframe 
        width="100%" 
        height="100%" 
        src={`${source}?autoplay=1`} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        title={productName}
        >
        </iframe>
      </Modal.Body>
    </Modal>
  )
}

export default VideoModal;
