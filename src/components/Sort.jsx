import React from 'react'
import { useFilterContext } from '../store/filterContext'

const Sort = () => {
  const {sorting} =useFilterContext();
  const handleSortingChange = (event) => {
    sorting(event.target.value);
  };
  return (
    <div className='container mx-auto mt-20 pt-12'>
      <div >
        <form action="">
          <label htmlFor="sort">
          </label>
          <select name="sort" id="sort" onChange={handleSortingChange}>
            <option value="lowest" >Price(lowest)</option>
            <br />
            <option value="highest">Price(highest)</option>
            <br />
            <option value="a-z">Price(a-z)</option>
            <br />
            <option value="z-a">Price(z-a)</option>
            <br />
          </select>
        </form>
      </div>
    </div>
  )
}

export default Sort
