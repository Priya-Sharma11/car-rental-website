import {createContext, useContext, useState,useEffect} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

  const [token,setToken]=useState(localStorage.getItem('token'))
  const [user,setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const authorizationToken = `Bearer ${token}`
  const [userData, setUserData] = useState(false); // Initialize as false by default



  const storeTokenInLS = (serverToken)=>{
    setToken(serverToken)
    return localStorage.setItem('token',serverToken);
  }
 
  let isLoggedIn = !!token;
  const LogoutUser=()=>{
    setToken("");
    return localStorage.removeItem('token')
  }

  //jwtauthentication-to get currently loggedin user

  const userAuthentication = async ()=>{
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/auth/user",{
        method:"GET",
        headers:{
          Authorization:authorizationToken
        }
      })
      if(response.ok){
        const data = await response.json();
        console.log(data.userData);
        setUser(data.userData)
        setIsLoading(false)
        setUserData(true); 
      }else{
        setIsLoading(false);
      }
    } catch (error) {
      console.error("error fetching user data")
    }
  }


  useEffect(()=>{
   
    userAuthentication();
  },[token])


  return <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user,authorizationToken,isLoading}}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = ()=>{
  const authContextValue = useContext(AuthContext);
  if(!authContextValue){
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
}