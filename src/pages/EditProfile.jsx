import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data based on user ID
    fetchUserData(userId);
  }, [userId]);

  const fetchUserData = (userId) => {
    // Fetch user data from API
    // Example:
    fetch(`http://localhost:4000/user/userData/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, email, image } = user;

  const handleEditProfile = () => {
    console.log('Edit Profile button clicked');
  };

  const handleChangePassword = () => {
    console.log('Change Password button clicked');
  };

  return (
    <div className="container mx-auto mt-20 p-20">
      <div className=" flex flex-col items-center">
        {/* Profile picture circle */}
        <div className="rounded-full h-32 w-32 bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
          {/* Add user profile picture here */}
          <img src={image} alt="Profile" className="h-full w-full object-cover" />
        </div>

        {/* User information */}
        <div className="mb-4">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center">
          <button onClick={handleEditProfile} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Edit Profile</button>
          <button onClick={handleChangePassword} className="bg-blue-500 text-white px-4 py-2 rounded">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
