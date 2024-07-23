import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNavigation = ({title}) => {
  return (
    <div className='h-10 flex justify-start items-center text-xl font-serif font-bold pl-1.2'>
      <NavLink to="/" className="text-blue-600">Home</NavLink>/{title}
    </div>
  )
}

export default PageNavigation
