const filterReducer = (state,action) =>{
  switch (action.type) {
    case "LOAD_SERVICES":
      return {
        ...state,
        filter_services: [...action.payload],
        all_services:[...action.payload],
      }
      
    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view:true,
      }
      case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view:false,
      }

      
       
    default: return state
      
  }
}

export default filterReducer;