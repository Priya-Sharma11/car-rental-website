import React from 'react';
import { useFilterContext } from '../../store/filterContext';
import GridView from './GridView';
import ListView from './ListView';

const ServiceList = () => {
  const { filter_services, grid_view } = useFilterContext();

  return (
    <div>
      {grid_view ? <GridView services={filter_services} /> : <ListView services={filter_services} />}
    </div>
  );
};

export default ServiceList;
