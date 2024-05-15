import {React,useEffect, useState} from 'react'
import { useAuth } from '../store/auth'

const AdminContacts = () => {
  const [contactData, setContactData]=useState([]);
  const {authorizationToken} = useAuth();
  const getContactsData=async()=>{
    try {
      const response = await fetch("http://localhost:4000/admin/contacts",{
        method:"GET",
        headers:{
          Authorization:authorizationToken,
        }
      })
      const data = await response.json();
      console.log("contact data: ",data);
      if(response.ok){
      
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getContactsData();
  },[]);
  return (
    <div className='container mx-auto mt-12 p-10'>
    <section>
  <h1 className='text-2xl font-bold font-serif mb-8 '>Admin Contact Data</h1>
  <div className="flex justify-center items-center text-xl m-4 p-4 gap-12" >
    {contactData.map((curdata, index) => {
      const { name, email, message } = curdata;
      return (
        <div key={index} style={{ marginRight: '20px' }}>
          <p>{name}</p>
          <p>{email}</p>
          <p>{message}</p>
          <button className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline mt-6">Delete</button>
        </div>
      );
    })}
  </div>
</section>

      
    </div>
  )
}

export default AdminContacts
