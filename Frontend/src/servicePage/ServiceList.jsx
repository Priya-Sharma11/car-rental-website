import React from 'react'
import { useFilterContext } from '../../store/filterContext'
import GridView from './GridView';
import ListView from './ListView';

const ServiceList = () => {
  const {filter_services, grid_view} = useFilterContext();

 if(grid_view === true){
  return <GridView services ={filter_services}/>
 }

 if(grid_view === false){
  return <ListView services ={filter_services}/>
 }
}

export default ServiceList
