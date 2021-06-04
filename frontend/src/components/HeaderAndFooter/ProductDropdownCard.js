import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './ProductDropdownCard.css';

const ProductDropdownCard = ({ title, navCategories, gender='', productsClickHandler }) => {

  let titleString = title === 'Men' ? `/search/men/all` : title === 'Women' ? `/search/women/all` : `/search/${title}`;
  return (
    <Card border='light' className='productDropdownCard'>
      <Card.Body className='p-2'>
        <Link to={titleString} onClick={productsClickHandler} >
          <Card.Title as='h4' className='text-center m-0 productDropdownTitle'>{title}</Card.Title>
        </Link>
        <hr className='my-2 navDropdownHr'/>
        {navCategories.map((eachCat,idx) => {
          return (
            <Link key={`${idx}${eachCat}`} to={gender ? `/search/${gender}/${eachCat}`:`/search/${eachCat}`} onClick={productsClickHandler} >
              <Card.Text as='h6' className='my-1'>
                {eachCat}
              </Card.Text>
            </Link>
          )})
        }
      </Card.Body>
    </Card>
  )
}

export default ProductDropdownCard;
