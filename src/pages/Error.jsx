import { NavLink } from "react-router-dom"

export const Error =()=>{
  return(
    <>
    <div className="container mx-auto mt-20 p-20 flex justify-center items-center">
    <section className="text-center">
    <h2 className="text-9xl text-red-500 font-bold mb-4">404</h2>
          <h4 className="text-4xl font-bold mb-4">Sorry! Page not found</h4>
          <p className="text-gray-700 mb-4">
            Oops! It seems like the page you're trying to access doesn't exist. 
            <br/>If you believe there's an issue, feel free to report it, and we'll look into it.
          </p>

      <div>
        <NavLink to="/"  className="inline-block bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-4 mb-4">Return Home</NavLink>
        <NavLink to="/contact" className="inline-block bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4">Report Problem</NavLink>
      </div>
    </section>
    </div>
    </>
  )
}