import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'; //Since this component does not have access to the history prop

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
      history.push(`/search/${keyword}`);
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='my-1 my-lg-0'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Our Products...'
        className='mr-sm-2'
      >
      </Form.Control>
      <Button type='submit' variant='outline-secondary' className='p-2 mt-2 mt-lg-0'>
        Search
      </Button>
    </Form>
  )
}

export default withRouter(SearchBox);
