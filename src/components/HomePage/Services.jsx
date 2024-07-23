import corporate from '../../../public/Images/corporate.jpg'
import airports from '../../../public/Images/airports.jpg';
import outstation from '../../../public/Images/outstation.jpg';

const Services = () => {
  return (
    <div className="container mx-auto px-4 mb-14">
      <h1 className='text-center text-4xl font-serif font-bold mt-16 mb-8 '>OUR SERVICES</h1>
      <div className="flex justify-around">
       <div className="flex  items-center justify-center bg-slate-100">
    <div className="group h-96 w-80 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-4 ">
          {/* Add your image source */}
          <img 
          text="OUTSTATION TRIPS"
          className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40 text-black " src={outstation} alt="Outstation Trips"  />
          
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className='flex min-h-full flex-col items-center justify-center'>
          <h2 className='text-3xl font-bold mb-4'>Outstation Trips</h2>
          <p className='text-xl mb-3'>Outstation trips offer the perfect opportunity to explore new destinations and create unforgettable memories.</p>
          <button className='mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900'>READ MORE..</button>
          </div>
         
        </div>
      </div>
    </div>
</div>

<div className="flex items-center justify-center bg-slate-100">
    <div className="group h-96 w-80 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-4 ">
          {/* Add your image source */}
          <img 
          text="corporate taxi"
          className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40 text-black " src={corporate} alt="Outstation Trips"  />
          
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className='flex min-h-full flex-col items-center justify-center'>
          <h2 className='text-3xl font-bold mb-4'>Corporate Taxi</h2>
          <p className='text-xl mb-3'>Streamline your corporate travel with our premium taxi , ensuring efficiency, comfort, and reliability for every journey.</p>
          <button className='mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900'>READ MORE..</button>
          </div>
         
        </div>
      </div>
    </div>
</div>
<div className="flex  items-center justify-center bg-slate-100">
    <div className="group h-96 w-80 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-4 ">
          {/* Add your image source */}
          <img 
          text="airport frop and pickups"
          className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40 text-black " src={airports} alt="Outstation Trips"  />
          
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className='flex min-h-full flex-col items-center justify-center'>
          <h2 className='text-3xl font-bold mb-4'>AIRPORTS DROPS AND PICKUPS</h2>
          <p className='text-xl mb-3'>Efficient airport drops and pickups tailored to your schedule, ensuring seamless travel transitions.</p>
          <button className='mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900'>READ MORE..</button>
          </div>
         
        </div>
      </div>
    </div>
</div>
</div>
    </div>
    
  );
}

export default Services;