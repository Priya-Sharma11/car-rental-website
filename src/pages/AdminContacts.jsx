import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch("http://localhost:4000/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      console.log("contact data: ", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        }
      });
      if (response.ok) {
        // Remove the deleted contact from the state
        setContactData(contactData.filter(contact => contact._id !== id));
      } else if (response.status === 204) {
        // If the response status is 204 (No Content), it means the contact was successfully deleted
        setContactData(contactData.filter(contact => contact._id !== id));
      } else {
        throw new Error('Failed to delete contact');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <div className="container mx-auto mt-12 p-10">
      <section>
        <h1 className="text-3xl font-bold font-serif mb-8 flex justify-center items-center text-purple-500">Admin Contact Data</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactData.map((curdata, index) => {
            const { name, email, message } = curdata;
            return (
              <div key={index} className="border border-gray-300 rounded-md">
                <div className="bg-gray-100 p-4">
                  <p className="text-lg font-semibold mb-2">{name}</p>
                  <p className="text-gray-600 mb-2">{email}</p>
                  <p className="text-gray-700">{message}</p>
                </div>
                <button onClick={() => handleDelete(curdata._id)} className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline mb-2 ml-3">
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AdminContacts;
