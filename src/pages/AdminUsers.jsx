import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:4000/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken
        }
      });
      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className='admin-users-section'>
        <div className='container mx-auto mt-20'>
          <h1 className='text-4xl text-red-400 font-bold flex justify-center items-center'>Admin Users data</h1>
        </div>
        <div className='container mx-auto admin-users'>
          <table className="min-w-full divide-y divide-gray-500 border border-black shadow-md overflow-hidden mb-12 mt-8">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((currUser, index) => (
                <tr key={index} className="">
                  <td className="px-6 py-4 whitespace-nowrap">{currUser.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{currUser.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{currUser.phonenumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => deleteUser(currUser._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default AdminUsers;
