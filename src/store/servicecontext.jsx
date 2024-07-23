import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/serviceReducer"

const AppContext = createContext();
const baseURL ="http://localhost:4000/services";

const initialState={
  isLoading:false,
  isError: false,
  services:[],
  featureServices:[],
  isSingleLoading : false,
  singleService: {},
  categoryCars: []
}

const AppProvider = ({children}) =>{

  const [state,dispatch]=useReducer(reducer,initialState);


  const getServices = async (url)=>{
    dispatch({type:"SET_LOADING"});
    try{
    const response = await axios.get(url);
    /*   console.log(response); */
      const services = await response.data;
      dispatch({type:"SET_API_DATA",payload:services})
    }catch(error){
      dispatch({type:"API_ERROR"});
    }
  }

  //single service 
  const getServiceById=async (url)=>{
    dispatch({type:"SET_SINGLE_LOADING"});
    try {
      const response = await axios.get(url);
      const singleService = await response.data;
      dispatch({type:"SET_SINGLE_SERVICE",payload:singleService})
    } catch (error) {
      dispatch({type:"SINGLE_SERVICE_ERROR"});
    }
  }

  const getCarByCategory = async (category) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${baseURL}/getCarByCategory/${category}`);
      const categoryCars = response.data; // Assuming response.data is an array of cars
      dispatch({ type: "SET_CATEGORY_CARS", payload: categoryCars });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  

  useEffect(()=>{
    getServices(`${baseURL}/getAllCars`);
    
  },[])
  return <AppContext.Provider value={{
    ...state,getServiceById,getCarByCategory,getServices
  }}>
    {children}
  </AppContext.Provider>
}

const useServiceContext = ()=>{
  return useContext(AppContext);
}
export {AppProvider,useServiceContext}