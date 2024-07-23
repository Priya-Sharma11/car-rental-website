import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useAuth } from '../store/auth';
import Chart from 'chart.js/auto';
import { FaCalendarCheck } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { authorizationToken } = useAuth();

  // Fetch monthly bookings data and total cars data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch monthly bookings
        const monthlyBookingsResponse = await axios.get('http://localhost:4000/admin/monthlybookings', {
          headers: {
            Authorization: authorizationToken,
          },
        });
        setMonthlyBookings(monthlyBookingsResponse.data);

        // Fetch total bookings
        const totalBookingsResponse = await axios.get('http://localhost:4000/admin/totalbookings', {
          headers: {
            Authorization: authorizationToken,
          },
        });
        setTotalBookings(totalBookingsResponse.data.totalBookings);

        // Fetch total cars
        const totalCarsResponse = await axios.get('http://localhost:4000/admin/totalcars', {
          headers: {
            Authorization: authorizationToken,
          },
        });
        setTotalCars(totalCarsResponse.data.totalCars);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [authorizationToken]); // Ensure useEffect runs when authorizationToken changes


  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/totalUsers', {
          headers: {
            Authorization: authorizationToken,
          },
        });
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchTotalUsers();
  }, [authorizationToken]);

  // Prepare data for the chart
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

  const monthlyData = allMonths.map(month => {
    const booking = monthlyBookings.find(item => item._id === month);
    return booking ? booking.count : 0;
  });

  const labels = allMonths.map(month => monthNames[month - 1]);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Bookings',
        data: monthlyData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Month',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        title: {
          display: true,
          text: 'Number of Bookings',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  };



  return (
    <>
 <div className="flex justify-center">
  <div className="w-full max-w-xl flex justify-around mt-12">
    <div className="bg-red-400 rounded-lg shadow-md p-4 flex-1 mr-4 text-center">
      <Link to='/admin/bookings'>
      <FaCalendarCheck className="mx-auto text-5xl mb-4" />
      </Link>
      <h3 className="text-m font-bold font-serif ">Total Bookings {totalBookings}</h3>

    </div>
    <div className="bg-purple-400 rounded-lg shadow-md p-4 flex-1 text-center">
    <Link to='/admin/services'>
      <FaCarAlt className="mx-auto text-5xl mb-4" />
      </Link>
      <h3 className="text-lg font-bold font-serif mb-2">Total Cars {totalCars}</h3>
    </div>
    <div className="bg-emerald-500 rounded-lg shadow-md p-4 ml-4 font-bold font-serif flex-1 text-center">
    <Link to='/admin/users'>
      <FaUser className="mx-auto text-5xl mb-3" />
      </Link>
      <h3 className="text-lg font-bold mb-2">Total Users {totalUsers}</h3>
    </div>
  </div>
</div>

<h2 className='flex justify-center items-center text-3xl font-bold font-serif text-pink-800 mt-8 pt-8'>Monthly Bookings</h2> 

    <div className='mt-12 pt-12 mb-14'>
     
      <div className="flex justify-center ">
    
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        
      </div>
     
    </div>
    </>
  );
};

export default AdminDashboard;
