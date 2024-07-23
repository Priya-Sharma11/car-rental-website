import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';

const UserProfiles = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [ userBookings, setUserBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    name:'',
    email:'',
    phonenumber:'',
    image:''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { authorizationToken } = useAuth();
  
  useEffect(() => {
    fetchUserData(id);
    fetchUserBookings(id);
  }, [id]);

  const fetchUserData = (userId) => {
    fetch(`http://localhost:4000/user/userData/${userId}`, {
      headers: {
        Authorization: authorizationToken,
      }
    })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  const fetchUserBookings = (userId) => {
    fetch(`http://localhost:4000/user/getBookings/${userId}`)
      .then(response => response.json())
      .then(data =>{
        console.log('Response from server:', data)
        setUserBookings(data)})
      
      .catch(error => console.error('Error fetching user bookings:', error));
  };

  const handleUpdateProfile = () => {
    setShowModal(true);
    setUpdateData({
      name: userData.name,
      email: userData.email,
      phonenumber: userData.phonenumber
    });
  };

   const handleCloseModal = () => {
    setShowModal(false);
    setShowPasswordModal(false); // Close the password modal if open
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // Send updated data to backend
    fetch(`http://localhost:4000/user/updateProfile/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationToken,
      },
      body: JSON.stringify(updateData),
    })
      .then(response => {
        if (response.ok) {
          setShowModal(false);
          // Fetch updated user data
          fetchUserData(id);
          // Optionally, you can show a success message to the user
        } else {
          throw new Error('Failed to update profile');
        }
      })
      .catch(error => console.error('Error updating profile:', error));
  };
  
  const handleUpdatePassword = () => {
    setShowPasswordModal(true);
  };

  
  const handleSavePassword = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // Handle password mismatch error
      console.error('New password and confirm password do not match');
      return;
    }

    // Send password update request to backend
    fetch(`http://localhost:4000/auth/updatePassword/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationToken,
      },
      body: JSON.stringify({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }),
    })
      .then(response => {
        if (response.ok) {
          setShowPasswordModal(false);
          alert("Password update successfully");
          
          // Optionally, you can show a success message to the user
        } else {
          throw new Error('Failed to update password');
        }
      })
      .catch(error => console.error('Error updating password:', error));
  };


  const convertToBase64 =(e)=>{
    console.log(e);
    var img = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload=()=>{
      console.log(reader.result);
      setUpdateData(prevState => ({ ...prevState, image: reader.result }));
    }
    reader.onerror=error=>{
      console.log("Error: ",error)
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Blue Background */}
      <div className="h-[400px] bg-gradient-to-b from-blue-400 to-indigo-500 flex justify-center items-center">
        <img src={userData?.image} alt="User" className="rounded-full h-36 w-36 mt-12 object-cover mr-4" />
      </div>

      {/* User Profile Section */}
    
      <div className="container mx-auto mt-10 flex justify-center">
      <div className="w-1/3 mr-4 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-4">User Profile</h2>  
            {userData && (
              <div>
                <p className='mb-2'><strong>Name:</strong> {userData.name}</p>
                <p className='mb-2'><strong>Email:</strong> {userData.email}</p>
                <p className='mb-2'><strong>Phone Number:</strong> {userData.phonenumber}</p>
              </div>
            )}
        

        <button 
  onClick={handleUpdateProfile} 
  className="bg-white border border-gray-300 text-black font-bold px-3 py-1 rounded mb-2 block w-full mt-8 hover:bg-gray-300 transition-colors duration-300"
>
  Update Profile
</button>
<button 
  onClick={handleUpdatePassword} 
  className="bg-white border border-gray-300 text-black font-bold px-3 py-1 rounded mb-2 block w-full mt-8 hover:bg-gray-300 transition-colors duration-300"
>
  Update Password
</button>

        </div>
      

      {/* User Bookings Section */}
      <div className="container mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4">User Bookings</h2>
          {userBookings.length > 0 ? (
            <ul>
              {userBookings.map((booking, index) => (
                <li key={booking._id} className="mb-4 border rounded-lg shadow-md p-4">
                  {booking.carData && booking.carData.Model && (
                    <p><strong>Car Model:</strong> {booking.carData.Model}</p>
                  )}
                  {booking.carData && booking.carData.Price && (
                    <p><strong>Price:</strong> {booking.carData.Price}</p>
                  )}
                  {booking.carData && booking.carData.category && (
                    <p><strong>Category:</strong> {booking.carData.category}</p>
                  )}
                  <p><strong>Pickup Date:</strong> {booking.pickupDate}</p>
                  <p><strong>Pickup Time:</strong> {booking.pickupTime}</p>
                  <p><strong>Source:</strong> {booking.source}</p>
                  <p><strong>Destination:</strong> {booking.destination}</p>
                  <p><strong>Person:</strong> {booking.persons}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>

      {/* Update Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" id="name" name="name" value={updateData.name} onChange={handleInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" value={updateData.email} onChange={handleInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />
              <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text" 
                id="phonenumber" 
                name="phonenumber" 
                value={updateData.phonenumber} 
                onChange={handleInputChange} 
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />
              <label>
                Image:
                <input
                  accept='image/*'
                  type='file'
                  name='image'
                  onChange={convertToBase64}
                  className='block w-full mt-1'
                  required
                />
              </label>
            </div>
            
            <div className="flex justify-end">
              <button onClick={handleSaveChanges} className="bg-indigo-500 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={handleCloseModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showPasswordModal && (
         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
         <div className="bg-white p-6 rounded-lg w-1/3">
           <h2 className="text-2xl font-bold mb-4">Update Password</h2>
           <div className="mb-4">
             <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
             <input type="password" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />
             <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
             <input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />
             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
             <input type="password" id="confirmPassword" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />
           </div>
           
           <div className="flex justify-end">
             <button onClick={handleSavePassword} className="bg-indigo-500 text-white px-4 py-2 rounded mr-2">Save</button>
             <button onClick={handleCloseModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
           </div>
         </div>
       </div>
      )}
    </div>
    </div>
  );
};

export default UserProfiles;
