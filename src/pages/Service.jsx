import React from 'react';
import { useServiceContext } from "../store/servicecontext";
import FilterSection from '../components/servicePage/FilterSection';
import ServiceList from '../components/servicePage/ServiceList';
import Sort from '../components/servicePage/Sort';


const Service = () => {
  const { isLoading } = useServiceContext();

 
  return (
    <div className="container mx-auto mt-20 pt-10">
      {isLoading  ? (
        <p>Loading...</p>
      ) : (
        <div className='container mx-auto flex mt-12'>
           <div style={{ width: '20%' }}>
            <FilterSection />
          </div> 
          <section style={{ width: '80%' }}>
            
              {/* Container for both FilterSection and the new row */}
              <div className="flex items-start">

                {/* FilterSection */}
                <div style={{ width: '100%' }}>
                 <Sort/>
                </div>

                {/* Row above CarList */}
                <div className="row-above-carlist">
                  {/* Content for the row above CarList */}
                </div>
              </div>  

              {/* CarList */}
              <div style={{ height: '100%' }}>
                <ServiceList />
              </div>
            </section>
          </div>
        
      )}
    </div>
  );
}

export default Service;
