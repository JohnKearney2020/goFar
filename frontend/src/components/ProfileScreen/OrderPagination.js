import React from 'react';
import { Pagination } from 'react-bootstrap';

const OrderPagination = ({ pages, page, changePageHandler}) => {
  console.log('PAGES: ', pages)
  console.log('PAGE: ', page)

  return pages > 1 && (
    <Pagination className='justify-content-center'>
      {[...Array(pages).keys()].map(pageNum => (
          <Pagination.Item key={pageNum + 1} active={pageNum + 1 === page} onClick={changePageHandler} data-pagenumber={pageNum + 1}>
            {pageNum + 1}
          </Pagination.Item>
      ))}
    </Pagination>
  )
}

export default OrderPagination;