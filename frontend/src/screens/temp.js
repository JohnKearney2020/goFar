{loading ? <Loader /> :
  <>
  {wishList.length === 0 && <Message variant='info' style={{ margin: '8rem'}}>Your wishlist is empty. Add items to your wishlist by clicking the heart icon on a product's page.</Message>}
  <ListGroup variant='flush'>
  {/*===================*/}
  {/*    Table Header   */}
  {/*===================*/}
    <ListGroup.Item className='d-none d-md-block'>
      <Row className='align-items-center justify-content-center' style={{"backgroundColor":"rgba(0,0,0,.03)"}}>
        <Col md={5} className='text-center'>
          <span className='font-weight-bold'>Product</span>
        </Col>
        <Col md={1} className='text-center'>
          <span className='font-weight-bold'>Color</span>
        </Col>
        <Col md={1} className='text-center'>
          <span className='font-weight-bold'>Size</span>
        </Col>
        <Col md={1} className='text-center'>
          <span className='font-weight-bold'>Qty Available</span>              
        </Col>
        <Col md={1} className='text-center'>
          <span className='font-weight-bold'>Current Price</span>
        </Col>
        <Col md={2} className='text-center'>
          <span className='font-weight-bold'>Add to Cart</span> 
        </Col>
        <Col md={1} className='text-center'>
          <span className='font-weight-bold'>Delete</span> 
        </Col>
      </Row> 
    </ListGroup.Item>
    {/*===================*/}
    {/* Items in Wishlist */}
    {/*===================*/}
    {wishList.map((eachProduct, idx) => (
      <WishListRow key={idx}
        productID={eachProduct.productID}
        productName={eachProduct.name}
        color={eachProduct.color}
        size={eachProduct.size}
        sizeCategory={eachProduct.sizeCategory}
        dateAdded={eachProduct.createdAt}
        productImage={eachProduct.image}
        // index={idx}
      />
    ))}
    </ListGroup>
  </>
}
</>