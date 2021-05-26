import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

// import SearchBox from './SearchBox';
import { logout } from '../../actions/userActions';
import SearchBox from '../SearchBox/SearchBox';
import BigNavDropdown from './ProductNavDropdown';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const[showNav, setShowNav] = useState(false);
  const[disableProductNav, setDisableProductNav] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
  }

  const showProductsNavHandler = () => {
    console.log('showProductsNavHandler');
    setShowNav(true);
  }

  const productsClickHandler = () => {
    setDisableProductNav(true); //Explained Below
    console.log('productsClickHandler');
    setShowNav(false)
    // This setTimeout prevents the products dropdown onClick and the 'click outside' handler of the BigNavDropdown from interfering with each other. 
    // Without this, when the product dropdown is showing, clicking the product dropdown again will simply quickly close the dropdown and immediately reopen it
    setTimeout(() => {
      setDisableProductNav(false);
    }, 240);
  }

  return (
    <>
      <header>
        {/* <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect> */}
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        {/* <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect> for Cosmo Theme */}
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>Go Far</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              {/* Product Dropdown for Desktop */}
              <Nav className='mr-auto'>
                <Nav.Link className='d-none d-lg-block' onClick={disableProductNav ? '' : showProductsNavHandler}>
                  Products {showNav ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                </Nav.Link>
              </Nav>
              <Nav>
                <SearchBox />
              </Nav>
              <Nav className='ml-auto'>
                {/* WishList Link */}
                <LinkContainer to='/wishlist'>
                  <Nav.Link>
                    <FontAwesomeIcon icon={solidHeart} /> Wishlist
                  </Nav.Link>
                </LinkContainer>
                {/* Cart Link */}
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
                </LinkContainer>
                {userInfo.loggedIn ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile/userInfo'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {/* Product Dropdown for Mobile */}
                <Nav className='mr-auto d-block d-lg-none'>
                  <Nav.Link onClick={disableProductNav ? '' : showProductsNavHandler}>
                    Products {showNav ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                  </Nav.Link>
                </Nav>
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminMenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>                
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      {/* Product Nav */}
      {showNav && <BigNavDropdown show={showNav} productsClickHandler={productsClickHandler}/>}
    </>
  )
}

export default Header;