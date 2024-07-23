import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useAuth } from '../store/auth';
import Banner from "../components/Banners"
import contact from "../../public/Images/contact.jpeg"
import { FaFacebook, FaInstagram, FaLinkedin, FaMobileAlt } from 'react-icons/fa';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const defaultContactFormData = {
  name:"",
  email:"",
  message:"",
}

const Contact = () => {

  const [contact, setContact] = useState(defaultContactFormData);

  const [userData,setUserData] = useState(true);
  const {user} = useAuth();

  useEffect(()=>{
    if(userData && user){
      setContact({
        name:user.name,
        email:user.email,
        message:""
      })
      setUserData(false)
    }
  },[user])
 

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(contact);

    try {
      const response = await fetch("http://localhost:4000/form/contact",{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(contact)
      })
      if(response.ok){
        setContact(defaultContactFormData);
       
        const data = await response.json();
       /*  console.log(data); */
       toast.success("Message send Successfully");
      
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
   
    <div className="xl:container mx-auto flex flex-col xl:flex-row items-center justify-center mt-20 p-14 h-[880px]"style={{ backgroundImage: "url('../../Images/contactus.jpg')" , backgroundSize: "cover", backgroundPosition: "center"}} > 
   
    <div class="xl:w-1/2 xl:pr-16">
   
    <h2 class="text-4xl font-bold text-gray-800 mb-8 font-serif">Welcome to Our Contact Page</h2>
    <p class="text-gray-700 text-lg mb-8">Feel free to reach out to us using the form on the right. We're excited to hear from you!</p>
    <h2 className='mb-4 text-xl font-bold font-serif'>OR</h2>
    <h2 className='text-xl  mb-6'>Reach out to us</h2>
   
    <div className="flex items-center gap-4 mt-3 ">
      <FaMobileAlt/>
      <p>9711490031</p>
      <div className="flex items-center gap-4 ">
      <a href="https://www.instagram.com/brotherstravels_/">
      <FaInstagram className="text-3xl hover:text-primary duration-300"/>
      </a>
      <a href="#">
      <FaFacebook className="text-3xl hover:text-primary duration-300"/>
      </a>
      <a href="#">
      <FaLinkedin className="text-3xl hover:text-primary duration-300"/>
      </a>
      </div>
    </div>
  
   
     
  </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-11 pb-8  w-[580px]">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-l font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={contact.name}
              disabled={!userData}
              readOnly={!userData}
              onChange={handleInput}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-l font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={contact.email}
              disabled={!userData}
              readOnly={!userData}
              onChange={handleInput}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-l font-bold mb-2">Message</label>
            <textarea
              name="message"
              id="message"
              rows="6"
              autoComplete="off"
              value={contact.message}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div>
            <button type="submit" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </div>
        </form>
    
   </div>
       <div className="w-full mt-8">
        <section className="mb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d44028.80933422912!2d77.06339949623431!3d28.560175201494026!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b052aa0ccb5%3A0xf922142d48c83d80!2sDwarka%20Sector%209!5e0!3m2!1sen!2sin!4v1714547258654!5m2!1sen!2sin" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
      </div>
    </>
  );
}

export default Contact;
