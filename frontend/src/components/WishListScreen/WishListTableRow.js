import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

const WishListTableRow = ({ fullProduct, productName, color, size, productImage, dateAdded}) => {

    const [name, setName] = useState(productName);

    useEffect(() => {
      console.log('in wishlist table row useEffect')
      return () => {
        
      }
    }, [])
    
  return (
    <tr className='tableRow'>
      <td className='tableText'>
        <Image className='tableImage' src={productImage}/>
      </td>
      <td className='tableText'>{name}</td>
      <td className='tableText'>{color}</td>
      <td className='tableText'>{size}</td>
      <td className='tableText'>$65</td>
      <td className='tableText'>15</td>
      <td className='tableText'>{dateAdded}</td>
    </tr>
  )
}

export default WishListTableRow;
