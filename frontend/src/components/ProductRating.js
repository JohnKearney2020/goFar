import React from 'react';
// import PropTypes from 'prop-types';
import './ProductRating.css';

const ProductRating = ({ value, text, color }) => {
  return (
    <div className='productRating'>
      { [1,2,3,4,5].map(index => (
          <i key={index} style={{color}}  className={value >= index ? 'fas fa-star' : value >= index - 0.5 ? 'fa-star-half-alt' : 'far fa-star'}></i>
        ))
      }
      <span>{text && text}</span>
    </div>
  )
};

ProductRating.defaultProps = { color:  '#F8E825'};

//If we felt like checking our protypes:
// ProductRating.propTypes = {
//   value: PropTypes.number.isRequired,
//   text: PropTypes.string.isRequired,
//   color: PropTypes.string
// };

export default ProductRating;
