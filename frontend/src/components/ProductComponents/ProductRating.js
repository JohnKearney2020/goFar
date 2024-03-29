import React from 'react';

import './ProductRating.css';

import { useSelector } from 'react-redux';
// color is an optional prop we can pass if we want to change the color of the stars in the rating component
// userTotalRating === true when we want to display the average of all review ratings. false when we want to show an individual user's
// review
const ProductRating = ({ color, rating, useTotalRating }) => {
  //Set up the global state
  const productReviews = useSelector(state => state.productReviews);
  const { loaded, totalRating, totalReviews } = productReviews;

  return (
    <>
      {loaded && 
        <div className='productRating'>
          { [1,2,3,4,5].map(value => (
              <i key={value} style={{color}}  className={
                useTotalRating ? 
                (totalRating >= value ? 'fas fa-star' : totalRating >= value - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star') :
                (rating >= value ? 'fas fa-star' : rating >= value - 0.5 ? 'fa-star-half-alt' : 'far fa-star')
              }>
              </i>
            ))
          }
          {useTotalRating && <span>{`${totalReviews} ${totalReviews === 1 ? 'review' : 'reviews'}`}</span>}
        </div>
      }

    </>
  )
};

ProductRating.defaultProps = { 
  color:  'black',
  rating: 0,
  useTotalRating: false
};

//If we felt like checking our protypes:
// ProductRating.propTypes = {
//   value: PropTypes.number.isRequired,
//   text: PropTypes.string.isRequired,
//   color: PropTypes.string
// };

export default ProductRating;
