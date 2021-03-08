import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion'
// import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const ProductReviews = () => {

  const arrayOfReviews = [
    'Review 1',
    'Review 2',
    'Review 3',
    'Review 4',
    'Review 5',
    'Review 6',
    'Review 7',
    'Review 8',
    'Review 9',
    'Review 10',
    'Review 11',
    'Review 12',
    'Review 13',
    'Review 14',
    'Review 15',
    'Review 16',
    'Review 17',
    'Review 18',
    'Review 19',
    'Review 20'
  ]

  const firstReviewsArray = arrayOfReviews.slice(0,3); //first 3 elements. The original array is not modified w/ slice()
  const remainingReviewsArray = arrayOfReviews.slice(3);
  const numReviewsPerAccordion = 5;


  let numSetsOfReviews = Math.floor(remainingReviewsArray.length / numReviewsPerAccordion);
  //Account for leftover reviews that aren't divisible by numReviewsPerAccordion
  const remainder = remainingReviewsArray.length % numReviewsPerAccordion;
  if(remainder > 0) { numSetsOfReviews = numSetsOfReviews + 1 }

  const firstReviews = (
    <>
      <Accordion defaultActiveKey='0' className='w-100'>
        {/* <Card className='border-0'> */}
        <Card>
          {/* <Card.Header className='text-center'> */}
            <Accordion.Toggle as={Button} variant='link' eventKey='0'>
              <h3 className='text-center w-100'>Reviews</h3>
            </Accordion.Toggle>
          {/* </Card.Header> */}
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              {firstReviewsArray.map(eachReview => (
                <h4>{eachReview}</h4>
              ))}
              {secondGroup && 
              
              }
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>    
    </>
  )

  // const remainingReviews = (
  //   <>
  //     {[...Array(numSetsOfReviews)].map((eachSet,idx) => (
  //       <Accordion defaultActiveKey='1' className='w-100'>
  //       <Card>
  //         <Accordion.Collapse eventKey={idx + 1}>
  //           <Card.Body>
  //             <h4>Review 4</h4>
  //             <h4>Review 5</h4>
  //             <h4>Review 6</h4>
  //           </Card.Body>
  //         </Accordion.Collapse>
  //       </Card>
  //       </Accordion>
  //     ))}
  //   </>
  // )

  // {[...Array(qtyInStock).keys()].map(x => (
  //   // Limit the user to a max of 10 items added to the cart at once
  //   (x + 1 <= 10 &&
  //     <option key={x+1} value={x + 1}>
  //     {x + 1}
  //     </option>
  //   )
  // ))}

  return (
    <>
      {firstReviews}
      {/* {remainingReviews} */}
    </>
  )
}

export default ProductReviews;


{/* <Accordion className='w-100'>
<Card>
    <Accordion.Toggle as={Button} variant="light" eventKey='1'>
      <h6>Read More Reviews</h6>
      <i class="fas fa-chevron-down"></i>
    </Accordion.Toggle>
  <Accordion.Collapse eventKey='1'>
    <Card.Body>
      <h4>Review 4</h4>
      <h4>Review 5</h4>
      <h4>Review 6</h4>
    </Card.Body>
  </Accordion.Collapse>
</Card>
</Accordion> */}