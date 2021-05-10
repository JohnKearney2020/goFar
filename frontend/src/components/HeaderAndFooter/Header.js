import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

// import SearchBox from './SearchBox';
import { logout } from '../../actions/userActions';
import SearchBox from '../SearchBox/SearchBox';
import BigNavDropdown from './BigNavDropdown';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const[showNav, setShowNav] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
  }

  const productsClickHandler = () => {
    console.log('clicked products');
    setShowNav(!showNav)
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
              <Nav className='mr-auto'>
                <Nav.Link onClick={productsClickHandler}>
                  Products {showNav ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                </Nav.Link>
                {/* <NavDropdown title='Products' id='productsDropDown'> */}
                  {/* <LinkContainer to='/profile/userInfo'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavDropdown title='Camping' id='campingDropDown' style={{'color': 'red'}}>
                      <NavDropdown.Item>Tents</NavDropdown.Item>
                      <NavDropdown.Item>Footprints</NavDropdown.Item>
                    </NavDropdown>
                  </NavDropdown.Item> */}
                {/* </NavDropdown> */}
              </Nav>
              <SearchBox />
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
                {userInfo.name ? (
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
      {showNav && <BigNavDropdown />}
    </>
  )
}

export default Header;