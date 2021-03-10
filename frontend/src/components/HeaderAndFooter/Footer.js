import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './Footer.css';

const Footer = () => {
  return (
    <footer>
        <Row className='justify-content-around align-items-center w-100 h-100'>
          <Col>
            <h5 className='pl-2'>johnkearneydev@gmail.com</h5>
          </Col>
          <Col className='d-flex justify-content-center'>
            <div className='d-block text-center'>
              <img src='./images/footer_bottom.png' alt=""></img>  
              <h5 className='pt-2 m-0'>Copyright  2021 &copy;  Go Far</h5> 
            </div>             
          </Col>
          <Col className='d-flex justify-content-end'>
            <div className='pr-1'>
              <a className="contactIcons" href="https://github.com/JohnKearney2020/mtgReactReduxProject" target="_blank" rel="noopener noreferrer"><i className="fab fa-github-square"></i></a>
              <a className="contactIcons" href="https://www.linkedin.com/in/johnkearneydev/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            </div>            
          </Col>
        </Row>
    </footer>
  )
}

export default Footer;
