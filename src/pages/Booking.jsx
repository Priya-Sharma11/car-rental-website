import React, { useState ,useEffect,useContext,useCallback} from 'react';
import { Link,useParams } from 'react-router-dom'
import { useAuth } from '../store/auth';
import Stepper from '../components/Stepper';
import StepperControl from '../components/StepperControl';



function Booking() {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  console.log("Booking page",carData); 
  
   const [step, setStep] = useState(1);
  const steps=[
    "Car Selected","Ride Details", "Contact Details","Summary","Complete"
  ]

  const [rideDetails, setRideDetails] = useState({
    pickupDate: '',
    pickupTime: '',
    source: '',
    destination: '',
    persons: ''
  });
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message:''
  });

  const [userdata,setuserData] = useState(true);

  const {user} = useAuth();
  const [validationErrors, setValidationErrors] = useState({});

useEffect(()=>{
  if(userdata && user){
    console.log(user)
    setContactDetails({
      name:user.name,
      email:user.email,
      phoneNumber:user.phonenumber,
      message:""
    })
    setuserData(false)
  }
},[user])

useEffect(() => {
  // Fetch car data using the ID from the URL
  fetch(`http://localhost:4000/services/getCarDetails/${id}`)
    .then(response => response.json())
    .then(data => setCarData(data))
    .catch(error => console.error('Error fetching car data:', error));
}, [id])


  const handleClick = async (direction)=>{
    let newStep = step;
    direction === "next" ? newStep++ : newStep--;

    if (direction === "next" && !validateStep()) {
      return;
    }

    newStep > 0 && newStep <= steps.length && setStep(newStep);

    if (step === 4 && direction === "next") {
      try{
      await sendDataToBackend();
      await sendEmail();
      console.log('Data sent to backend and email sent successfully.');
      }catch(error){
        console.error('Error:', error);
      }
    }
  }

  const validateStep = () => {
    let errors = {};
    if (step === 2) {
      if (!rideDetails.pickupDate) errors.pickupDate = "Pick Up Date is required";
      if (!rideDetails.pickupTime) errors.pickupTime = "Pick Up Time is required";
      if (!rideDetails.source) errors.source = "Source is required";
      if (!rideDetails.destination) errors.destination = "Destination is required";
      if (!rideDetails.persons) errors.persons = "Number of persons is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRideDetailsChange = (e) => {
    const { name, value } = e.target;
    setRideDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleContactDetailsChange = (e) => {
    const { name, value } = e.target;
    setContactDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const sendDataToBackend = () => {
    const dataToSend = {
      carData,
      rideDetails, 
      contactDetails,
      email: user.email,
      
    };
     
    fetch('http://localhost:4000/bookings/newBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to send data to backend');
      }
      return response.json();
    });

    /* .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (step === 4) {
        sendEmail();
      console.log('Data sent to backend successfully.');  // Trigger email sending after successful booking
      } */
      
   /*  }) */
    /* .catch((error) => {
      console.error('Error:', error);
     
    }); */
    
  };

  const sendEmail = async () => {
    if (!carData || !rideDetails || !contactDetails || !user) {
      console.error('Required data or user information is not available.');
      return;
    }
    let dataSend = {
      carData,
      rideDetails, 
      contactDetails,
      email: user ? user.email : '',
    };
    
    fetch("http://localhost:4000/email/sendEmail", {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Email sent:', data);
    })
    .catch((error) => {
      console.error('Data is not sent:', error);
    });
  };
  
  
    

  const renderStepContent = (stepNumber) => {

    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const getCurrentTimeIST = () => {
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000;
      const istTime = new Date(now.getTime() + offset + 19800000); // IST is UTC+5:30 (5*60*60*1000 + 30*60*1000)
      return istTime.toTimeString().slice(0, 5);
    };
    
    switch (stepNumber) {
      case 1:
      // Step 1 content: Car Details
      return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg mt-12 mb-8 w-[1160px] h-[540px]">
          <h3 className="text-4xl font-bold mb-6 mt-8">Car Details</h3>
          <div className="space-y-4">
            {carData ? (
              <>
                <div className='w-full grid grid-cols-2 '>
                  <div>
                    <h2 className='text-2xl font-bold font-serif mb-8 mt-6'>Model: {carData.Model}</h2>
                    <p className='text-xl font-roboto mb-4'>Fuel Type: {carData.FuelType}</p>
                    <p className='text-xl font-roboto mb-4'>Price: {carData.Price}</p>
                    <p className='text-xl font-roboto mb-4'>Seating Capacity: {carData.SeatingCapacity}</p>
                    <p className='text-xl font-roboto mb-4'>Transmission: {carData.Transmission}</p>
                  </div>
                  <div>
                    <img src={carData.image} alt={carData.Model} className='w-30 h-30  mr-8' />
                  </div> 
                </div>
              </>
            ) : (
              <p>Loading car data...</p>
            )}
          </div>
        </div>
      );
      case 2:
        return (
          <div className=" p-8 rounded-lg shadow-lg mt-12 mb-8 w-[1160px] h-[740px] ">
          <h3 className="text-3xl font-bold mb-8 mt-12 flex items-center justify-center">
  <span className="bg-gradient-to-r from-pink-500 to-black bg-clip-text text-transparent">Enter Ride Details</span>
</h3>

          <div className="grid grid-cols-2 gap-8 m-3">
            <div>
              <p className="text-lg font-semibold mb-3 ml-14">Pick Up Date:</p>
              <input type="date" 
              name="pickupDate" 
              value={rideDetails.pickupDate} 
              onChange={handleRideDetailsChange}
              min={getTodayDate()}
              className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 mb-4 ml-11" />
               {validationErrors.pickupDate && <p className="text-red-500 ml-14">{validationErrors.pickupDate}</p>}

              <p className="text-lg font-semibold mb-3 ml-14">Pick Up Time:</p>
              <input type="time" 
              name="pickupTime" 
              value={rideDetails.pickupTime} 
              onChange={handleRideDetailsChange}
              min={rideDetails.pickupDate === getTodayDate() ? getCurrentTimeIST() : ''}
              className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 ml-12" />
               {validationErrors.pickupTime && <p className="text-red-500 ml-14">{validationErrors.pickupTime}</p>}
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-lg font-semibold mb-3 mt-2 ml-14">Source:</p>
              <input type="text" 
              name="source" 
              value={rideDetails.source} 
              onChange={handleRideDetailsChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 ml-14 mb-3" />
               {validationErrors.source && <p className="text-red-500 ml-14">{validationErrors.source}</p>}

              <p className="text-lg font-semibold mb-3 ml-14">Destination:</p>
              <input type="text" 
              name="destination" 
              value={rideDetails.destination} 
              onChange={handleRideDetailsChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500  mb-3 ml-14" />
              {validationErrors.destination && <p className="text-red-500 ml-14">{validationErrors.destination}</p>}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-lg font-semibold mb-3 ml-14">Persons:</p>
            <input type="number" 
             name="persons" 
             value={rideDetails.persons} 
             onChange={handleRideDetailsChange}
            className="w-[100px] px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 mb-3 ml-14" />
             {validationErrors.persons && <p className="text-red-500 ml-14">{validationErrors.persons}</p>}
          </div>
        </div>
        
        
        );
      
      case 3:
        return (
          <div className="container mx-auto mt-12 w-[1160px] h-[740px] p-5 mb-14">
          <div className="p-8 rounded-lg shadow-lg  w-[1160px] h-[740px] ">
          <h3 className="text-3xl font-bold mb-8 flex items-center justify-center ">
  <span className="bg-gradient-to-r from-pink-600 to-black bg-clip-text text-transparent">Enter Contact Details</span>
</h3>

            <div>
              <div className="mb-4">
              <p className="text-lg font-semibold mb-3 mt-4 ml-14">Name:</p>
                <input type="text" id="name" 
                name="name" 
                value={contactDetails.name} 
                onChange={handleContactDetailsChange}
               disabled={!userdata}
                readOnly={!userdata} 
                className="w-[330px] px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 mb-8 ml-14" />
              </div>
              <div className="mb-4">
              <p className="text-lg font-semibold mb-3 mt-4 ml-14">Email:</p>
                <input type="email" id="email" 
                name="email" 
                value={contactDetails.email} 
               /*  disabled={!userdata}
                readOnly={!userdata} */
                onChange={handleContactDetailsChange}
                className="w-[330px] px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 mb-8 ml-14" />
              </div>
              <div>
              <p className="text-lg font-semibold mb-3 mt-4 ml-14">Phone Number:</p>
                <input type="tel" id="phone" 
                name="phoneNumber" 
                value={contactDetails.phoneNumber} 
                onChange={handleContactDetailsChange}
                className="w-[330px] px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 mb-8 ml-14"/>
              </div>
              <div className="mb-6">
              <p className="text-lg font-semibold mb-3 mt-4 ml-14">Message:</p>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="6"
                autoComplete='off'
                value={contactDetails.message}
                onChange={handleContactDetailsChange}
                className="w-[330px] px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 mb-8 ml-14"
              ></textarea>
            </div>
            </div>
          </div>
        </div>
        

        );
        case 4:
  return (
    <div className="container mx-auto mt-12 w-[1160px] h-[740px] p-5 mb-14">
      <h3 className="text-3xl font-bold mb-8 flex items-center justify-center">
        <span className="bg-gradient-to-r from-red-400 to-black bg-clip-text text-transparent">Booking Summary</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Car Details:</h4>
          <ul>
            <li className="mb-2">Model: {carData.Model}</li>
            <li className="mb-2">Transmission: {carData.Transmission}</li>
            <li className="mb-2">Price: {carData.Price}</li>
            <li className="mb-2">Fuel Type: {carData.FuelType}</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Ride Details:</h4>
          <ul>
            <li className="mb-2">Pick Up Date: {rideDetails.pickupDate}</li>
            <li className="mb-2">Pick Up Time: {rideDetails.pickupTime}</li>
            <li className="mb-2">Source: {rideDetails.source}</li>
            <li className="mb-2">Destination: {rideDetails.destination}</li>
            <li className="mb-2">Persons: {rideDetails.persons}</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Contact Details:</h4>
          <ul>
            <li className="mb-2">Name: {contactDetails.name}</li>
            <li className="mb-2">Email: {contactDetails.email}</li>
            <li className="mb-2">Phone Number: {contactDetails.phoneNumber}</li>
            <li className="mb-2">Message: {contactDetails.message}</li>
          </ul>
        </div>
      </div>
    </div>
  );

        case 5:
          return (
            <div className="flex flex-col items-center justify-center h-[300px]">
            <h3 className="text-5xl font-bold font-serif mt-8 mb-8">Thank you for the Booking!</h3>
            <p className="text-2xl mb-8">We'll come back to you shortly.</p>
            <Link to="/">
  <button className="px-6 py-3 rounded-lg shadow bg-gradient-to-r from-blue-800 to-purple-600 text-white hover:from-purple-600 hover:to-purple-800 hover:shadow-md">
    Go to Home Page
  </button>
</Link>

          </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className='container mx-auto mt-20 pt-20 mb-11 bg-gradient-to-br from-teal-900 to-blue-300'>

    <div className='flex justify-center items-center'>
    <div className="bg-white p-8 rounded-lg shadow-lg w-[1220px] h-[1140px] mb-14 ">
    <h2 className="text-4xl font-bold mb-4 ">
  <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text ">Book</span>
  <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text"> Your Ride</span>
</h2>


      <div className="step-container ">
       {/*  <div className="step-number text-lg text-gray-700">Step {step} of 5</div> */}
       <Stepper 
       steps={steps}
       step={step}
       
       /> 
        {/* <div className="step-indicator">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className={`step-circle ${step >= index ? 'filled' : ''}`}></div>
          ))}
        </div> */}
        {renderStepContent(step)}

        <StepperControl 
        handleClick={handleClick}
        step ={step}
        steps={steps}
        />
       {/*  {step > 1 && <button onClick={handleBack} className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg mr-4">Back</button>}
        {step < 5 && <button onClick={handleNext} className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Next</button>} */}
      </div>
    </div>
  </div>  
  </div>
    
  );
}

export default Booking;
