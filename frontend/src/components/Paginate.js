import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin=false, keyword='', gender=''}) => {
  let toString = gender ? `/search/${gender}/${keyword}/page/` : keyword ? `/search/${keyword}/page/` : `/page/`;
  return pages > 1 && (
    <Pagination className='justify-content-center'>
      {[...Array(pages).keys()].map(pageNum => (
        <LinkContainer 
          key={pageNum + 1}
          to={`${toString}${pageNum + 1}`}
        >
          <Pagination.Item active={pageNum + 1 === page}>{pageNum + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate;
