import { createContext, useContext, useEffect, useReducer } from "react";
import {useServiceContext} from "./servicecontext"
import reducer from "../reducer/filterReducer"
import axios from "axios";

export const FilterContext = createContext();

const initialState ={
  filter_services:[],
  all_services:[],
  grid_view:true,
  sortingValue:"lowest",
   filter :{
    text: "",
    category:""
  } 

}

export const FilterContextProvider = ({children})=>{

  const {services}=useServiceContext();
/*  console.log("filterContext",services); */

  const [state,dispatch] = useReducer(reducer,initialState);

  /* set grid view */
  const setGridView =()=>{
    return dispatch({type:"SET_GRID_VIEW"});
  }

  const setListView =()=>{
    return dispatch({type:"SET_LIST_VIEW"});
  }

  const fetchCarsByCategory = async (category) => {
    try {
      const response = await axios.get(`/services/getCarByCategory/${category}`);
      dispatch({ type: "FILTER_BY_CATEGORY", payload: response.data });
    } catch (error) {
      console.error('Error fetching cars by category:', error);
    }
  };
  useEffect(() => {
    fetchCarsByCategory(state.filter.category);
  }, [state.filter.category]);
  
  useEffect(()=>{
    dispatch({type:"LOAD_SERVICES",payload:services});
  },[services])

  return(
    <FilterContext.Provider value={{...state,setGridView, setListView,fetchCarsByCategory}}>
{children}
  </FilterContext.Provider>
  )
}

export const useFilterContext = () =>{
  return useContext(FilterContext);
}