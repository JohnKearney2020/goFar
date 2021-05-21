import React from 'react';
import { Form } from 'react-bootstrap';


const AddReviewForm = () => {

  const reviewSubmitHandler = () => {
    console.log('submit clicked!')
  }
  return (
    <Form>
      {/* Review Title */}
      <Form.Group>
        <Form.Label>Review Title</Form.Label>
        <Form.Control type='text' placeholder='Enter a title for your review...' />
      </Form.Group>
      {/* Review Message */}
      <Form.Group>
        <Form.Label>Review Title</Form.Label>
        <Form.Control type='text' placeholder='Enter a title for your review...' />
      </Form.Group>
    </Form>
  )
}

export default AddReviewForm
