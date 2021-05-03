import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin=false, keyword=''}) => {
  return pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map(pageNum => (
        <LinkContainer 
          key={pageNum + 1}
          to={keyword ? `/search/${keyword}/page/${pageNum + 1}` : `/page/${pageNum + 1}`}
        >
          <Pagination.Item active={pageNum + 1 === page}>{pageNum + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate;
