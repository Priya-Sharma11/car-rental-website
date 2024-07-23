import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const URL = "http://localhost:4000/auth/login"
import { BiUser } from 'react-icons/bi'
import { AiOutlineUnlock } from 'react-icons/ai'

const LoginForm = () => {
  const [users,setUsers]=useState({
    email:"",
    password:""
  })
  const [loginError, setLoginError] = useState(false); 
  const navigate = useNavigate();

  const {storeTokenInLS,user} = useAuth();

  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setUsers({
      ...users,
      [name]:value,
    })
  } 

  const handleSubmit =async (e)=>{
    e.preventDefault();
    
    try {
      const response = await fetch(URL,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(users),
      })
     
      const res_data = await response.json();
      console.log(res_data);

      if(response.ok){
     
        storeTokenInLS(res_data.token); 
        setUsers({email:"",password:""});
        /* toast.success("Login Successfully"); */
        setLoginError(false); 
        navigate("/")

      }else{ 
        setLoginError(true);
        /* toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message); */
        /* console.log("invalid credentials") */
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <div className="text-white h-[100vh] flex justify-center items-center bg-cover" style={{'backgroundImage':"url('../../Images/loginRegister3.jpg')"}}>
       <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 relative '>
       <h1 className='text-4xl text-black font-bold font-serif text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white'>Login</h1>
        <form onSubmit={handleSubmit} > 
        <div className='relative my-10'>

        <input type="email" className='block w-72 py-2.3 px-0 text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
          placeholder=''
          name='email' 
          id='email'
          autoComplete='off'
          value={users.email}
          onChange={handleInput}
          />
          
          <label htmlFor="" className='absolute text-m text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Email</label>
          <BiUser className='absolute top-1 right-4'/> 

          <div className='relative my-10'>
          <input type="password"className='block w-72 py-2.3 px-0 text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
          placeholder=''
          name='password' 
          id='password'
          autoComplete='off'
          value={users.password}
          onChange={handleInput}  
          />
          <label htmlFor="" className='absolute text-m text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Password</label>
        <AiOutlineUnlock className='absolute top-1 right-4'/>
          </div>
        </div>
        {loginError && <p className="text-red-500 text-sm mb-4">Invalid credentials. Please try again.</p>}
        <div className='flex justify-between items-center'>
         
            <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type='submit'>Login</button>
            </div>
            <div>
            <span className='m-11'>  New Here?  
              <Link to="/registerForm">
              <button className="text-blue-500" >Create an Account'</button>
              </Link>
            </span>
            </div>
            
        </form>
    </div>
    </div>
    </div>
  )
}

export default LoginForm
