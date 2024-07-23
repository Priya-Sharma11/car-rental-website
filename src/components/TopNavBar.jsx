import React from 'react'

const TopNavBar = () => {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-2 fixed w-full z-20 top-0">
  <div className="container mx-auto flex justify-between items-center animate-marquee">
    <p className="text-m">Call us: <span className="marquee">+91 9999603060</span>
    </p>
    <p>Address: <span>Noida: C-199,Sector-71</span></p>
  </div>
  
</nav>

    </div>
  )
}

export default TopNavBar
