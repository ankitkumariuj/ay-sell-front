import React from 'react'
import './Hero.css'
const Item = (props) => {
  return (
    <div className='item'>
      <img src={props.image} alt="" />
      <p>{props.name}</p>
      <p>{props.old_price}</p>
      <p>{props.new_price}</p>
    </div>
  )
}

export default Item
