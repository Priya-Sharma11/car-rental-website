import React from 'react'
import { useFilterContext } from '../store/filterContext'

const FilterSection = () => {
  const {filters:{text},updateFilterValue}=useFilterContext();
  return (
    <div className='container mx-auto mt-20 pt-'>
      <div className="filter-search">
        <form onSubmit={(e)=>e.preventDefault}>
          <input 
          type="text" 
          name="text" 
          value={text} 
          onChange={updateFilterValue}
          className="p-2 border border-gray-300 bg-gray-900 text-white rounded"
            placeholder="Search..."/>
        </form>
      </div>
    </div>
  )
}

export default FilterSection
