const serviceReducer = (state,action)=>{
 
switch(action.type){
  case "SET_LOADING":
  return{
    ...state,
    isLoading:true,
  }

  case "SET_API_DATA":
    const featureData = action.payload.filter((curr)=>{
      return curr.feature === true;
    })
    return{
      ...state,
      isLoading:false,
      services:action.payload,
      featureServices: featureData,
    }

  case "API_ERROR":
    return{
      ...state,
      isLoading:false,
      isError:true,
    } 

  case "SET_SINGLE_LOADING":
  return{
    ...state,
    isSingleLoading:true,
  }
  case "SET_SINGLE_SERVICE":
    return{
      ...state,
      isSingleLoading:false,
      singleService:action.payload,
    }
    
    case "SET_CATEGORY_CARS":
      return {
        ...state,
        isLoading: false,
        categoryCars: action.payload,
      };
    
 
  default:
     return state;
}
}

export default serviceReducer;