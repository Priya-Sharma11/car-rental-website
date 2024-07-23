import React from 'react'
import { useServiceContext } from '../store/servicecontext'
import Service from './servicePage/Service';


const FeatureCarList = () => {
  const {isLoading, featureServices} = useServiceContext();
  console.log(featureServices);

  if(isLoading){
    return <div>Loading....</div>
  }

  return (
    <>
      <div>
        <div className="container">
          <div>
          <h3 className='text-2xl mt-8'>Check Now</h3>
          </div>
          <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl text-black-500 font-semibold font-serif flex  mt-4 "
        >
          Our Feature Services
        </h1>
          <div className="container mx-auto grid grid-cols-3 gap-9 mb-12 mt-6">
          {
          featureServices
          .filter(curr => curr.feature) // Filter feature cars where feature is true
          .map(curr => <Service key={curr._id} {...curr} />)
            }
          
          </div>
          
        </div>
      </div>
    </>
  )
}

export default FeatureCarList
