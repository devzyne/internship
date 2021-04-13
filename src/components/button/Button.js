import React from 'react'
import './Button.css'

const Button = ({ type, text, onClick}) => {
  return (
    <button className='button' type={type} onClick={onClick}>{text}</button>
  )
}

export default Button

