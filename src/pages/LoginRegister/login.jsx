import React from 'react'

const login = () => {
  return (
    <div className='container mx-auto mt-12 pt-12'>
       <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
        <h1 className='text-4xl text-black font-bold text-center mb-6 '>Login</h1>
        <form action=""> 
        <div className='relative my-10'>

        <input type="email" className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
          placeholder=''
          name='email' 
          id='email'
          autoComplete='off'
          /* value={users.email}
          onChange={handleInput} */
          />
          
          <label htmlFor="" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Email</label>
          {/* <BiUser className='absolute top-1 right-4'/> */}

          <div className='relative my-6'>
          <input type="password"className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
          placeholder=''
          name='password' 
          id='password'
          autoComplete='off'
         /*  value={users.password}
          onChange={handleInput} */ 
          />
          <label htmlFor="" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Password</label>
        {/* <AiOutlineUnlock className='absolute top-1 right-4'/> */}
          </div>
        </div>
        <div className='flex justify-between items-center'>
            <Link to="/registerForm" className='text-blue-500 ml-12 pl-14 mr-1'>Already have an account? Sign in here'</Link>
        
            </div>

        </form>
    </div>
    </div>
  )
}

export default login
