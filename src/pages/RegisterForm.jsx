import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useAuth } from '../store/auth';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { BiUser } from 'react-icons/bi'
import { AiOutlineUnlock } from 'react-icons/ai'
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

const RegisterForm =() => {

  const [user,setUser] = useState({
    name:"",
    email:"",
    phonenumber:"",
    password:"",
    confirmPassword:""
  })
  const navigate = useNavigate();

  const {storeTokenInLS} = useAuth();

  const [passwordErrorMessage, setPasswordErrorMessage]=useState('');
  const [registerError, setRegisterError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, 
      [name]:value,
    })
      // Check if password matches confirmPassword
      if (name === 'confirmPassword' && user.password !== value) {
        setPasswordErrorMessage("Passwords don't match");
      } else {
        setPasswordErrorMessage('');
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (user.password !== user.confirmPassword) {
        setPasswordErrorMessage("Passwords don't match");
        return;
      }
  
      try {  
        const response = await fetch('http://localhost:4000/auth/register',{
          method:'POST',
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify(user),
        });  
        
        const res_data = await response.json();
        console.log("res from server",res_data.message);
        
        if(response.ok){
          
        /*   alert("Registration successful") */
          storeTokenInLS(res_data.token); 
          setUser({name:"",email:"",phonenumber:"",password:"",confirmPassword:""});
          /* toast.success("Registration successfull") */
          navigate('/');
        }else{
          setRegisterError(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
         
      } catch (error) {
        console.error('Error submitting form:', error);
      } 
    }

  return (
    <div>
      <div className="text-white h-[100vh] flex justify-center items-center bg-cover" style={{'backgroundImage':"url('../../Images/loginRegister3.jpg')"}}>
    <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 relative'>
    <h1 className='text-5xl text-black font-bold font-serif text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white'>Register</h1>

     <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6 mt-2 p-6 h-full  "> 
     <div className='relative my-6'>

     <input type="text" className='block w-72 py-2.3 px-0 text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-800 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
       placeholder=''
       name='name' 
       id='name'
       autoComplete='off'
       value={user.name}
       onChange={handleChange}
       />
       
       <label htmlFor="" className='absolute text-m text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 '>Your Name</label>
       <BiUser className='absolute top-1 right-4'/> 

       <div className='relative my-8'>
       <input type="email"className='block w-72 py-2.3 px-0 text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
       placeholder=''
       name='email' 
       id='email'
       autoComplete='off'
       value={user.email}
       onChange={handleChange}
       />
       <label htmlFor="" className='absolute text-m text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Email</label>
       
     <MdOutlineMail className='absolute top-1 right-4'/> 
       </div>

       <div className='relative my-8'>
       <input type="number"className='block w-72 py-2.3 px-0 text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
       placeholder=''
       name='phonenumber' 
       id='phonenumber'
       autoComplete='off'
       value={user.phonenumber}
      onChange={handleChange} 
       />
       <label htmlFor="" className='absolute text-m text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Phone Number</label>
     <FaPhone className='absolute top-1 right-4'/> 
       </div>
       <div className='relative my-8'>
       <input type="password"className='block w-72 py-2.3 px-0 text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
       placeholder=''
       name='password' 
       id='password'
       autoComplete='off'
       value={user.password}
      onChange={handleChange}
       />
       <label htmlFor="" className='absolute text-m text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Password</label>
     <AiOutlineUnlock className='absolute top-1 right-4'/> 
       </div>
       <div className='relative my-8'>
       <input type="password"className='block w-72 py-2.3 px-0 text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
       placeholder=''
       name='confirmPassword' 
       id='confirmPassword'
       autoComplete='off'
       value={user.confirmPassword}
       onChange={handleChange}
       />
       <label htmlFor="" className='absolute text-m text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Confirm Password</label>
       {passwordErrorMessage && <p className='text-sm text-red-500 text-size-20px mt-4'>{passwordErrorMessage}</p>}
       {registerError && <p className="text-sm text-red-500 text-size-20px mt-4">{registerError}</p>}
     <AiOutlineUnlock className='absolute top-1 right-4'/> 
       </div>
     </div>
     <div className='flex justify-between items-center'>
      
         <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type='submit'>Register</button>
         </div>
         <div>
         <span className='m-11'>Already Have An Account? 
           <Link to="/loginForm">
           <button className="text-blue-500" > Login Here</button>
           </Link>
         </span>
         </div>
     </form>
 </div>
 </div>
 </div>
  )
}

export default RegisterForm
