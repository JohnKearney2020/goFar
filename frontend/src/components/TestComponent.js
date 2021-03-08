import React from 'react'

const TestComponent = ({ product }) => {
  return (
    <>
      <h3>Inside Test component</h3>
      <h3>{product.name}</h3>
    </>
  )
}

export default TestComponent
