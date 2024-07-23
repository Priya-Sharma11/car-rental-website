import React from 'react';
import { HiViewGrid } from "react-icons/hi";
import { MdViewList } from "react-icons/md";
import { useFilterContext } from '../../store/filterContext';

const Sort = () => {
  const { filter_services,grid_view ,setGridView,setListView} = useFilterContext();

  return (
    <div className="flex justify-between mt-5rem">
      <div>

      </div>
      <div className="">
  <p className='text-2xl font-bold font-serif bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent'>
    {`${filter_services.length} Cars Available`}
  </p>
</div>
      <div className="sort-section">
      <div className="sorting-list--grid">
  <button className={`icon-button ${grid_view ? 'bg-black text-white' : 'bg-white text-black'} px-6 py-3 mr-4`} 
    onClick={setGridView}>
    <HiViewGrid className='icon'/>
  </button>
  <button className={`icon-button ${grid_view ? 'bg-white text-black' : 'bg-black text-white'} px-6 py-3`}
    onClick={setListView}>
    <MdViewList/>
  </button>
</div>

      </div>
      
     
    </div>
  );
};

export default Sort;
