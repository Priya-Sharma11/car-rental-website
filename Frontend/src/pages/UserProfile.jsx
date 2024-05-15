import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    image: '', // Add image field to update user image
    password: '',
    newPassword: '',
  });
  const [selectedImage, setSelectedImage] = useState(null); 
  const { authorizationToken } = useAuth();

  useEffect(() => {
    fetchUserData(id);
    fetchUserBookings(id);
  }, [id]);

  const fetchUserData = (userId) => {
    fetch(`http://localhost:4000/user/userData/${userId}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  const fetchUserBookings = (userId) => {
    fetch(`http://localhost:4000/user/getBookings/${userId}`)
      .then(response => response.json())
      .then(data => setUserBookings(data))
      .catch(error => console.error('Error fetching user bookings:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate =(user)=>{
    setShowProfileModal(true);
    setUpdateData({
      name: user.name,
      email: user.email,
      phonenumber: user.phonenumber,
      image: user.image, 

    })
    setSelectedImage(user.image);
  }

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', updateData.name);
      formData.append('email', updateData.email);
      formData.append('phonenumber', updateData.phonenumber);
      if (selectedImage) {
        formData.append('image', selectedImage); // Append the selected image to form data
      }

      const response = await fetch(`http://localhost:4000/user/updateProfile/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUserData = await response.json();
      setUserData(updatedUserData);
      setShowProfileModal(false);

    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (e.g., display error message to the user)
    }
  };


  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(`http://localhost:4000/user/updatePassword/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ newPassword: updateData.newPassword }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
  
      // Password updated successfully
      // You can show a success message or handle it as needed
    } catch (error) {
      console.error('Error updating password:', error);
      // Handle error (e.g., display error message to the user)
    }
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
  const handleLogout = () => {
    // Your logout logic here
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Background with profile picture option */}
      <div className="h-[400px] bg-gradient-to-b from-blue-400 to-indigo-500 flex justify-center items-center">
        <div className="bg-white rounded-full h-40 w-40 mt-14 flex justify-center items-center">
          {/* Render user profile picture here */}
          {userData && userData.image ? (
            <img src={userData.image} alt="" className="h-full w-full rounded-full" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M10 0a6.5 6.5 0 100 13c3.584 0 6.334-2.889 8-6.5C16.334 2.89 13.584 0 10 0zM2 10c0-3.584 2.889-6.334 6.5-8 3.61 1.666 6.5 4.416 6.5 8s-2.89 6.334-6.5 8C4.889 16.334 2 13.584 2 10z" clipRule="evenodd" />
            </svg>
          )}
          
        </div>
        
      </div>

      {/* User data section */}
      <div className="container mx-auto mt-10 flex justify-center">
        <div className="w-1/3 mr-4 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4">User Profile</h2>
          {userData && (
            <div>
              <div className="mb-8">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone Number:</strong> {userData.phonenumber}</p>
              </div>
              <div className="mb-4">
                <button
                  onClick={handleUpdate}
                  className="bg-white border border-gray-300 text-black px-3 py-1 rounded mb-2 block w-full"
                >
                  Update Profile
                </button>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="bg-white border border-gray-300 text-black px-3 py-1 rounded block w-full"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User bookings section */}
        <div className="w-2/3 bg-white rounded-lg shadow-lg p-6">
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

      {/* Edit Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
              {/* Name */}
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" id="name" name="name" value={updateData.name} onChange={handleInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />

              {/* Email */}
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" value={updateData.email} onChange={handleInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />

              {/* Phone Number */}
              <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="text" id="phonenumber" name="phonenumber" value={updateData.phonenumber} onChange={handleInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />

              {/* Image Upload */}
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <input type="file" id="image" name="image" onChange={convertToBase64} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />
            </div>
            <div className="flex justify-end">
              <button onClick={handleUpdateProfile} className="bg-indigo-500 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={() => setShowProfileModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Update Password</h2>
            <div className="mb-4">
              {/* Current Password */}
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" id="currentPassword" name="currentPassword" value={updateData.currentPassword} onChange={handleInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />

              {/* New Password */}
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" id="newPassword" name="newPassword" value={updateData.newPassword} onChange={handleInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />

              {/* Confirm New Password */}
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={updateData.confirmPassword} onChange={handleInputChange} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md mb-2" />
            </div>
            <div className="flex justify-end">
              <button onClick={handleUpdatePassword} className="bg-indigo-500 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={() => setShowPasswordModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
